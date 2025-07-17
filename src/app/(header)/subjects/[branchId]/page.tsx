import BranchSubjectComponent from "@/components/BranchSubject";
import Wrapper from "@/components/Wrapper";

interface BranchIdPageProps {
  params: Promise<{ branchId: string }>
}

const BranchIdPage =  async ({ params }: BranchIdPageProps) => {
  const {branchId} = await params;

  return (
    <Wrapper>
        <BranchSubjectComponent branchId={branchId}/>
    </Wrapper>
  );
};

export default BranchIdPage