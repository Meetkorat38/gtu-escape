"use client";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import React from "react";
import QuestionPaperCard from "./QuestionPaperCard";
import { useGetPapers } from "@/features/admin/api/use-get-details";
import SkeletonCard from "./SkelatonCard";
import { toast } from "sonner";

interface SubjectPapersComponentProps {
  subjectId: string;
}

const SubjectPapersComponent = ({ subjectId }: SubjectPapersComponentProps) => {
  const { getSubjectNameById } = useEntityNameById();
  const { data: papers, isLoading, isError } = useGetPapers();

  if (isLoading || !papers) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} actions lines={3} />
        ))}
      </div>
    );
  }

  if (isError) {
    toast.error("Errro white fetching papers");
    return <p>Error while fetching papers</p>;
  }

  const subjectPaper = papers.data.filter(
    (paper) => paper.subjectId === subjectId
  );

  const subjectName = getSubjectNameById(subjectId);
  const avvailablePapers = subjectPaper.length;

  return (
    <div className="pt-6">
      <div className="text-center mb-16">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Recently Added <span className="text-blue-600">{subjectName}</span>{" "}
          Papers
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 min-w mx-auto">
          Explore the latest exam papers with detailed solutions and structured
          formats.
        </p>

        {/* Stats */}
        <div className="mt-6 inline-flex items-center justify-center gap-2 bg-zinc-100 rounded-md px-4 py-2 text-sm font-medium text-gray-800">
          <span>Available Solutions:</span>
          <span className="text-blue-600 font-bold text-base">
            {avvailablePapers}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectPaper.map((paper) => (
          <QuestionPaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default SubjectPapersComponent;
