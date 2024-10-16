import {useMutation} from "@tanstack/react-query";
import {Cabin, IQueryClient} from "../../services/types.ts";
import {createOrEditCabin} from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export function useEditCabin({ queryClient }: IQueryClient) {

    const { mutate: editCabin, isLoading: isEditing} = useMutation({
        mutationFn: ({ newCabinData, id } : { newCabinData: Cabin, id: number }) =>
            createOrEditCabin<Cabin, number>(newCabinData, id),

        onSuccess: () => {
            toast.success('The cabin successfully edited')
            queryClient.invalidateQueries({queryKey: ['cabins']}).then(() => {})
        },

        onError: (err: { message: string }) => toast.error(err.message)
    })

    return {
        editCabin,
        isEditing
    }
}