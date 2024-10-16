import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.ts";
import toast from "react-hot-toast";
import {IBooking} from "../../services/types.ts";

export function useCheckout() {
    const queryClient = useQueryClient()

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: (id: number) =>
            updateBooking(id, { status: 'checked-out' }),

        onSuccess: ({ id }: IBooking) => {
            toast.success(`Booking #${id} successfully checked out.`)
            queryClient.invalidateQueries({ exact: true }).then(() => {})

         },

        onError: () => toast.error('There was an error while checking out'),
    })

    return {
        checkout, isCheckingOut
    }
}