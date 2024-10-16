import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.ts";
import {useSearchParams} from "react-router-dom";
import { TFilterOptions} from "../../services/types.ts";
import {OR, strictEqual, withTernary} from "../../utils/helpers.ts";
import {PAGE_SIZE} from "../../utils/constants.ts";

export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    // -- Filter --
    const filteredValue = searchParams.get('status') || ''
    const filter =   withTernary(
        OR(!filteredValue,  strictEqual(filteredValue, 'all')),
        null,
        { field: 'status', value: filteredValue, method: 'eq' }
    )

    // Sort --
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
    const [field, direction] = sortByRaw.split(/-/)
    const sortBy = { field,  direction }

    // Pagination
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))


    const { isLoading, data:  { data:bookings, count } = {} , error }  = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: () => getBookings({
            filter: filter as TFilterOptions,
            sortBy,
            page
        })
    })

    // Pre-Fetching
    const pageCount = Math.ceil(count as number / PAGE_SIZE)


        let pageNumber: number = page
        if (page < pageCount) pageNumber = page + 1
        if (page > 1) pageNumber = page - 1

        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, pageNumber],
            queryFn: () => getBookings({
                filter: filter as TFilterOptions,
                sortBy,
                page: pageNumber as number
            })
        }).then(() => {})

    return {
        isLoading, 
        bookings,
        error, 
        count,
    }
}