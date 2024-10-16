import styled from "styled-components";
import {useLoginInfo} from "./useLoginInfo.ts";
import {TLogininfo} from "../../services/types.ts";
import {HiUser} from "react-icons/hi2";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

const StyledIcon = styled.div`
    & svg {
        width: 3rem;
        height: 3rem;
        border: 2px solid #ccc;
        padding: 2px;
        border-radius: 50%;
    }
`;
function UserAvatar() {
    const {loginInfo} = useLoginInfo()
    const {fullName, avatar} = (loginInfo as TLogininfo).user_metadata

    return (
        <StyledUserAvatar>
            {
                avatar ? <Avatar src={avatar} alt={`avatar of ${fullName}`}/> :  <StyledIcon><HiUser /></StyledIcon>
            }
            <span>{fullName}</span>
        </StyledUserAvatar>
    );
}

export default UserAvatar;