import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

const baseUrl =
  typeof window === "undefined"
    ? process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL!
      : "http://localhost:3000"
    : "/api";

export const client =  hc<AppType>(baseUrl);