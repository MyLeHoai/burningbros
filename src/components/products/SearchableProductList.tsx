
import SearchableList from "../list/SearchableList";
import { useLoadProductData } from "./useProductData";

const SearchableProductList = () => {

    const { items, fetchMoreData, hasMoreItem, handleSearch } = useLoadProductData();

    return <SearchableList
        items={items.map(item => { return { id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail } })}
        itemHeight={30}
        itemNumber={20}
        hasMore={hasMoreItem}
        handleScroll={fetchMoreData}
        handleSearch={handleSearch}
    />

}
export default SearchableProductList;