import styled from "styled-components";
import {useDarkMode} from "../hooks/useDarkMode.ts";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 1.7rem;
  width: auto;
  margin-bottom: 3rem;
`;

function Logo() {
  const { isDarkMode} = useDarkMode()
  const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png'
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
