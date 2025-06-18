import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.papers)[":paperId"]["$delete"], 200>;
type RequestType = InferRequestType<
  (typeof client.api.admin.papers)[":paperId"]["$delete"]
>;

export const useDeletePaper = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.admin.papers[":paperId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Paper Delete failed");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      if ("paperId" in data) {
        queryClient.invalidateQueries({ queryKey: ["papers"] });
        queryClient.invalidateQueries({ queryKey: ["paper", data.paperId] });
        toast.success("Paper Deleted");
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
