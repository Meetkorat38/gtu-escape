"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Season, UpdatePaperSchema } from "../schemas";
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
  useGetSinglePaper,
  useGetSubjects,
} from "../api/use-get-details";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { yearList } from "@/lib/utils";
import { useUpdatePaper } from "../api/update/use-update-paper";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export type EditPaperFormValues = z.infer<typeof UpdatePaperSchema>;

interface EditPaperFormProps {
  paperId: string;
  onClose?: () => void;
}

export function EditPaperForm({ paperId, onClose }: EditPaperFormProps) {
  const [courseId, setCourseId] = useState("");
  const { data: paper, isLoading: isSinglePaperLoading } =
    useGetSinglePaper(paperId);
  const { data: allSubjects, isLoading: isAllSubjectsLoading } =
    useGetSubjects();
  const { data: allBranches, isLoading: isAllBranchesLoading } =
    useGetBranches();
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { mutate, isPending } = useUpdatePaper();

  const loading =
    isAllBranchesLoading ||
    isAllSubjectsLoading ||
    isSinglePaperLoading ||
    isCoursesLoading;

  const form = useForm<EditPaperFormValues>({
    resolver: zodResolver(UpdatePaperSchema),
    defaultValues: {
      subjectId: paper?.data?.subjectId,
      branchId: paper?.data?.branchId,
      courseId: paper?.data?.courseId,
      notionUrl: paper?.data?.notionUrl,
      season: paper?.data?.season as Season,
      year: paper?.data?.year as number,
    },
  });

  const branches = allBranches?.data?.filter((b) => b.courseId === courseId);
  const subjects = allSubjects?.data?.filter((s) => s.courseId === courseId);

  const onSubmit = (values: EditPaperFormValues) => {
    const finalVaues = {
      ...values,
    };

    mutate(
      {
        json: finalVaues,
        param: { paperId },
      },
      {
        onSuccess: () => {
          toast.success("Paper Updated");
          onClose?.();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-7 py-4">
        {[...Array(7)].map((_, i) => (
          <Skeleton className="w-[90%] mx-auto h-8" key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <Card>
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
                            value={field.value || ""}
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
                          defaultValue={field?.value?.toString()}
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
                {isPending ? "Updating..." : "Update Paper"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
}
