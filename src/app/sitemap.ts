/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/lib/rpc";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/about`, lastModified: now },
    { url: `${baseUrl}/community`, lastModified: now },
  ];

  try {
    const [branchesRes, subjectsRes, papersRes] = await Promise.all([
      client.api.admin.branches["$get"](),
      client.api.admin.subjects["$get"](),
      client.api.admin.papers["$get"](),
    ]);
    const [branches, subjects, papers] = await Promise.all([
      branchesRes.json(),
      subjectsRes.json(),
      papersRes.json(),
    ]);

    const dynamicRoutes: MetadataRoute.Sitemap = [
      ...branches.data.map((branch: any) => ({
        url: `${baseUrl}/subjects/${branch.id}`,
        lastModified: now,
      })),
      ...subjects.data.map((subject: any) => ({
        url: `${baseUrl}/papers/${subject.id}`,
        lastModified: now,
      })),
      ...papers.data.map((paper: any) => ({
        url: `${baseUrl}/solutions/${paper.id}`,
        lastModified: new Date(paper.updatedAt),
      })),
    ];

    return [...staticRoutes, ...dynamicRoutes];
  } catch {
    // fallback to static routes if error occurs
    return staticRoutes;
  }
}