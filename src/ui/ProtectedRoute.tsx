import {ReactElement, useEffect} from "react";
import {useLoginInfo} from "../features/authentication/useLoginInfo.ts";
import Spinner from "./Spinner.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

type TProps = {
    children: ReactElement
}

const StyledFullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({children}: TProps) {
    const navigate = useNavigate()

    // Todo 1 :  load the authenticated user
    const {loginInfo, isLoading, isAuthenticated} = useLoginInfo()

    // Todo 2 :  if no user -> redirect to login
    useEffect(function () {
            if (!isAuthenticated && !isLoading) navigate('/login')
    }, [isAuthenticated, isLoading, navigate])

    // Todo 3 :  show spinner at loading
    if (isLoading) return (
        <StyledFullPage>
            <Spinner/>
        </StyledFullPage>
    )


    // Todo 4 :  if  user exist -> render the app layout
    if (isAuthenticated) return  children
}

export default ProtectedRoute;