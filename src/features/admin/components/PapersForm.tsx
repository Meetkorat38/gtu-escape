"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { CourseTypeName, PaperSchema, Season } from "../schemas";
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
  useGetCourseBranches,
  useGetCourses,
  useGetCourseSubjects,
  useGetPapers,
} from "../api/use-get-details";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddPaper } from "../api/use-add-paper";
import { toast } from "sonner";
import { yearList } from "@/lib/utils";
import DataTableView from "./table/DataTableView";
import { paperColumns } from "./table/columns";
export type PaperFormValues = z.infer<typeof PaperSchema>;

export function PapersForm() {
  const form = useForm<PaperFormValues>({
    resolver: zodResolver(PaperSchema),
    defaultValues: {
      subjectId: "",
      branchId: "",
      courseId: "",
      notionUrl: "",
      season: Season.WINTER,
      year: 2020,
    },
  });

  const courseId = form.watch("courseId");
  const { data: branches, isLoading: isCourseBranchesLoading } =
    useGetCourseBranches(courseId);
  const { data: subjects, isLoading: isCourseSubjectsLoading } =
    useGetCourseSubjects(courseId);
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { mutate, isPending } = useAddPaper();
  const { data: papers, isLoading: isPaperLoading } = useGetPapers();

  const loading =
    isCourseBranchesLoading ||
    isCourseSubjectsLoading ||
    isCoursesLoading ||
    isPaperLoading;

  const branchNameGetById = (branchId: string) => {
    const res = branches?.data.filter((branch) => branch.id === branchId)[0];
    const final = res ? (res!.name as string) : "NA";
    return final;
  };

  const courseNameGetById = (courseId: string) => {
    const res = courses?.data.filter((course) => course.id === courseId)[0];
    const final = res ? (res!.name as CourseTypeName) : "NA";
    return final;
  };

  const subjectNameGetById = (subjectId: string) => {
    const res = subjects?.data.filter((subject) => subject.id === subjectId)[0];
    const final = res ? (res!.name as string) : "NA";
    return final;
  };

  const papersView = papers?.data.map((p) => ({
    ...p,
    courseId: courseNameGetById(p.courseId),
    branchId: branchNameGetById(p.branchId),
    subjectId: subjectNameGetById(p.subjectId),
    season: p.season as Season
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
                            onValueChange={field.onChange}
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
                            {branches?.data
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
                            {subjects?.data
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
