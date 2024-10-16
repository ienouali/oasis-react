import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin} from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const qClient = useQueryClient()
    const {isLoading: isDeleting, mutate: mutateDeleteCabin} = useMutation({
        mutationFn: (id: number) => deleteCabin(id),
        onSuccess: () => {
            toast.success('Cabin successfully deleted!!')
            qClient.invalidateQueries({queryKey: ['cabins']}).then(() => {
            })
        },
        onError: (err: { message: string }) => toast.error(err.message)
    })

    return {
        isDeleting, mutateDeleteCabin
    }
}

