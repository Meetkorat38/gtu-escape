"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetSubjects } from "@/features/admin/api/use-get-details";
import { subjectValues } from "@/features/admin/schemas";
import { Search } from "lucide-react";

// Create acronym matcher
const getAcronymRegex = (input: string) => {
  const parts = input.trim().split(/\s*/);
  const pattern = parts.map((char) => `(?=.*\\b${char})`).join("");
  return new RegExp(pattern, "i");
};

export default function SubjectSearchDialog() {
  const router = useRouter();
  const { data: subjects, isLoading } = useGetSubjects();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredSubjects = subjects?.data.filter((subject: subjectValues) => {
    const normalizedQuery = query.toLowerCase().trim();
    const name = subject.name.toLowerCase();
    const code = subject.subjectCode?.toLowerCase();

    const fullMatch =
      name.includes(normalizedQuery) || code?.includes(normalizedQuery);
    const acronymMatch = getAcronymRegex(normalizedQuery).test(subject.name);

    return fullMatch || acronymMatch;
  });

  const handleSelect = (subjectId: string) => {
    setOpen(false);
    router.push(`/papers/${subjectId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center cursor-pointer text-white w-full sm:max-w-md mx-auto">
          <Search className="h-4 w-4 mr-2" />
          Search Subjects...
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="px-4 pt-4">Search Subjects</DialogTitle>
        </DialogHeader>
        <Command className="p-4">
          <CommandInput
            placeholder="Search by name or code (e.g. OS, ADA)..."
            value={query}
            onValueChange={setQuery}
            className="h-10"
            disabled={isLoading}
          />
          <CommandEmpty>No matching subjects found.</CommandEmpty>
          <CommandGroup>
            {filteredSubjects?.map((subject) => (
              <CommandItem
                key={subject.id}
                onSelect={() => handleSelect(subject.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {subject.subjectCode}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
