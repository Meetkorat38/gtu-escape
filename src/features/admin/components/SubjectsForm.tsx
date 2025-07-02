"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { SubjectSchema } from "../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetBranches,
  useGetCourses,
  useGetSubjects,
} from "../api/use-get-details";
import { useAddSubject } from "../api/create/use-add-subject";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { semesterList } from "@/lib/utils";
import DataTableView from "./table/DataTableView";
import { subjectColumns } from "./table/columns";
import { useState } from "react";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import SkeletonCard from "@/components/SkelatonCard";

export type SubjectFormValues = z.infer<typeof SubjectSchema>;

export function SubjectsForm() {
  const [courseId, setCourseId] = useState("");
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { data: allBranches, isLoading: allBranchesLoading } = useGetBranches();
  const { data: subjects } = useGetSubjects();
  const { getCourseNameById, getBranchNameById } = useEntityNameById();

  const loading = isCoursesLoading || allBranchesLoading;

  const { mutate, isPending } = useAddSubject();

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      name: "",
      subjectCode: "",
      semester: "",
      branchId: "",
    },
  });

    if (loading) {
       return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} actions lines={3} />
          ))}
        </div>
      );;
    }

  const branches = allBranches?.data!.filter((b) => b.courseId === courseId);

  const subjectView = subjects?.data.map((s) => ({
    ...s,
    courseId: getCourseNameById(s.courseId),
    branchId: getBranchNameById(s.branchId),
  }));

  const onSubjectFormSumbit = async (values: SubjectFormValues) => {
    const finalaValues = {
      ...values,
    };

    mutate(
      {
        json: finalaValues,
      },
      {
        onSuccess: () => {
          toast.success("Subject Created");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubjectFormSumbit)}>
              <div className="flex flex-col gap-4">
                {isCoursesLoading ? ( // courses
                  <p>Loading...</p>
                ) : (
                  <FormField // Courses
                    control={form.control}
                    name="courseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Courses</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
                              setCourseId(val); // 👈 update state to trigger subject/branch refetch
                            }}
                            defaultValue={field.value || ""}
                          >
                            <SelectTrigger className="w-full cursor-pointer">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses?.data
                                .filter((course) => course?.id) // Filter out invalid ones
                                .map((course, index) => (
                                  <SelectItem key={index} value={course.id}>
                                    {course.name || "Unnamed Course"}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.courseId?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                )}

                <FormField // Branch
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select a Branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches!.map((branch, index) => (
                              <SelectItem key={index} value={branch.id}>
                                {branch.name || "Unnamed Branch"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.branchId?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField // Subject Name
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Subject Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.name?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField // Semester
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select a Semester" />
                          </SelectTrigger>
                          <SelectContent>
                            {semesterList.map((semester, index) => (
                              <SelectItem key={index} value={semester}>
                                {semester}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.semester?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField // Subject Code
                  control={form.control}
                  name="subjectCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Subject Code"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.subjectCode?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                variant={"submit"}
                disabled={isPending}
                className="w-full mt-3 cursor-pointer"
              >
                {isPending ? "Pending..." : " Add Subject"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
      <DataTableView
        columns={subjectColumns}
        data={subjectView ?? []}
        title={"Subjects"}
        filterColumn={"name"}
      />
    </>
  );
}
