import {useSearchParams} from "react-router-dom";
import {subDays } from 'date-fns'
import {useQuery} from "@tanstack/react-query";
import { getStaysAfterDate} from "../../services/apiBookings.ts";
import {strictEqual} from "../../utils/helpers.ts";

export function useRecentStays() {
    const [searchParams] = useSearchParams()
    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))
    const queryDate = subDays(new Date(), numDays).toISOString()
    const { isLoading, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ['stays', 'last-'+numDays]
    })

    const confirmedStays = stays?.filter(stay => strictEqual(stay.status,'checked-in') || strictEqual(stay.status,'checked-out'))

    return {
        isLoading, stays, confirmedStays, numDays
    }
}