"use client";
import SkeletonCard from "./SkelatonCard";
import { useGetSubjects } from "@/features/admin/api/use-get-details";
import { toast } from "sonner";
import SubjectCard from "./SubjectCard";

const BrowseSubjects = () => {
  const { data: subjects, isLoading, isError } = useGetSubjects();

  if (isLoading || !subjects) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <SkeletonCard key={i} actions lines={3} />
        ))}
      </div>
    );
  }

  if (isError) {
    toast.error("Errro white fetching subjects");
    return ;
  }

  return (
    <div className="pt-6">
      <div className="text-center mb-16">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight dark:text-white  mb-3">
          Browse All <span className="text-blue-600">Subjects</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 dark:text-white/90 min-w  mx-auto">
           Explore the latest all avvailable subjects with detailed solutions and structured
          formats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.data.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default BrowseSubjects;
