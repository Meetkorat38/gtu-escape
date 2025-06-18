"use client"
import React from "react";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SolutionHeaderProps {
  subject: string;
  year: string;
  semester: string;
}

const SolutionHeader = ({ semester, subject, year }: SolutionHeaderProps) => {
    const naviagte = useRouter()
  return (
    <div className="px-2 h-max bg-zinc-100">
      <Wrapper className="flex flex-row items-center justify-between">
        <Button onClick={() => naviagte.back()} variant={"ghost"} className="border-2 cursor-pointer">
            <ChevronLeft size={4} className="text-black"/>
        </Button>
        <div className="flex flex-row items-center gap-2">
            <h3 className="border-r border-zinc-300 pr-2">{subject}</h3>
            <h3 className="border-r border-zinc-300 pr-2">{semester}</h3>
            <h3>{year}</h3>
        </div>
      </Wrapper>
    </div>
  );
};

export default SolutionHeader;
