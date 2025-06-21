"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { PaperFormValues } from "../PapersForm";
import { SubjectFormValues } from "../SubjectsForm";
import { BranchFormValues } from "../BranchesForm";
import RowActions from "../actions/RowActions";
import { EditPaperForm } from "../edit-paper-form";
import { useDeletePaper } from "../../api/delete/use-delete-paper";
import { EditSubjectsForm } from "../edit-subject-form";
import { useDeleteSubject } from "../../api/delete/use-delete-subject";
import { EditBrancheForm } from "../edit-branch-form";
import { useDeleteBranch } from "../../api/delete/use-delete-branch";

export const paperColumns: ColumnDef<PaperFormValues>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courseId",
    header: "Course",
  },
  {
    accessorKey: "branchId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Branch
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "subjectId",
    header: "Subject",
  },
  {
    accessorKey: "season",
    header: "Season",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "notionUrl",
    header: "Notion",
    cell: () => {
      return (
        <Button variant={"outline"} className="flex gap-2 cursor-pointer">
          <p>View</p>
          <Eye />
        </Button>
      );
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const paperId = row.original.id!;

      return (
        <RowActions
          id={paperId}
          name="Paper"
          EditForm={({ id, onClose }) => (
            <EditPaperForm paperId={id} onClose={onClose} />
          )}
          useDelete={useDeletePaper}
        />
      );
    },
  },
];

export const subjectColumns: ColumnDef<SubjectFormValues>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courseId",
    header: "Course",
  },
  {
    accessorKey: "branchId",
    header: "Branch",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Subject Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
  {
    accessorKey: "subjectCode",
    header: "Subject Code",
  },

  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const subjectId = row.original.id!;

      return (
        <RowActions
          id={subjectId}
          name="Subject"
          EditForm={({ id, onClose }) => (
            <EditSubjectsForm subjectId={id} onClose={onClose} />
          )}
          useDelete={useDeleteSubject}
        />
      );
    },
  },
];

export const branchColumns: ColumnDef<BranchFormValues>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "courseId",
    header: "Course",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Branch Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "branchCode",
    header: "Branch Code",
  },

  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const branhcId = row.original.id!;

      return (
        <RowActions
          id={branhcId}
          name="Branch"
          EditForm={({ id, onClose }) => (
            <EditBrancheForm branchId={id} onClose={onClose} />
          )}
          useDelete={useDeleteBranch}
        />
      );
    },
  },
];
