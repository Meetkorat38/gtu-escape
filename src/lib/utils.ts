import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  BookOpen,
  Atom,
  PenTool,
  Server,
  Globe,
  Calculator,
  Sun,
  WindArrowDown,
} from "lucide-react";
import { CourseTypeName, Season } from "@/features/admin/schemas";

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


export const subjectVisuals = [
  { icon: BookOpen, color: "bg-pink-500" },
  { icon: Atom, color: "bg-purple-500" },
  { icon: PenTool, color: "bg-yellow-500" },
  { icon: Server, color: "bg-indigo-500" },
  { icon: Globe, color: "bg-orange-500" },
  { icon: Calculator, color: "bg-teal-500" },
];

export const getSemesterTheme = (semester: string) => {
    // Extract semester number from string like "semester 1", "semester 2", etc.
    const semesterNumber = parseInt(semester.match(/\d+/)?.[0] || "1");

    switch (semesterNumber) {
      case 1:
        return {
          badge: "bg-emerald-600 text-white",
          icon: "text-white bg-emerald-500",
        };
      case 2:
        return {
          badge: "bg-blue-500 text-white",
          icon: "text-white bg-blue-500",
        };
      case 3:
        return {
          badge: "bg-indigo-500 text-white",
          icon: "text-white bg-indigo-500",
        };
      case 4:
        return {
          badge: "bg-purple-500 text-white",
          icon: "text-white bg-purple-500",
        };
      case 5:
        return {
          badge: "bg-pink-500 text-white",
          icon: "text-white bg-pink-500",
        };
      case 6:
        return {
          badge: "bg-rose-500 text-white",
          icon: "text-white bg-rose-500",
        };
      case 7:
        return {
          badge: "bg-orange-500 text-white",
          icon: "text-white bg-orange-500",
        };
      case 8:
        return {
          badge: "bg-amber-500 text-white",
          icon: "text-white bg-amber-500",
        };
      default:
        return {
          badge: "bg-gray-500 text-white",
          icon: "text-white bg-gray-500",
        };
    }
  };

export const getCourseTheme = (courseName: CourseTypeName) => {
  switch (courseName) {
    case CourseTypeName.Degree:
        return {
          color: "bg-blue-500 text-white"
        }
    case CourseTypeName.Diploma:
        return {
          color: "bg-rose-500 text-white"
        }
    default:
      return {
        color: "bg-zinc-100 text-black"
      };
  }
}

export const getSeasonTheme = (season: Season) => {
  switch (season) {
    case Season.SUMMER:
      return {
        color : "bg-orange-500 text-white",
        icon: Sun
      }
    case Season.WINTER:
      return {
        color : "bg-blue-600 text-white",
        gradient : "from-blue-50 to-blue-100",
        icon: WindArrowDown
      }
  
    default:
      break;
  }
}