"use client";
import { useGetPapers } from "@/features/admin/api/use-get-details";
import QuestionPaperCard from "./QuestionPaperCard";
import Wrapper from "./Wrapper";
import SkeletonCard from "./SkelatonCard";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const FeaturedPapers = () => {
  const router = useRouter()
  const { data: papers, isLoading, isError } = useGetPapers();

  if (isLoading || !papers) {
    return (
      <Wrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} actions lines={3} />
        ))}
      </Wrapper>
    );
  }

  if (isError) {
    return <p>Error while fetching papers</p>;
  }

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900">
      <Wrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-zinc-50">
            Recently Added Papers
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/80">
            Latest question papers with detailed solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.data.map((paper) => (
            <QuestionPaperCard key={paper.id} paper={paper} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant={"default"} onClick={() => router.push("/papers")} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium">
            Browse All Papers
          </Button>
        </div>
      </Wrapper>
    </div>
  );
};

export default FeaturedPapers;
