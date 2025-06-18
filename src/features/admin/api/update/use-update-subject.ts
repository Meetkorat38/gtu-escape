import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.subjects)[":subjectId"]["$put"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.admin.subjects)[":subjectId"]["$put"]
>;

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.admin.subjects[":subjectId"]["$put"]({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Subject Update failed");
      }

      return await response.json();
    },
    onSuccess: (response) => {
      const data = (response as { data: { id: string } }).data;

      toast.success("Subject Updated");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      queryClient.invalidateQueries({ queryKey: ["subject", data.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
