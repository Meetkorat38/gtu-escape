import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetPapers = () => {
  // get papers
  const query = useQuery({
    queryKey: ["papers"],
    queryFn: async () => {
      const response = await client.api.admin.papers["$get"]();

      if (!response.ok) {
        throw new Error("Get an error while fetching papers");
      }
      const papers = await response.json();

      return papers;
    },
  });

  return query;
};

export const useGetSubjects = () => {
  // get subjects
  const query = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await client.api.admin.subjects["$get"]();

      if (!response.ok) {
        throw new Error("Get an error while fetching subjects");
      }
      const data = await response.json();

      return data;
    },
  });

  return query;
};

export const useGetBranches = () => {
  // get branches
  const query = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await client.api.admin.branches["$get"]();

      if (!response.ok) {
        throw new Error("Get an error while fetching branches");
      }
      const data = await response.json();

      return data;
    },
  });

  return query;
};

export const useGetCourses = () => {
  // get courses
  const query = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await client.api.admin.courses["$get"]();

      if (!response.ok) {
        throw new Error("Get an error while fetching Courses");
      }
      const data = await response.json();

      return data;
    },
  });

  return query;
};

export const useGetCourseBranches = (courseId: string) => {
  // get branches[courseId]
  const query = useQuery({
    queryKey: ["branches", courseId],
    queryFn: async () => {
      const response = await client.api.admin.branches[":courseId"]["$get"]({
        param: { courseId },
      });

      if (!response.ok) {
        throw new Error("Get an error while fetching courses branches");
      }

      const data = await response.json();

      return data;
    },
  });
  return query;
};

export const useGetCourseSubjects = (courseId: string) => {
  // get subjects[courseId]
  const query = useQuery({
    queryKey: ["subjects", courseId],
    queryFn: async () => {
      const response = await client.api.admin.subjects[":courseId"]["$get"]({
        param: { courseId },
      });

      if (!response.ok) {
        throw new Error("Get an error while fetching courses subjects");
      }

      const data = await response.json();

      return data;
    },
  });
  return query;
};
