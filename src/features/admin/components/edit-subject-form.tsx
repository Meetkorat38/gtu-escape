"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateSubjectSchema } from "../schemas";
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
  useGetSingleSubject,
} from "../api/use-get-details";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { semesterList } from "@/lib/utils";
import { useState } from "react";
import { useUpdateSubject } from "../api/update/use-update-subject";
import { Skeleton } from "@/components/ui/skeleton";

export type UpdateSubjectFormValues = z.infer<typeof UpdateSubjectSchema>;

interface EditPaperFormProps {
  subjectId: string;
  onClose?: () => void;
}

export function EditSubjectsForm({ subjectId, onClose }: EditPaperFormProps) {
  const [courseId, setCourseId] = useState("");
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { data: allBranches, isLoading: allBranchesLoading } = useGetBranches();
  const { data: subject, isLoading: isSubjectLoading } =
    useGetSingleSubject(subjectId);

  const loading = isCoursesLoading || allBranchesLoading || isSubjectLoading;

  const { mutate, isPending } = useUpdateSubject();

  const form = useForm<UpdateSubjectFormValues>({
    resolver: zodResolver(UpdateSubjectSchema),
    defaultValues: {
      name:
        subject && "data" in subject && subject.data ? subject.data.name : "",
      subjectCode:
        subject && "data" in subject && subject.data
          ? subject.data.subjectCode
          : "",
      semester:
        subject && "data" in subject && subject.data
          ? subject.data.semester
          : "",
      branchId:
        subject && "data" in subject && subject.data
          ? subject.data.branchId
          : "",
    },
  });

  
    if (loading) {
      return (
        <div className="flex flex-col gap-7 py-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton className="w-[90%] mx-auto h-8" key={i} />
          ))}
        </div>
      );
    }

  const branches = allBranches?.data!.filter((b) => b.courseId === courseId);

  const onSubjectFormSumbit = async (values: UpdateSubjectFormValues) => {
    const finalaValues = {
      ...values,
    };

    mutate(
      {
        param: {
          subjectId,
        },
        json: finalaValues,
      },
      {
        onSuccess: () => {
          toast.success("Subject Updated");
          onClose?.();
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
                disabled={isPending}
                variant={"submit"}
                className="w-full mt-3 cursor-pointer"
              >
                {isPending ? "Pending..." : " Update Subject"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
}
