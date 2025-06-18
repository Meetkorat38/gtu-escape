"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchSchema, CourseTypeName } from "../schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetBranches, useGetCourses } from "../api/use-get-details";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAddBranch } from "../api/use-add-branch";
import { z } from "zod";
import { toast } from "sonner";
import DataTableView from "./table/DataTableView";
import { branchColumns } from "./table/columns";

export type BranchFormValues = z.infer<typeof BranchSchema>;

export function BranchesForm() {
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { mutate, isPending } = useAddBranch();
  const { data: branches } = useGetBranches();

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(BranchSchema),
    defaultValues: {
      name: "",
      branchCode: 1,
    },
  });

  const CourseNameGetById = (courseId: string) => {
    const res = courses?.data.filter((course) => course.id === courseId)[0];
    const final = res ? (res!.name as CourseTypeName) : "NA";
    return final;
  };

  const branchesView = branches?.data.map((b) => ({
    ...b,
    courseId: CourseNameGetById(b.courseId),
  }));

  const onBranchFormSubmit = async (values: BranchFormValues) => {
    const Finalvalues = {
      ...values,
    };

    mutate(
      {
        json: Finalvalues,
      },
      {
        onSuccess: () => {
          toast.success("New Branch created");
        },
        onError: ({ message }) => {
          toast.error(message);
        },
      }
    );
  };

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Add New Branch</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onBranchFormSubmit)}>
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

              <FormField // branch name
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Branch Name"
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

              <FormField // branch code
                control={form.control}
                name="branchCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Branch Code"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.branchCode?.message}
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
      <DataTableView columns={branchColumns} data={branchesView ?? []} filterColumn={"name"} title="Branches"/>
      </>
  );
}
