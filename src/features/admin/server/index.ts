import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  BranchSchema,
  GetOneBranchSchema,
  GetOnePaperSchema,
  GetOneSubjectSchema,
  PaperSchema,
  SubjectSchema,
  UpdateBranchSchema,
  UpdatePaperSchema,
  UpdateSubjectSchema,
} from "../schemas";
import prisma from "@/lib/db";

const app = new Hono()
  // Papers 📃

  .get("/papers", async (c) => {
    const data = await prisma.paper.findMany();

    return c.json({ data });
  })
  .get(
    "/papers/:paperId",
    zValidator("param", GetOnePaperSchema),
    async (c) => {
      // Get One Paper

      const { paperId } = c.req.valid("param");

      if (!paperId) {
        return c.json({ error: "Paper not found" }, 404);
      }

      const paper = await prisma.paper.findUnique({
        where: {
          id: paperId,
        },
      });

      return c.json({ data: paper });
    }
  )
  .post("/papers", zValidator("json", PaperSchema), async (c) => {
    // Create One Paper
    const { year, branchId, courseId, notionUrl, subjectId, season } =
      c.req.valid("json");

    const data = await prisma.paper.create({
      data: {
        notionUrl,
        year,
        branchId,
        courseId,
        subjectId,
        season,
      },
    });

    if (!data) {
      return c.json({ error: "Paper creation failed" });
    }

    return c.json({ data: data.id });
  })
  .put(
    "/papers/:paperId",
    zValidator("json", UpdatePaperSchema),
    zValidator("param", GetOnePaperSchema),
    async (c) => {
      const { paperId } = c.req.valid("param");
      const { branchId, courseId, notionUrl, season, subjectId, year } =
        c.req.valid("json");

      if (!paperId) {
        return c.json({ error: "PaperId not founded" });
      }

      const paper = await prisma.paper.update({
        where: {
          id: paperId,
        },
        data: {
          courseId,
          branchId,
          subjectId,
          season,
          year,
          notionUrl,
        },
      });

      return c.json({ data: paper });
    }
  )
  .delete(
    "/papers/:paperId",
    zValidator("param", GetOnePaperSchema),
    async (c) => {
      const { paperId } = c.req.valid("param");

      if (!paperId) {
        return c.json({ error: "PaperId not founded" });
      }

      const paper = await prisma.paper.delete({
        where: {
          id: paperId,
        },
      });

      if(!paper){
        return c.json({error:"Delete paper failed"})
      }

      return c.json({ success: true, paperId: paper.id });
    }
  )

  // Subjects 📚

  .get("/subjects", async (c) => {
    const data = await prisma.subject.findMany();
    return c.json({ data });
  })
  .get(
    "/subjects/:subjectId",
    zValidator("param", GetOneSubjectSchema),
    async (c) => {
      const { subjectId } = c.req.valid("param");

      if (!subjectId) {
        return c.json({ error: "SubjectId not founded" });
      }

      const subject = await prisma.subject.findUnique({
        where: {
          id: subjectId,
        },
      });

      return c.json({ data: subject });
    }
  )
  .get("/subjects/:courseId", async (c) => {
    const { courseId } = c.req.param();

    const data = await prisma.subject.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
        name: true,
        subjectCode: true,
      },
    });

    return c.json({ data });
  })
  .post("/subjects", zValidator("json", SubjectSchema), async (c) => {
    // Create One Paper
    const { subjectCode, courseId, name, branchId, semester } =
      c.req.valid("json");

    const subject = await prisma.subject.create({
      data: {
        name,
        subjectCode,
        courseId,
        semester,
        branchId,
      },
    });

    if (!subject) {
      return c.json({ error: "Subject creation failed" });
    }

    return c.json({ data: subject.id });
  })
  .put(
    "/subjects/:subjectId",
    zValidator("json", UpdateSubjectSchema),
    zValidator("param", GetOneSubjectSchema),
    async (c) => {
      const { subjectId } = c.req.valid("param");
      const { branchId, courseId, name, semester, subjectCode } =
        c.req.valid("json");

      if (!subjectId) {
        return c.json({ error: "SubjectId not founded" });
      }

      const subject = await prisma.subject.update({
        where: {
          id: subjectId,
        },
        data: {
          courseId,
          branchId,
          name,
          semester,
          subjectCode,
        },
      });

      return c.json({ data: subject });
    }
  )
  .delete(
    "/subjects/:subjectId",
    zValidator("param", GetOneSubjectSchema),
    async (c) => {
      const { subjectId } = c.req.valid("param");

      if (!subjectId) {
        return c.json({ error: "SubjectId not founded" });
      }

      const subejct = await prisma.subject.delete({
        where: {
          id: subjectId,
        },
      });

      return c.json({ success: true, subjectId: subejct.id });
    }
  )

  // Branches 🪛

  .get("/branches", async (c) => {
    const data = await prisma.branch.findMany({});

    return c.json({ data });
  })
  .get(
    "/branches/:branchId",
    zValidator("param", GetOneBranchSchema),
    async (c) => {
      const { branchId } = c.req.valid("param");

      if (!branchId) {
        return c.json({ error: "BranchId not founded" });
      }

      const branch = await prisma.branch.findUnique({
        where: {
          id: branchId,
        },
      });

      return c.json({ data: branch });
    }
  )
  .get("/branches/:courseId", async (c) => {
    const { courseId } = c.req.param();

    const data = await prisma.branch.findMany({
      where: {
        courseId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return c.json({ data });
  })
  .post("/branches", zValidator("json", BranchSchema), async (c) => {
    const { name, courseId, branchCode } = c.req.valid("json");
    // Create One Paper
    const branch = await prisma.branch.create({
      data: {
        name,
        courseId,
        branchCode,
      },
    });

    if (!branch) {
      return c.json({error:"Branch creation failed"});
    }

    return c.json({ data: branch.id });
  })
  .put(
    "/branches/:branchId",
    zValidator("json", UpdateBranchSchema),
    zValidator("param", GetOneBranchSchema),
    async (c) => {
      const { branchId } = c.req.valid("param");
      const { courseId, name, branchCode } = c.req.valid("json");

      if (!branchId) {
        return c.json({ error: "BranchId not founded" });
      }

      const branch = await prisma.branch.update({
        where: {
          id: branchId,
        },
        data: {
          courseId,
          name,
          branchCode
        },
      });

      return c.json({ data: branch });
    }
  )
  .delete(
    "/branches/:branchId",
    zValidator("param", GetOneBranchSchema),
    async (c) => {
      const { branchId } = c.req.valid("param");

      if (!branchId) {
        return c.json({ error: "BranchId not founded" });
      }

      const branch = await prisma.branch.delete({
        where: {
          id: branchId,
        },
      });

      return c.json({ success: true, branchId: branch.id });
    }
  )

  // Courses 🏫

  .get("/courses", async (c) => {
    const data = await prisma.course.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    return c.json({ data });
  })

export default app;
