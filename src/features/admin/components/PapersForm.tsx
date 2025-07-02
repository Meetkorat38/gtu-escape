"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { PaperSchema, Season } from "../schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  useGetPapers,
  useGetSubjects,
} from "../api/use-get-details";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddPaper } from "../api/create/use-add-paper";
import { toast } from "sonner";
import { yearList } from "@/lib/utils";
import DataTableView from "./table/DataTableView";
import { paperColumns } from "./table/columns";
import { useState } from "react";
import { useEntityNameById } from "@/features/admin/hooks/useEntityNameById";
import SkeletonCard from "@/components/SkelatonCard";

export type PaperFormValues = z.infer<typeof PaperSchema>;

export function PapersForm() {
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { getBranchNameById, getCourseNameById, getSubjectNameById } =
    useEntityNameById();

  const [courseId, setCourseId] = useState(courses?.data[0].id || "");

  const form = useForm<PaperFormValues>({
    resolver: zodResolver(PaperSchema),
    defaultValues: {
      subjectId: "",
      branchId: "",
      courseId: courses?.data[0].id || "",
      notionUrl: "",
      season: Season.WINTER,
      year: 2020,
    },
  });

  const { data: allSubjects, isLoading: isAllSubjectsLoading } =
    useGetSubjects();
  const { data: allBranches, isLoading: isAllBranchesLoading } =
    useGetBranches();
  const { mutate, isPending } = useAddPaper();
  const { data: papers, isLoading: isPaperLoading } = useGetPapers();

  const loading =
    isAllBranchesLoading ||
    isAllSubjectsLoading ||
    isCoursesLoading ||
    isPaperLoading;

  if (loading) {
     return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} actions lines={3} />
        ))}
      </div>
    );;
  }

  const branches = allBranches?.data?.filter((b) => b.courseId === courseId);
  const subjects = allSubjects?.data?.filter((s) => s.courseId === courseId);

  const papersView = papers?.data.map((p) => ({
    ...p,
    courseId: getCourseNameById(p.courseId),
    branchId: getBranchNameById(p.branchId),
    subjectId: getSubjectNameById(p.subjectId),
    season: p.season as Season,
  }));

  const onSubmit = (values: PaperFormValues) => {
    const finalVaues = {
      ...values,
    };

    mutate(
      {
        json: finalVaues,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Paper created");
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
          <CardTitle>Add New Paper</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {isCoursesLoading ? (
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
                            <SelectValue placeholder="Select a branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches!
                              .filter((branch) => branch?.id)
                              .map((branch, index) => (
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

                <FormField // Subject
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects!
                              .filter((subject) => subject?.id) // Filter out invalid ones
                              .map((subject, index) => (
                                <SelectItem key={index} value={subject.id}>
                                  {subject.name || "Unnamed Subject"}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.subjectId?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField // Season
                  control={form.control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Season</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Season.SUMMER}>
                              {Season.SUMMER.toLowerCase()}
                            </SelectItem>
                            <SelectItem value={Season.WINTER}>
                              {Season.WINTER.toLowerCase()}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.season?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField // Year
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select a Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearList.map((year, index) => (
                              <SelectItem key={index} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.year?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField // NotionUrl
                  control={form.control}
                  name="notionUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notion Url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter notion url"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.notionUrl?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending || loading}
                variant={"submit"}
                className="w-full mt-3 cursor-pointer"
              >
                {isPending ? "Adding..." : "Add Paper"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
        <DataTableView
          columns={paperColumns}
          data={papersView ?? []}
          filterColumn="subjectId"
          title={"Subjects"}
        />
      </Card>
    </>
  );
}
