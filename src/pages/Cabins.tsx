import Heading from "../ui/Heading";
import Row from "../ui/Row";
import {Fragment} from "react";
import CabinTable from "../features/cabins/CabinTable.tsx";
import AddCabin from "../features/cabins/AddCabin.tsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.tsx";

function Cabins() {
    return (
        <Fragment>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>
            <Row>
                <CabinTable/>
                <AddCabin />
            </Row>
        </Fragment>
    );
}

export default Cabins;
