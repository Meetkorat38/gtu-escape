import { z } from 'zod';

export enum CourseTypeName {
  Diploma = "Diploma",
  Degree = "Degree",
}
export enum Season {
  WINTER = "WINTER",
  SUMMER = "SUMMER",
}

export const EngineeringTypeSchema = z.object({
  id: z.string().optional(),
  name: z.nativeEnum(CourseTypeName),
});

export const BranchSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Branch name cannot be empty."),
  branchCode: z.coerce.number().gte(1 , "Branch code not be zero or an negative"),
  courseId: z.string(),
});

export const SubjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Subject name cannot be empty."),
  subjectCode: z.string().min(4, "Subject code must be 4 numbers."),
  courseId: z.string(),
  semester: z.string(),
  branchId: z.string(),
});

export const PaperSchema = z.object({
  id: z.string().optional(),
  subjectId: z.string(),
  branchId: z.string(),
  courseId: z.string(),
  season: z.nativeEnum(Season),

  year: z.coerce.number(),

  notionUrl: z.string().min(5, "Must be a valid URL for Notion."),

  createdAt: z.string().datetime().optional(), 
  updatedAt: z.string().datetime().optional(), 
});

export const NewPaperSchema = PaperSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});


export const GetOnePaperSchema = z.object({ paperId: z.string() });

export const GetOneSchema = z.object({ id: z.string() });

export const GetOneSubjectSchema = z.object({ subjectId: z.string() });

export const GetOneBranchSchema = z.object({ branchId: z.string() });

export const UpdatePaperSchema = PaperSchema.partial(); 

export const UpdateBranchSchema = BranchSchema.partial();

export const UpdateSubjectSchema = SubjectSchema.partial();

