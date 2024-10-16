import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateCurrentUser} from "../../services/ApiAuth.ts";

export function useUpdateUser() {
    const queryClient = useQueryClient()
    const { mutate: updateUser , isLoading: isUpdating} = useMutation({
        mutationFn: updateCurrentUser,

        onSuccess: ({ user }) => {
            toast.success('User account successfully updated')
            queryClient.setQueryData(['user'], user)
            queryClient.invalidateQueries({queryKey: ['user']}).then(() => {})
        },

        onError: (err: { message: string }) =>
            toast.error(err.message)
    })

    return {
        updateUser, isUpdating
    }
}