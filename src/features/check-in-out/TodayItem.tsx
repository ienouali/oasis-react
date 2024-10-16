import styled from "styled-components";
import {strictEqual} from "../../utils/helpers.ts";
import Tag from "../../ui/Tag.tsx";
import {Flag} from "../../ui/Flag.tsx";
import Button from "../../ui/Button.tsx";
import {Link} from "react-router-dom";
import CheckoutButton from "./CheckoutButton.tsx";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;



function TodayItem({activity}: { activity: { id: number, status: string, guests: { countryFlag: string; fullName: string }, numNights: number }}) {
    const { id, status, guests, numNights } = activity;
    return (
        <StyledTodayItem>
            {strictEqual(status,'unconfirmed') && <Tag type={'green'}>Arriving</Tag>}
            {strictEqual(status,'checked-in') && <Tag type={'blue'}>Departing</Tag>}
            <Flag src={guests.countryFlag} alt={`Flag of ${guests.countryFlag}`} />
            <Guest>{guests.fullName}</Guest>
            <div>{numNights} nights</div>
            {strictEqual(status,'unconfirmed') && (
                <Button to={`/checkin/${id}`} as={Link} size={'small'} variation={'primary'}>Check-in</Button>
            )}
            {strictEqual(status,'checked-out') && <CheckoutButton bookingId={id} />}
        </StyledTodayItem>
    );
}

export default TodayItem;