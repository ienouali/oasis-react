import {IOption} from "../services/types.ts";
import Select from "./Select.tsx";
import {useSearchParams} from "react-router-dom";
import {ChangeEvent} from "react";

type TSortBy = {
    options: IOption[]
}
function SortBy({ options }: TSortBy) {
    const [searchParams, setSearchParams] =  useSearchParams()
    const sortBy = searchParams.get('sortBy') || '';
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
         searchParams.set('sortBy', (e.target  as HTMLSelectElement).value as string)
        setSearchParams(searchParams)
    }
    return (<Select options={options} value={sortBy} type='white' onChange={handleChange} />);
}

export default SortBy;