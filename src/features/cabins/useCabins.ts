import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.ts";

export function useCabins() {
    const { isLoading, data: cabins } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    })

    return {
        isLoading, cabins
    }
}