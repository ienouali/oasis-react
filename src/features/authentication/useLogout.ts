import {useMutation, useQueryClient} from "@tanstack/react-query";
import {signOut} from "../../services/ApiAuth.ts";
import {useNavigate} from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate('/login', { replace: true })
        }
    })

    return {
        logout, isLoading
    }
}