import styled from "styled-components";
import {format, isToday} from "date-fns";

import Tag from "../../ui/Tag.jsx";
import Table from "../../ui/Table.jsx";

import {formatCurrency, strictEqual} from "../../utils/helpers.ts";
import {formatDistanceFromNow} from "../../utils/helpers.ts";
import {IBooking, STATUS, TStatus} from "../../services/types.ts";
import Menus from "../../ui/Menus.tsx";
import {HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash} from "react-icons/hi2";
import {useNavigate} from "react-router-dom";
import {useCheckout} from "../check-in-out/useCheckout.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import {useDeleteBooking} from "./useDeleteBooking.ts";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
                        booking: {
                            id: bookingId,
                            created_at,
                            startDate,
                            endDate,
                            numNights,
                            numGuests,
                            totalPrice,
                            status,
                            guests: {fullName: guestName, email},
                            cabins: {name: cabinName},
                        },
                    }: { booking: IBooking }) {
    const navigate = useNavigate()
    const { checkout, isCheckingOut } = useCheckout()
    const { isDeleting, mutateDeleteBooking } = useDeleteBooking()
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>
            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>
            <Stacked>
        <span>
          {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
        </span>
                <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
        </span>
            </Stacked>
            <Tag type={statusToTagName[status as keyof TStatus<STATUS>]}>{status.replace("-", " ")}</Tag>
            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Modal>
            <Menus.Menu>
                <Menus.Toggle id={bookingId as number}/>
                <Menus.List id={bookingId as number}>
                    <Menus.Button icon={<HiEye/>} onClick={() => navigate(`/bookings/${bookingId}`)}><>See details</>
                    </Menus.Button>
                    {
                        strictEqual(status, 'unconfirmed') && (
                            <Menus.Button icon={<HiArrowDownOnSquare/>} onClick={() => navigate(`/checkin/${bookingId}`)}>
                                <>Check in</>
                            </Menus.Button>
                        )
                    }
                    {
                        strictEqual(status, 'checked-in') && (
                            <Menus.Button disabled={isCheckingOut} icon={<HiArrowUpOnSquare />} onClick={() => checkout(bookingId as number)}>
                                <>Check out</>
                            </Menus.Button>
                        )
                    }
                    <Modal.Open opens='delete'>
                        <Menus.Button icon={<HiTrash />}><>Delete booking</></Menus.Button>
                    </Modal.Open>
                </Menus.List>
            </Menus.Menu>
                <Modal.Window name='delete'>
                    <ConfirmDelete
                        resourceName='booking'
                        onConfirm={() => mutateDeleteBooking(bookingId as number)}
                        disabled={isDeleting}
                    />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;
