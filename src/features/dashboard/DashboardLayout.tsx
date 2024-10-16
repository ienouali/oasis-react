import styled from "styled-components";
import {useRecentBooking} from "./useRecentBooking.ts";
import Spinner from "../../ui/Spinner.tsx";
import {useRecentStays} from "./useRecentStays.ts";
import Stats from "./Stats.tsx";
import {useCabins} from "../cabins/useCabins.ts";
import {Cabin, IBooking} from "../../services/types.ts";
import SalesChart from "./SalesChart.tsx";
import DurationChart from "./DurationChart.tsx";
import TodayActivity from "../check-in-out/TodayActivity.tsx";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


const DashboardLayout = () => {
    const { isLoading, bookings } = useRecentBooking()
    const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays()
    const { cabins, isLoading: isLoadingCabins} = useCabins()
    if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />

    return (
        <StyledDashboardLayout>
            <Stats
                numDays={numDays}
                cabinCount={(cabins as Cabin[]).length}
                bookings={bookings as []}
                confirmedStays={confirmedStays as []}
            />
           <TodayActivity />
            <DurationChart confirmedStatys={confirmedStays} />
            <SalesChart
                numDays={numDays}
                bookings={bookings as IBooking & {
                    created_at: Date; totalPrice: number; extrasPrice: number;
                }[] | undefined}
            />
        </StyledDashboardLayout>
    );
};

export default DashboardLayout;
