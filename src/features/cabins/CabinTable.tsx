import Spinner from "../../ui/Spinner.tsx";
import CabinRow from "./CabinRow.tsx";
import {useCabins} from "./useCabins.ts";
import Table from "../../ui/Table.tsx";
import {Cabin} from "../../services/types.ts";
import Menus from "../../ui/Menus.tsx";
import {useSearchParams} from "react-router-dom";
import {isEqualZero, isGreaterThan, strictEqual} from "../../utils/helpers.ts";
import Empty from "../../ui/Empty.tsx";


function CabinTable() {
    const {isLoading, cabins} = useCabins()
    const [searchParams] = useSearchParams()

    if (isLoading) return <Spinner/>
    if (!cabins?.length) return <Empty resourceName={'Cabins'} />

    // ------------ Filter -------------
    const filterValue = searchParams.get('discount') || 'all'

    let filteredCabins = cabins;

    if (strictEqual(filterValue, 'no-discount')) {
        filteredCabins = cabins?.filter(c => isEqualZero(c.discount))
    }
    else if (strictEqual(filterValue, 'with-discount')) {
        filteredCabins = cabins?.filter(c => isGreaterThan(c.discount, 0))
    }
    // ------------ Filter -------------

    // ------------ Sort -------------
    const sortBy = searchParams.get('sortBy') || 'startDate-asc'
    const [field, direction] = sortBy.split(/-/)

    const modifier = strictEqual(direction, 'asc') ? 1 : -1
    const sortedAndFilteredCabins = (filteredCabins as Cabin[]).sort(
        (a: Cabin , b: Cabin): number => ((a[field] as number)  - (b[field] as number)) * modifier
    )

    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body<Cabin>
                    data={sortedAndFilteredCabins as Cabin[]}
                    render={(cabin: Cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}
                />
            </Table>
        </Menus>
    )
}

export default CabinTable