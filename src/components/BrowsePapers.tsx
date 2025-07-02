"use client";
import React from "react";
import SkeletonCard from "./SkelatonCard";
import { useGetPapers } from "@/features/admin/api/use-get-details";
import { toast } from "sonner";
import QuestionPaperCard from "./QuestionPaperCard";
import SearchBar from "./SearchBar";
import { notFound } from "next/navigation";

const BrowsePapers = () => {
  const { data: papers, isLoading, isError } = useGetPapers();

  if (isLoading || !papers) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <SkeletonCard key={i} actions lines={3} />
        ))}
      </div>
    );
  }

  if (isError) {
    toast.error("Errro white fetching papers");
    notFound();
  }

  return (
    <div className="pt-6">
      <div className="text-center mb-16">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight dark:text-white  mb-3">
          Browse All <span className="text-blue-600">Papers</span>
          
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 dark:text-white/90 min-w  mx-auto">
          Explore the latest exam papers with detailed solutions and structured
          formats.
        </p>

        {/* Stats */}
        <div className="mt-4 ">

            <SearchBar/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.data.map((paper) => (
          <QuestionPaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default BrowsePapers;
