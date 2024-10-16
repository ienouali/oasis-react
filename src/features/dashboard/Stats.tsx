import Stat from "./Stat.tsx";
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from "react-icons/hi2";
import {IBooking} from "../../services/types.ts";

function Stats({bookings, confirmedStays, numDays, cabinCount}: {cabinCount: number; numDays: number; bookings: IBooking[], confirmedStays: IBooking[]}) {
    const numBookings = bookings.length || 0

    const sales = bookings.reduce( (acc, curr) =>
        acc + curr.totalPrice, 0)

    const checkins = confirmedStays.length || 0

    const occupation = confirmedStays.reduce((acc, curr) =>
        acc + curr.numNights, 0) / (numDays * cabinCount)


    return (
        <>
        <Stat title='Booking' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
        <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={sales} />
        <Stat title='Check ins ' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins} />
        <Stat title='Occupany rate' color='yellow' icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'} />
        </>
    );
}

export default Stats;