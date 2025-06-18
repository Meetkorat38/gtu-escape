import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.papers)["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.admin.papers)["$post"]
>;

export const useAddPaper = () => {
    const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["paper"],
    mutationFn: async ({json}) => {
        const response = await client.api.admin.papers["$post"]({json})

        if(!response.ok){
            throw new Error("Paper craetion failed")
        }

        return await response.json()
    },
    onSuccess : () => {
        toast.success("Paper craeted")
        queryClient.invalidateQueries({queryKey:["papers"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
