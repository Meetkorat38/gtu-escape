"use client";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import { getSemesterTheme } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  Building,
  Code,
  Download,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SubjectDataProps {
  name: string;
  id: string;
  courseId: string;
  subjectCode: string;
  branchId: string;
  semester: string;
}

interface SubjectCardProps {
  subject: SubjectDataProps;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const router = useRouter();
  const { getCourseNameById, getBranchNameById } = useEntityNameById();
  const branchName = getBranchNameById(subject.branchId);
  const courseName = getCourseNameById(subject.courseId);

  const theme = getSemesterTheme(subject.semester);

  const handleClick = () => {
    router.push(`/papers/${subject.id}`);
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 dark:bg-gray-950 dark:text-white overflow-hidden relative p-6 flex flex-col gap-y-4`}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg shadow-sm ${theme.icon}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors dark:text-white">
              {subject.name}
            </h3>
          </div>
        </div>
        <span
          className={`px-3 py-1 ml-3 rounded-full text-nowrap capitalize text-xs font-semibold ${theme.badge}`}
        >
          {subject.semester}
        </span>
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-gray-400 dark:text-white/90" />
            <span className="text-sm font-medium text-gray-500 dark:text-white/90">
              Subject Code
            </span>
          </div>
          <h3 className="text-sm font-mono text-gray-600 bg-white/80 px-2 py-1 rounded shadow-sm dark:text-black">
            {subject.subjectCode}
          </h3>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4 text-gray-400 dark:text-white/90" />
            <span className="text-sm font-medium text-gray-500 dark:text-white/90">
              Syllabus
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-sm font-mono text-gray-600 bg-white/80 px-2 py-1 rounded shadow-sm dark:text-black">
              Open
            </h3>
            <Link
              href={`https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/Syallbus/${subject.subjectCode}.pdf`}
              target="_blank"
            >
              <ExternalLink className="text-gray-600 dark:text-white/80 size-5" />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-gray-400 dark:text-white/90" />
            <span className="text-sm font-medium text-gray-500 dark:text-white/90">
              Branch
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {branchName}
          </h3>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-gray-400 dark:text-white/90" />
            <span className="text-sm font-medium text-gray-500 dark:text-white/90">
              Course
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {courseName}
          </h3>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant={"default"}
        className="flex items-center justify-center w-full mt-3"
        onClick={handleClick}
      >
        <span>View Paper</span>
        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default SubjectCard;