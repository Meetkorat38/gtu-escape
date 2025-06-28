import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.login["$post"]),
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.login)["$post"]
>;

export const useAdminAuth = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({json}) => {
        const response = await client.api.login["$post"]({json})

        if(!response.ok){
            throw new Error("Invalid Credential")
        }

        return await response.json()
    },
    onSuccess : () => {
        toast.success("Log In...")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
