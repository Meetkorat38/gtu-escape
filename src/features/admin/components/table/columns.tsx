"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, MoreVertical } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { PaperFormValues } from "../PapersForm";
import { SubjectFormValues } from "../SubjectsForm";
import { BranchFormValues } from "../BranchesForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const paperColumns: ColumnDef<PaperFormValues>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courseId",
    header: "Course",
  },
  {
    accessorKey: "branchId",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Branch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "subjectId",
    header: "Subject",
  },
  {
    accessorKey: "season",
    header: "Season",
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: () => {
      return (
        <Button variant={"outline"} className="flex gap-2 cursor-pointer">
          <p>View</p>
          <Eye />
        </Button>
      );
    }
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const paperId = row.id
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(paperId)}
            >
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

export const subjectColumns: ColumnDef<SubjectFormValues>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courseId",
    header: "Course",
  },
  {
    accessorKey: "branchId",
    header: "Branch",
  },
  {
    accessorKey: "name",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Subject Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "subjectCode",
    header: "Subject Code",
  },
 
  {
    accessorKey: "actions",
    cell: () => {
      return (
        // <TaskActions id={id} projectId={projectId}>
        <Button variant={"ghost"} className="size-8 p-0">
          <MoreVertical className="size-4" />
        </Button>
        // </TaskActions>
      );
    },
  },
];

export const branchColumns: ColumnDef<BranchFormValues>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courseId",
    header: "Course",
  },
  {
    accessorKey: "name",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Branch Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "branchCode",
    header: "Branch Code",
  },
   
  {
    accessorKey: "actions",
    cell: () => {
      return (
        // <TaskActions id={id} projectId={projectId}>
        <Button variant={"ghost"} className="size-8 p-0">
          <MoreVertical className="size-4" />
        </Button>
        // </TaskActions>
      );
    },
  },
];


