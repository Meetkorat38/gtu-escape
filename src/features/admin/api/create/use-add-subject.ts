import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.admin.subjects)["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.admin.subjects)["$post"]
>;

export const useAddSubject = () => {
    const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["subject"],
    mutationFn: async ({json}) => {
        const response = await client.api.admin.subjects["$post"]({json})

        if(!response.ok){
            throw new Error("Branch craetion failed")
        }

        return await response.json()
    },
    onSuccess : () => {
        toast.success("Paper craeted")
        queryClient.invalidateQueries({queryKey:["subjects"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
