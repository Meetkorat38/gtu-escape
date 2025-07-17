"use client";

import { useGetSubjects } from "@/features/admin/api/use-get-details";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import { toast } from "sonner";
import SkeletonCard from "./SkelatonCard";
import SubjectCard from "./SubjectCard";
import PageHeading from "./PageHeading";

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
    return;
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
    <PageHeading name={branchName} solutionName="Subjects" solutionNumber={branchSubjectsLength} key={branchName}/>
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
