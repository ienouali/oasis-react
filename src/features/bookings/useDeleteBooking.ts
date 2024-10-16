import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteBooking} from "../../services/apiBookings.ts";

export function useDeleteBooking() {
    const qClient = useQueryClient()
    const {isLoading: isDeleting, mutate: mutateDeleteBooking} = useMutation({
        mutationFn: (id: number) => deleteBooking(id),
        onSuccess: () => {
            toast.success('Booking successfully deleted!!')
            qClient.invalidateQueries({ queryKey: ['bookings'] }).then(() => {
            })
        },
        onError: (err: { message: string }) => toast.error(err.message)
    })

    return {
        isDeleting, mutateDeleteBooking
    }
}

