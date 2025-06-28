"use client";
import Wrapper from "./Wrapper";
import BranchCard from "./BranchCard";
import { useGetBranches } from "@/features/admin/api/use-get-details";
import SkeletonCard from "./SkelatonCard";

const BranchGrid = () => {
  const { data: branches, isLoading } = useGetBranches();

  if (isLoading) {
    return (
      <Wrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i}  actions lines={3} />
        ))}
      </Wrapper>
    );
  }

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <Wrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-zinc-50 mb-4">
            Browse by Branches
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/80">
            Choose your engineering branch to access relevant question papers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches?.data.map((branch, index) => {
            return <BranchCard branch={branch} index={index} key={branch.id} />;
          })}
        </div>
      </Wrapper>
    </div>
  );
};

export default BranchGrid;
