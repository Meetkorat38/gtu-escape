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

export const useGetCourseBranches = (courseId: string, options?: { enabled?: boolean }) => {
  // get branches[courseId]
  const query = useQuery({
    queryKey: ["branches", courseId],
    queryFn: async () => {
      const response = await client.api.admin.branches.course[":courseId"]["$get"]({
        param: { courseId },
      });

      if (!response.ok) {
        throw new Error("Get an error while fetching courses branches");
      }

      const data = await response.json();

      return data;
    },
    enabled: !!courseId && options?.enabled !== false,
  });
  return query;
};

export const useGetCourseSubjects = (courseId: string, options?: { enabled?: boolean }) => {
  // get subjects[courseId]
  const query = useQuery({
    queryKey: ["subjects", courseId],
    queryFn: async () => {
      const response = await client.api.admin.subjects.course[":courseId"]["$get"]({
        param: { courseId },
      });

      if (!response.ok) {
        throw new Error("Get an error while fetching courses subjects");
      }

      const data = await response.json();

      return data;
    },
    enabled: !!courseId && options?.enabled !== false,
  });
  return query;
};

export const useGetSinglePaper = (paperId:string) => {
  const query = useQuery({
    queryKey: ["paper", paperId],
    queryFn: async () => {
      const response = await client.api.admin.papers[":paperId"]["$get"]({
        param: { paperId },
      });

      if (!response.ok) {
        throw new Error("Fetching Paper failed");
      }

      const paper = await response.json();

      return paper;
    },
  });
  return query;
}

export const useGetSingleSubject = (subjectId:string) => {
  const query = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: async () => {
      const response = await client.api.admin.subjects[":subjectId"]["$get"]({
        param: { subjectId },
      });

      if (!response.ok) {
        throw new Error("Fetching Subject failed");
      }

      const subject = await response.json();

      return subject;
    },
  });
  return query;
}

export const useGetSingleBranch = (branchId:string) => {
  const query = useQuery({
    queryKey: ["branches", branchId],
    queryFn: async () => {
      const response = await client.api.admin.branches[":branchId"]["$get"]({
        param: { branchId },
      });

      if (!response.ok) {
        throw new Error("Fetching Branch failed");
      }

      const branch = await response.json();

      return branch;
    },
  });
  return query;
}
