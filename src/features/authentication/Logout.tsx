import ButtonIcon from "../../ui/ButtonIcon.tsx";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useLogout} from "./useLogout.ts";
import SpinnerMini from "../../ui/SpinnerMini.tsx";

function Logout() {
    const { logout, isLoading } = useLogout()
    return (
        <ButtonIcon disabled={isLoading} onClick={logout}>
            {
                !isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />
            }
        </ButtonIcon>
    );
}

export default Logout;