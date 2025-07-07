"use client";
import React from "react";
import {
  Hash,
  ArrowRight,
  PaperclipIcon,
  CalendarRange,
  Scroll,
  Download,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import SkeletonCard from "./SkelatonCard";
import { useGetSubjects } from "@/features/admin/api/use-get-details";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import { getSeasonTheme } from "@/lib/utils";
import { CourseTypeName, Season } from "@/features/admin/schemas";
import Link from "next/link";

interface QuestionPaperProps {
  id: string;
  branchId: string;
  courseId: string;
  subjectId: string;
  year: number;
  season: string;
  notionUrl: string;
}

interface QuestionPaperCardProps {
  paper: QuestionPaperProps;
}

const QuestionPaperCard: React.FC<QuestionPaperCardProps> = ({ paper }) => {
  const navigate = useRouter();
  const { getBranchNameById, getCourseNameById } = useEntityNameById();
  const { data: subjects, isLoading } = useGetSubjects();

  const subject = subjects?.data.find(
    (subject) => paper.subjectId === subject.id
  );
  const branchName = getBranchNameById(paper.branchId);
  const courseName = getCourseNameById(paper.courseId);

  const seasonTheme = getSeasonTheme(paper.season as Season);
  const SeasonIcon = seasonTheme?.icon;

  if (!subject || isLoading) {
    return <SkeletonCard lines={3} />;
  }
  const handleViewSolution = () => {
    navigate.push(`/solutions/${paper.notionUrl}`);
  };

  const courseNameForUrl = courseName === CourseTypeName.Diploma ? "DE" : CourseTypeName.Degree ? "BE" : ""
  const getSeason = `${paper.season.charAt(0).toUpperCase()}${paper.year}`

  const paperUrl = `https://www.gtu.ac.in/uploads/${getSeason}/${courseNameForUrl}/${subject.subjectCode}.pdf`

  return (
    <div
      className={`bg-white dark:bg-gray-950  dark:text-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300  border p-6 group flex flex-col h-full relative overflow-hidden z-0`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 transform translate-x-8 -translate-y-8 transition-transform group-hover:scale-110`}
      ></div>

      {/* Header Section */}
      <div className="flex items-center mb-6 relative z-10">
        <div
          className={`bg-blue-400 rounded-xl p-3 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <PaperclipIcon className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 transition-colors">
            {subject.name}
          </h3>
        </div>
        <span
          className={` bg-gray-100 dark:bg-zinc-800 dark:text-white/90 text-xs text-black font-semibold capitalize rounded-md ml-3 px-4 py-1 `}
        >
          {courseName}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Scroll className="w-4 h-4 text-gray-400 dark:text-white/90" />
              <span className="text-sm font-medium text-gray-500 dark:text-white/90">Branch</span>
            </div>
            <h3 className={`text-sm font-semibold capitalize`}>
              {branchName}
            </h3>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-400 dark:text-white/90" />
              <span className="text-sm font-medium text-gray-500 dark:text-white/90">
                Subject Code
              </span>
            </div>
            <h3
              className={`text-sm font-semibold capitalize bg-zinc-100 text-black p-2 rounded-sm `}
            >
              {subject.subjectCode}
            </h3>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-gray-400 dark:text-white/90" />
              <span className="text-sm font-medium text-gray-500 dark:text-white/90">
                Download Paper
              </span>
            </div>
            <Link
              href={paperUrl}
              target="_blank"
              className={`text-sm font-semibold capitalize bg-zinc-100 text-black p-1 rounded-sm flex gap-2`}
            >
              <span>Download</span>
              <ExternalLink className="size-5"/>
            </Link>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <CalendarRange className="w-4 h-4 text-gray-400 dark:text-white/90" />
              <span className="text-sm font-medium text-gray-500 dark:text-white/90">Year</span>
            </div>
            <h2 className="flex items-center justify-center gap-2">
              <span
                className={`text-sm font-semibold capitalize bg-zinc-100 text-black p-2 rounded-sm `}
              >
                {paper.year}
              </span>

              <span className="w-[1px] text-gray-200 rounded-md bg-gray-200 h-7" />

              <h3
                className={`${seasonTheme?.color} text-xs p-1 font-semibold capitalize rounded-sm flex items-center gap-3`}
              >
                {paper.season}
                {SeasonIcon && <SeasonIcon />}
              </h3>
            </h2>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => handleViewSolution()}
          variant={"default"}
          className="flex items-center justify-center"
        >
          <span className="relative z-10">View Solution</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionPaperCard;
