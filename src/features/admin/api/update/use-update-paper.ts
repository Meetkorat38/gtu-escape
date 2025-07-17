import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.papers)[":paperId"]["$put"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.admin.papers)[":paperId"]["$put"]
>;

export const useUpdatePaper = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.admin.papers[":paperId"]["$put"]({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Paper Update failed");
      }

      return await response.json();
    },
    onSuccess: (response) => {
      const data = (response as { data: { id: string } }).data;

      toast.success("Paper Updated");
      queryClient.invalidateQueries({ queryKey: ["papers"] });
      queryClient.invalidateQueries({ queryKey: ["paper", data.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
