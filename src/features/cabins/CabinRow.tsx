import styled from "styled-components";

import {formatCurrency} from "../../utils/helpers.ts";
import {Cabin as CabinType, imageType} from "../../services/types.ts";
import CreateCabinForm from "./CreateCabinForm.tsx";
import {useDeleteCabin} from "./useDeleteCabin.ts";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateCabin} from "./useCreateCabin.ts";
import {useQueryClient} from "@tanstack/react-query";
import Modal from "../../ui/Modal.tsx";
import ConfirmDelete from "../../ui/ConfirmDelete.tsx";
import Table from "../../ui/Table.tsx";
import Menus from "../../ui/Menus.tsx";

const Img = styled.img<{ src: imageType }>`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", serif;
`;

const Price = styled.div`
  font-family: "Sono", serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

type cabinRowProps = {
    cabin: CabinType
}

function CabinRow({cabin}: cabinRowProps) {
    const {id, name, maxCapacity, regularPrice, discount, image, description} = cabin

    // ------------------------------- start ~ cabin hooks ------------------------------------------------------------
    const queryClient = useQueryClient()
    const {isDeleting, mutateDeleteCabin} = useDeleteCabin()
    const {createCabin} = useCreateCabin({queryClient})
    // ------------------------------- end ~ cabin hooks --------------------------------------------------------------

    // -------- handlers -------------
    function handleDuplicate() {
        createCabin({name: `Copy of ${name}`, maxCapacity, regularPrice, discount, description, image} as CabinType)
    }

    return (
        <Table.Row role='row'>
            <Img src={image as imageType}/>
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity}</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {
                discount ? <Discount>{discount}</Discount> : <span>&mdash;</span>
            }
            <div>
                 <Modal>
                     <Menus.Menu>
                         <Menus.Toggle id={id as number}/>

                         <Menus.List id={id as number}>
                             <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack/>}><span>Duplicate</span></Menus.Button>
                             <Modal.Open opens="edit-cabin">
                                 <Menus.Button icon={<HiPencil/>}><span>Edit</span></Menus.Button>
                             </Modal.Open>
                             <Modal.Open opens="confirm-deletion">
                                 <Menus.Button icon={<HiTrash/>}><span>Delete</span></Menus.Button>
                             </Modal.Open>
                         </Menus.List>
                     </Menus.Menu>


                    <Modal.Window name="edit-cabin">
                        <CreateCabinForm cabinToEdit={cabin}/>
                    </Modal.Window>

                    <Modal.Window name="confirm-deletion">
                        <ConfirmDelete
                            resourceName='cabins'
                            onConfirm={() => mutateDeleteCabin(id as number)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;