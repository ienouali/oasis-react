import { useMutation} from "@tanstack/react-query";
import {Cabin, IQueryClient} from "../../services/types.ts";
import {createOrEditCabin} from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export function useCreateCabin({ queryClient }: IQueryClient) {
    const { mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: (cabin: Cabin) => createOrEditCabin<Cabin, undefined>(cabin, undefined),

        onSuccess: () => {
            toast.success('New cabin successfully created')
            queryClient.invalidateQueries({queryKey: ['cabins']}).then(() => {})
        },

        onError: (err: { message: string }) => toast.error(err.message)
    })

    return {
        createCabin, isCreating
    }
}