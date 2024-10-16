import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox.tsx";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import {useMoveBack} from "../../hooks/useMoveBack.js";
import {useBooking} from "../bookings/useBooking.ts";
import {IBooking, ISettings} from "../../services/types.ts";
import Spinner from "../../ui/Spinner.tsx";
import {useEffect, useState} from "react";
import Checkbox from "../../ui/Checkbox.tsx";
import {formatCurrency} from "../../utils/helpers.ts";
import {useCheckin} from "./useCheckin.ts";
import {useSettings} from "../settings/useSettings.ts";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const {booking, isLoading} = useBooking()
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [withBreakfast, setWithBreakfast] = useState(false);
    const moveBack = useMoveBack();
    const {checkin, isCheckingIn} = useCheckin()
    const {settings, isLoading: isLoadingSettings} = useSettings()

    useEffect(function () {
        setConfirmPaid(booking?.isPaid ?? false)
    }, [booking?.isPaid])


    if (isLoading || isLoadingSettings) return <Spinner/>

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking as IBooking;

    function handleCheckin() {
        if (!confirmPaid) return
        if (withBreakfast) {
            checkin({
                id: bookingId as number,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice
                }
            })
        } else {
            checkin({id: bookingId as number, breakfast: {}})
        }
    }

    function handleBreakfast() {
        setWithBreakfast(prevState => !prevState)
        setConfirmPaid(false)
    }

    const optionalBreakfastPrice = (settings as ISettings).breakfastPrice as number * numNights * numGuests
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking as IBooking}/>
            <Box>
                <Checkbox checked={withBreakfast} onChange={handleBreakfast} id={'breakfast'}>
                    Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                </Checkbox>
            </Box>
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    disabled={confirmPaid || isCheckingIn}
                    onChange={() => setConfirmPaid(confirmPaid => !confirmPaid)}
                    id='confirm'
                >
                    I confirm that {guests.fullName as string} has paid the total amount of {' '}
                    {!withBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + optionalBreakfastPrice)}
                (${formatCurrency(totalPrice)} +  ${formatCurrency(optionalBreakfastPrice)})`
                    }
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking
                    #{bookingId}</Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
