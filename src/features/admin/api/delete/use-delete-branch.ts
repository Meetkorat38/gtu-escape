import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.branches)[":id"]["$delete"], 200>;
type RequestType = InferRequestType<
  (typeof client.api.admin.branches)[":id"]["$delete"]
>;

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.admin.branches[":id"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Branch Delete failed");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      if ("branchId" in data) {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
        queryClient.invalidateQueries({ queryKey: ["branch", data.branchId] });
        toast.success("Branch Deleted");
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
