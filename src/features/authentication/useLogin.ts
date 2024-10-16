import {useMutation, useQueryClient} from "@tanstack/react-query";
import {authenticateApi} from "../../services/ApiAuth.ts";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
     const { mutate: authenticate, isLoading} = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string; }) => authenticateApi({ email, password }),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user);
            navigate('/dashboard', { replace: true })
        },
        onError: error => {
            console.error(error)
            toast.error('Provided email or password are incorrect')
        }
    })

    return { authenticate, isLoading }
}