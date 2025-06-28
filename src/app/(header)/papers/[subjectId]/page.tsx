import SubjectPapersComponent from "@/components/SubjectPapers";
import Wrapper from "@/components/Wrapper";

interface SubjectIdPageProps {
  params: Promise<{ subjectId: string }>;
}

const SubjectIdPage = async ({ params }: SubjectIdPageProps) => {
  const { subjectId } = await params;
  return (
    <Wrapper>
      <SubjectPapersComponent subjectId={subjectId}/>
    </Wrapper>
  );
};

export default SubjectIdPage;
