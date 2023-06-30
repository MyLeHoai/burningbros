import { useState } from "react";

type SeachInputProps = {
    handleSearch: (searchString: string) => void;
}

const SearchInput = ({ handleSearch }: SeachInputProps) => {

    const [searchString, setSearchString] = useState(null);

    const handleChange = (event: any) => {
        setSearchString(event.target.value);
        handleSearch(event.target.value);
    }

    return (
        <input className="search-input" placeholder="enter product name" onChange={handleChange} value={searchString || ""}></input>
    )
}
export default SearchInput;