"use client";
import { subjectVisuals } from "@/lib/utils";
import { ArrowRight, GraduationCap, Hash } from "lucide-react";
import { Button } from "./ui/button";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import { useRouter } from "next/navigation";

interface BranchDataProps {
  id:string
  name: string;
  branchCode: number;
  courseId:string;
}

interface BranchCardProps {
  branch: BranchDataProps;
  index?: number;
}

const BranchCard = ({ branch, index = 0 }: BranchCardProps) => {
  const { getCourseNameById } = useEntityNameById();
  const router = useRouter()

  const courseName = getCourseNameById(branch.courseId);

  const { icon: Icon, color: iconColor } =
    subjectVisuals[index % subjectVisuals.length];


  const handleClick = () => {
    router.push(`/subjects/${branch.id}`)
  }

  return (
    <div
      className={`bg-white dark:bg-gray-950  dark:text-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border p-6 group flex flex-col h-full relative overflow-hidden z-0`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-30 transform translate-x-8 -translate-y-8 transition-transform group-hover:scale-110`}
      ></div>

      {/* Header Section */}
      <div className="flex items-center mb-6 relative z-10">
        <div
          className={`${iconColor} rounded-xl p-3 mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <Icon className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-gray-700 transition-colors">
            {branch.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-gray-400 dark:text-white/90" />
              <span className="text-sm font-medium text-gray-500 dark:text-white/90">
                Course Type
              </span>
            </div>
            <span className={`text-sm font-semibold capitalize`}>
              {courseName}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-400 dark:text-white/90" />
              <span className="text-sm font-medium text-gray-500 dark:text-white/90">
                Branch Code
              </span>
            </div>
            <span
              className={`text-sm font-semibold capitalize ${iconColor} text-white p-2 rounded-sm `}
            >
              {branch.branchCode}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleClick}
          variant={"default"}
          className="flex items-center justify-center w-full"
        >
          <span className="relative z-10">View Papers</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default BranchCard;
