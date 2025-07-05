"use client";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import QuestionPaperCard from "./QuestionPaperCard";
import { useGetPapers } from "@/features/admin/api/use-get-details";
import SkeletonCard from "./SkelatonCard";
import { toast } from "sonner";
import PageHeading from "./PageHeading";

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
    return;
  }

  const subjectPaper = papers.data.filter(
    (paper) => paper.subjectId === subjectId
  );

  const subjectName = getSubjectNameById(subjectId);
  const avvailablePapers = subjectPaper.length;

  return (
    <div className="pt-6">
          <PageHeading name={subjectName} solutionName="Solutions" solutionNumber={avvailablePapers} key={subjectName}/>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectPaper.map((paper) => (
          <QuestionPaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default SubjectPapersComponent;
