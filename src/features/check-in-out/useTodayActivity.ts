import {useQuery} from "@tanstack/react-query";
import {getStaysTodayActivity} from "../../services/apiBookings.ts";

export function useTodayActivity() {
    const { isLoading, data: stays } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity']
    })

    return { stays, isLoading }
}