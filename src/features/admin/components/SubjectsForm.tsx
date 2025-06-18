"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { CourseTypeName, SubjectSchema } from "../schemas";
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
import { useGetCourseBranches, useGetCourses, useGetSubjects } from "../api/use-get-details";
import { useAddSubject } from "../api/use-add-subject";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { semesterList } from "@/lib/utils";
import DataTableView from "./table/DataTableView";
import { subjectColumns } from "./table/columns";

export type SubjectFormValues = z.infer<typeof SubjectSchema>;

export function SubjectsForm() {
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      name: "",
      subjectCode: "",
      semester: "",
      branchId: "",
    },
  });

  const courseId: string = form.watch("courseId");
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { data: branches } = useGetCourseBranches(courseId);
  const {data:subjects} = useGetSubjects()

  const { mutate, isPending } = useAddSubject();

    const branchNameGetById = (branchId: string) => {
      const res = branches?.data.filter((branch) => branch.id === branchId)[0];
      const final = res ? (res!.name as string) : "NA";
      return final;
    };
  
    const CourseNameGetById = (courseId: string) => {
      const res = courses?.data.filter((course) => course.id === courseId)[0];
      const final = res ? (res!.name as CourseTypeName) : "NA";
      return final;
    };

  const subjectView = subjects?.data.map((s) => ({
    ...s,
    courseId: CourseNameGetById(s.courseId),
    branchId: branchNameGetById(s.branchId),
  })) 

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
                          <SelectValue placeholder="Select a Branch" />
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
              disabled={isPending}
              className="w-full mt-3 cursor-pointer"
            >
              {isPending ? "Pending..." : " Add Branch"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
      <DataTableView columns={subjectColumns} data={subjectView ?? []} title={"Subjects"} filterColumn={"name"}/>
    </>
  );
}
