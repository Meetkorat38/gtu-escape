import { notion } from "@/lib/notion";
import { NotionPage } from "@/features/notion";
import SolutionHeader from "@/components/SolutionHeader";
import ScrollToTopButton from "@/components/ScrollToTopButton";

interface SolutionPageProps {
   params: Promise<{ solutionId: string }>;
}

const SolutionPage = async ({ params }: SolutionPageProps) => {
  const {solutionId} = await params;
  const data = await notion.getPage(solutionId);
  if(!data){
      console.error("Failed to fetch Notion data for", solutionId);

    return (
      <p>Failed to fetch Notion data for.....
        <span className="bg-green-500 text-white p-4">{solutionId}</span>
      </p>
    )
  }

  return (
    <>
      <SolutionHeader  solutionId={solutionId} />
      <NotionPage recordMap={data} rootPageId={solutionId} key={solutionId}/>
      <ScrollToTopButton/>
    </>
  );
};

export default SolutionPage;
