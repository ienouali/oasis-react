import styled from "styled-components";

import BookingDataBox from "./BookingDataBox.tsx";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import {useBooking} from "./useBooking.ts";
import Spinner from "../../ui/Spinner.tsx";
import {IBooking, STATUS, TStatus} from "../../services/types.ts";
import {strictEqual} from "../../utils/helpers.ts";
import {useNavigate} from "react-router-dom";
import {useCheckout} from "../check-in-out/useCheckout.ts";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import {useDeleteBooking} from "./useDeleteBooking.ts";
import Empty from "../../ui/Empty.tsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {  isLoading, booking } = useBooking()
  const moveBack = useMoveBack();
  const navigate = useNavigate()
  const { checkout, isCheckingOut } = useCheckout()
  const { isDeleting, mutateDeleteBooking } = useDeleteBooking()

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />

  if (!booking) return <Empty resourceName={'booking'} />

  const { status, id:bookingId } = booking as IBooking
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status as keyof TStatus<STATUS>]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

        <BookingDataBox booking={booking  as IBooking}/>

      <ButtonGroup>
        {
            strictEqual(status, 'unconfirmed') && (
                <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                  <>Check in</>
                </Button>
            )
        }
        {
            strictEqual(status, 'checked-in') && (
                <Button disabled={isCheckingOut} onClick={() => checkout(bookingId as number)}>
                  <>Check out</>
                </Button>
            )
        }
        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
                resourceName='booking'
                onConfirm={() => mutateDeleteBooking(bookingId as number, { onSettled: () => navigate(-1) })}
                disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
