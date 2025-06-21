import { useGetCourses, useGetSubjects, useGetBranches } from "@/features/admin/api/use-get-details";
import { CourseTypeName } from "../schemas";

export const useEntityNameById = () => {
  const { data: courses} = useGetCourses();
  const { data: subjects } = useGetSubjects();
  const { data: branches } = useGetBranches();

  const getCourseNameById = (courseId: string): CourseTypeName | "NA" => {
    const res = courses?.data.find((course) => course.id === courseId);
    return res ? (res.name as CourseTypeName) : "NA";
  };

  const getSubjectNameById = (subjectId: string): string => {
    const res = subjects?.data.find((subject) => subject.id === subjectId);
    return res ? res.name : "NA";
  };

  const getBranchNameById = (branchId: string): string => {
    const res = branches?.data.find((branch) => branch.id === branchId);
    return res ? res.name : "NA";
  };

  return {
    getCourseNameById,
    getSubjectNameById,
    getBranchNameById,
    courses,
    subjects,
    branches,

  };
};
