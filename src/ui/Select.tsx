import styled from "styled-components";
import {IOption} from "../services/types.ts";
import {ChangeEvent} from "react";

const StyledSelect = styled.select<{ type ?: 'white' }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type TSelect = {
    options: IOption[];
    type?: 'white'
    value?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, value, onChange, ...props }: TSelect) {
    return (
        <StyledSelect value={value} onChange={onChange} {...props}>
            {options?.map((o: IOption) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </StyledSelect>
    );
}

export default Select;