import styled, { css } from "styled-components";
import {strictEqual} from "../utils/helpers.ts";

interface RowProps {
    type?: 'horizontal' | 'vertical',
}

const Row = styled.div<RowProps>`
  display: flex;
  ${(props) => strictEqual(props.type, 'horizontal') && css`
    justify-content: space-between;
    align-items: center;
  `}

  ${(props) => strictEqual(props.type, 'vertical') && css`
    flex-direction: column;
    gap: 1.6rem;
  `}
`

Row.defaultProps = {
    type: 'vertical'
}

export default Row