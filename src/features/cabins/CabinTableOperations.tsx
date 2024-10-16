import TableOperations from "../../ui/TableOperations.tsx";
import Filter from "../../ui/Filter.tsx";
import {IOption} from "../../services/types.ts";
import SortBy from "../../ui/SortBy.tsx";


function CabinTableOperations() {
    const field = 'discount'

    const tableFilterOptions: IOption[] = [
         {value: 'all', label: 'All'},
         {value: 'with-discount', label: 'With Discount'},
         {value: 'no-discount', label: 'No Discount'}
    ]

    const sortByOptions: IOption[] = [
        {value: 'name-asc', label: 'Sort by name (A-Z)'},
        {value: 'name-desc', label: 'Sort by name (Z-A)'},
        {value: 'regularPrice-asc', label: 'Sort by price (Low first)'},
        {value: 'regularPrice-desc', label: 'Sort by price (High first)'},
        {value: 'maxCapacity-asc', label: 'Sort by capacity (Low first)'},
        {value: 'maxCapacity-desc', label: 'Sort by capacity (High first)'},
    ]

    return (
        <TableOperations>
            <Filter filterField={field} options={tableFilterOptions} defaultVal='all' />
            <SortBy options={sortByOptions} />
        </TableOperations>
    );
}

export default CabinTableOperations;