import { notion } from "@/lib/notion";
import { NotionPage } from "@/features/notion";

interface SolutionPageProps {
  params: {
    solutionId: string;
  };
}

const SolutionPage = async ({ params }: SolutionPageProps) => {
  const solutionId = params.solutionId;
  const data = await notion.getPage(solutionId);

  return (
    <NotionPage recordMap={data} rootPageId={solutionId} key={solutionId} />
  );
};

export default SolutionPage;
