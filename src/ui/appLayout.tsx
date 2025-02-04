import {JSX} from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`
const StyledLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`
const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

function AppLayout(): JSX.Element {
    return (
        <StyledLayout>
            <Header/>
            <Sidebar/>
            <Main>
                <Container>
                    <Outlet/>
                </Container>
            </Main>
        </StyledLayout>
    );
}

export default AppLayout;