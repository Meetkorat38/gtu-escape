"use client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateBranchSchema } from "../schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetCourses, useGetSingleBranch } from "../api/use-get-details";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { useUpdateBranch } from "../api/update/use-update-branch";
import { Skeleton } from "@/components/ui/skeleton";

export type EditBranchFormValues = z.infer<typeof UpdateBranchSchema>;

interface EditBranchFormProps {
  branchId: string;
  onClose?: () => void;
}

export function EditBrancheForm({ branchId, onClose }: EditBranchFormProps) {
  const { data: courses, isLoading: isCoursesLoading } = useGetCourses();
  const { mutate, isPending } = useUpdateBranch();
  const { data: branch, isLoading: isBranchLoading } =
    useGetSingleBranch(branchId);

  const loading = isBranchLoading || isCoursesLoading;

  const form = useForm<EditBranchFormValues>({
    resolver: zodResolver(UpdateBranchSchema),
    defaultValues: {
      name: branch && "data" in branch && branch.data ? branch.data.name : "",
      branchCode:
        branch && "data" in branch && branch.data ? branch.data.branchCode : 0,
    },
  });

  const onBranchFormSubmit = async (values: EditBranchFormValues) => {
    const Finalvalues = {
      ...values,
    };

    mutate(
      {
        param: {
          branchId,
        },
        json: Finalvalues,
      },
      {
        onSuccess: () => {
          toast.success("Branch Updated");
          onClose?.();
        },
        onError: ({ message }) => {
          toast.error(message);
        },
      }
    );
  };

  
  if (loading) {
    return (
      <div className="flex flex-col gap-7 py-4">
        {[...Array(4)].map((_, i) => (
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
                variant={"submit"}
                className="w-full mt-3 cursor-pointer"
              >
                {isPending ? "Pending..." : " Update Branch"}
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </>
  );
}
