import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.admin.branches)[":branchId"]["$put"],200>;
type RequestType = InferRequestType<
  (typeof client.api.admin.branches)[":branchId"]["$put"]
>;

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.admin.branches[":branchId"]["$put"]({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Branches Update failed");
      }
      const final = await response.json()

      return final
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      const data = (response as { data: { id: string } }).data;
      toast.success("Branches Updated");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["branch" , data.id] });
    },
  });

  return mutation;
};
