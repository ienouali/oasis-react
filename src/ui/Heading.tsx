import styled, {css} from "styled-components";
import {strictEqual} from "../utils/helpers.ts";
import React from "react";

interface HeadingProps {
  as?: keyof React.JSX.IntrinsicElements;
  type?: string;
}


const additionalCss = css`
  line-height: 1.4;
`
export default styled.h1<HeadingProps>` 
  ${(props) => strictEqual(props.type, 'h1') && css`
    font-size: 3rem;
    font-weight: 600;
    ${additionalCss}
  `}

  ${(props) => strictEqual(props.type, 'h2') && css`
    font-size: 2rem;
    font-weight: 600;
    ${additionalCss}
  `}

  ${(props) => strictEqual(props.type, 'h3') && css`
    font-size: 2rem;
    font-weight: 600;
    ${additionalCss}
  `}

  ${(props) => strictEqual(props.type, 'h4') && css`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    ${additionalCss}
  `}
`
