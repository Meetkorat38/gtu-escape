import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const semesterList = [
  "semester 1",
  "semester 2",
  "semester 3",
  "semester 4",
  "semester 5",
  "semester 6",
  "semester 7",
  "semester 8",
] 

export const yearList = [
  2021,
  2022,
  2023,
  2024,
  2025,
  2026,
] 