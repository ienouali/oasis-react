import BookingRow from "./BookingRow.tsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import Empty from "../../ui/Empty.tsx";
import {useBookings} from "./useBookings.ts";
import Spinner from "../../ui/Spinner.tsx";
import {IBooking} from "../../services/types.ts";
import Pagination from "../../ui/Pagination.tsx";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />
  if (!bookings?.length) return <Empty resourceName={'bookings'} />

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
            data={bookings as IBooking[]}
            render={(booking: IBooking) => (
                <BookingRow key={booking.id} booking={booking}/>
            )}
        />
        <Table.Footer>
          <Pagination count={count as number} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
