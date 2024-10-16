import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../services/ApiAuth.ts";
import {strictEqual} from "../../utils/helpers.ts";

export function useLoginInfo() {
    const { data: loginInfo, isLoading } =  useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    });

    return {
        isLoading,
        loginInfo,
        isAuthenticated: strictEqual(loginInfo?.role, 'authenticated')
    }
}