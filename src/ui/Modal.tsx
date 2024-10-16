import styled from "styled-components";
import {
    cloneElement,
    createContext,
    Dispatch, MutableRefObject,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";
import {HiXMark} from "react-icons/hi2";
import {createPortal} from "react-dom";
import {notEqual} from "../utils/helpers.ts";
import {useOutsideClick} from "../hooks/useOutsideClick.ts";

const StyledModal = styled.div<{ ref: MutableRefObject<undefined> }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button<{ onClick: () => void }>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface Modal {
    children: ReactNode;
}

interface ModalOpen {
    children: ReactElement;
    opens: string;
}

interface ModalWindow {
    children: ReactElement;
    name: string;
}
/*
function Modal({children, onClose}: ModalProps) {
    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={onClose}><HiXMark /></Button>
                <div>{children}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}
 */

const ModalContext = createContext<{ open: Dispatch<SetStateAction<string>>; close: () => void; openName: string; }>({
    open: (_: unknown) => _ , close: () => {}, openName: ''
})

function Modal({children}: Modal) {
    const [openName, setOpenName] = useState('')
    const close = () => setOpenName('')
    const open = setOpenName

    const contextValue = {open, close, openName}
    return <ModalContext.Provider value={contextValue}>
        {children}
    </ModalContext.Provider>
}

function Open({children, opens: opensWindowName}: ModalOpen) {
    const {open} = useContext(ModalContext)
    return cloneElement(children, {onClick: () => open(opensWindowName)})
}

function Window({children, name}: ModalWindow) {
    const {openName, close} = useContext(ModalContext);
    const { ref } = useOutsideClick({ handler: close })

    if (notEqual(name, openName)) return null
    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}><HiXMark/></Button>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Open = Open
Modal.Window = Window

export default Modal;