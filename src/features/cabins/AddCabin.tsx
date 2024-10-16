import Button from "../../ui/Button.tsx";
import CreateCabinForm from "./CreateCabinForm.tsx";
import Modal from "../../ui/Modal.tsx";


function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens='cabin-form'>
                    <Button>Add New Cabin</Button>
                </Modal.Open>
                <Modal.Window name='cabin-form'>
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AddCabin;