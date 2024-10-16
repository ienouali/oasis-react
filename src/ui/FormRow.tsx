import styled from "styled-components";
import React from "react";
import {strictEqual} from "../utils/helpers.ts";

const StyledFormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;


type FormRowProps = {
    children: React.ReactNode
    labelProps: {
        id: string;
        label: string;
    };
    errorMessage?: string | object;
};

function FormRow({children, labelProps, errorMessage}: FormRowProps) {
    return (
        <StyledFormRow>
            <Label htmlFor={labelProps.id}>{labelProps.label}</Label>
            {children}
            {
                errorMessage && <Error>
                            <>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                 {/* @ts-expect-error */}
                                {strictEqual(typeof errorMessage, "string") ? errorMessage : errorMessage[labelProps.id]?.message}
                            </>
                        </Error>
            }
        </StyledFormRow>
    );
}

export default FormRow;