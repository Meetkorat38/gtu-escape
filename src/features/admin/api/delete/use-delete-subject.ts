import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.subjects)[":id"]["$delete"], 200>;
type RequestType = InferRequestType<
  (typeof client.api.admin.subjects)[":id"]["$delete"]
>;

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.admin.subjects[":id"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Subject Delete failed");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      if ("subjectId" in data) {
        queryClient.invalidateQueries({ queryKey: ["subjects"] });
        queryClient.invalidateQueries({ queryKey: ["subject", data.subjectId] });
        toast.success("Subject Deleted");
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
