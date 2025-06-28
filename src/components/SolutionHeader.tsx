"use client";
import Wrapper from "./Wrapper";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { useGetPapers } from "@/features/admin/api/use-get-details";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import { Skeleton } from "./ui/skeleton";

interface SolutionHeaderProps {
  solutionId: string;
}

const SolutionHeader = ({ solutionId }: SolutionHeaderProps) => {
  const naviagte = useRouter();
  const { data: papers, isLoading, isError } = useGetPapers();

  const { getSubjectNameById, getBranchNameById } = useEntityNameById();
  
  if (isLoading) {
    return <Skeleton className="min-w-screen h-8" />;
  }
  
  if (isError || !papers) {
    notFound();
  }
  
  const paper = papers?.data.find((paper) => paper.notionUrl === solutionId)
  const branchName = getBranchNameById(paper!.branchId!);
  const subjectName = getSubjectNameById(paper!.subjectId!);

  return (
    <div className="px-0 sm:px-2 dark:pb-1 h-max bg-zinc-100 dark:bg-gray-800 dark:border-b dark:border-white/40">
      <Wrapper className="flex flex-row items-center justify-between">
        <Button
          onClick={() => naviagte.back()}
          variant={"ghost"}
          className="border-2 cursor-pointer "
        >
          <ChevronLeft size={4} className="text-black dark:text-white" />
        </Button>
        <div className="flex flex-row items-center gap-2">
          <h3 className="border-r text-sm md:text-base border-zinc-300 pr-2 dark:text-white/90">
            {branchName}
          </h3>
          <h3 className="border-r text-sm md:text-base border-zinc-300 pr-2 dark:text-white/90">
            {subjectName}
          </h3>
          <h3 className="dark:text-white/90 text-sm md:text-base ">
            {paper!.year}
          </h3>
        </div>
      </Wrapper>
    </div>
  );
};

export default SolutionHeader;
