"use client";

import { useGetSubjects } from "@/features/admin/api/use-get-details";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import { toast } from "sonner";
import SkeletonCard from "./SkelatonCard";
import SubjectCard from "./SubjectCard";

interface BranchSubjectComponentProps {
  branchId?: string;
}

const BranchSubjectComponent = ({ branchId }: BranchSubjectComponentProps) => {
  const { getBranchNameById } = useEntityNameById();
  const { data: subjects, isError, isLoading } = useGetSubjects();

  if (isLoading || !subjects || !branchId) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} actions lines={3} />
        ))}
      </div>
    );
  }

  if (isError) {
    toast.error("Errrr white fetching branch subjects");
    return <p>Error while fetching papers</p>;
  }

  const branchSubjects = subjects.data.filter(
    (subject) => subject.branchId === branchId
  );

  const branchSubjectsLength = branchSubjects.length
  const branchName = getBranchNameById(branchId)

  const sortedSubjects = [...branchSubjects].sort((a, b) => {
    const semesterA = parseInt(a.semester.replace("semester ", ""));
    const semesterB = parseInt(b.semester.replace("semester ", ""));
    return semesterA - semesterB;
  });

  return (
   <div className="pt-6 dark:bg-gray-900 dark:text-white">
    <div className="text-center mb-16">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3 dark:text-white">
          Recently Added <span className="text-blue-600">{branchName}</span>{" "}
          Subjects
        </h2>
        {/* Subtitle */}
        <p className="text-lg text-gray-500 min-w mx-auto dark:text-white/80">
          Explore the latest {branchName.toLowerCase()} subjects with detailed solutions and structured
          formats.
        </p>

        {/* Stats */}
        <div className="mt-6 inline-flex items-center justify-center gap-2 bg-zinc-100 rounded-md px-4 py-2 text-sm font-medium text-gray-800">
          <span>Available Subjects:</span>
          <span className="text-blue-600 font-bold text-base">
            {branchSubjectsLength}
          </span>
        </div>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {sortedSubjects.map((subject) => {
        return(
          <SubjectCard subject={subject} key={subject.id}/>
        )
      })}
    </div>
   </div>
  );
};

export default BranchSubjectComponent;
