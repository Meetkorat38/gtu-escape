import { notion } from "@/lib/notion";
import { NotionPage } from "@/features/notion";
import SolutionHeader from "@/components/SolutionHeader";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface SolutionPageProps {
  params: {
    solutionId: string;
  };
}

const SolutionPage = async ({ params }: SolutionPageProps) => {
  const {solutionId} = await params;
  const data = await notion.getPage(solutionId);

  return (
    <>
      <SolutionHeader  solutionId={solutionId} />
      <NotionPage recordMap={data} rootPageId={solutionId} key={solutionId}/>
      <ScrollToTopButton/>
    </>
  );
};

export default SolutionPage;
