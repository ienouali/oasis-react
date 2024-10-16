import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.ts";
import toast from "react-hot-toast";
import {IBooking} from "../../services/types.ts";
import {useNavigate} from "react-router-dom";

export function useCheckin() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ id, breakfast }: { id:number, breakfast: object }) =>
            updateBooking(id, { status: 'checked-in', isPaid: true, ...breakfast }),

        onSuccess: ({ id }: IBooking) => {
            toast.success(`Booking #${id} successfully checked in.`)
            queryClient.invalidateQueries({ exact: true }).then(() => {})
            navigate('/')
         },

        onError: () => toast.error('There was an error while checking in'),
    })

    return {
        checkin, isCheckingIn
    }
}