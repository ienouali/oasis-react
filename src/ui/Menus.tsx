import styled from "styled-components";
import {
    ChangeEvent,
    createContext,
    Dispatch,
    MutableRefObject,
    ReactElement,
    SetStateAction,
    useContext,
    useState
} from "react";
import {HiEllipsisVertical} from "react-icons/hi2";
import {notEqual, strictEqual} from "../utils/helpers.ts";
import {createPortal} from "react-dom";
import {useOutsideClick} from "../hooks/useOutsideClick.ts";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button<{ onClick: (e: ChangeEvent<HTMLElement>) => void }>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number }; ref: MutableRefObject<undefined> }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusProps {
    children: ReactElement;
}

interface MenusMenuProps {
    children: ReactElement[];
}

interface MenusToggleProps {
    id: number;
}

interface MenusListProps {
    id: number;
    children: unknown | ReactElement | ReactElement[];
}

interface MenusButtonProps {
    children: ReactElement;
    onClick?: () => void;
    icon?: ReactElement;
    disabled?: boolean;
}

type TypeSetter<T> = Dispatch<SetStateAction<T>>
const MenusContext = createContext<
    {
        openId: number | null;
        close: () => void;
        open: TypeSetter<null | number>,
        position: { x: number; y: number },
        setPosition: TypeSetter<{ x: number; y: number }>
    }
>({
    openId: null,
    open: (_: unknown) => _,
    close: () => {
    },
    position: {x: 0, y: 0},
    setPosition: () => {
    }
})

function Menus({children}: MenusProps) {
    const [openId, setOpenId] = useState<null | number>(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const close = () => setOpenId(null)
    const open = setOpenId
    const contextValue = {openId, close, open, position, setPosition}

    return (
        <MenusContext.Provider value={contextValue}>
            {children}
        </MenusContext.Provider>
    );
}

function Menu({children}: MenusMenuProps) {
    return (
        <StyledMenu>{children}</StyledMenu>
    );
}

function Toggle({id}: MenusToggleProps) {
    const {openId, close, open, setPosition} = useContext(MenusContext)

    function handleClick(e: ChangeEvent<HTMLElement>) {
        e.stopPropagation()
        const rect = (e.target.closest('button') as HTMLElement).getBoundingClientRect()
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        })
        strictEqual(openId, null) || notEqual(openId, id)
            ? open(id)
            : close()
    }

    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisVertical/>
        </StyledToggle>
    );
}

function List({id, children}: MenusListProps) {
    const {openId, close,  position} = useContext(MenusContext)

    const { ref } = useOutsideClick({
        handler: close,
        listenCapturing: false
    })

    if (notEqual(openId, id)) return
    return (
        createPortal(
            <StyledList position={position} ref={ref}>
                {children as ReactElement}
            </StyledList>,
            document.body
        )
    );
}

function Button({children, onClick, icon, disabled}: MenusButtonProps) {
    const { close } = useContext(MenusContext);
    function handleClick() {
        onClick?.()
        close()
    }
    return (
        <li>
            <StyledButton disabled={disabled} onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button


export default Menus;