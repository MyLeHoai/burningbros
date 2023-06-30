import { useEffect, useRef, useState } from "react";
import { ItemProps } from "./Item";
import Item from "./Item";
import SearchInput from "./SearchInput";
import "../list/searchable-list.css";

type ListItemsProps = {
    items: ItemProps[];
    itemNumber?: number;
    itemHeight?: number;
    hasMore?: boolean;
    handleScroll: () => void;
    handleSearch: (input: string) => void;
}

const SearchableList = ({ items, itemNumber, itemHeight, handleScroll, hasMore, handleSearch }: ListItemsProps) => {

    const [listHeight, setListHeight] = useState<number>();

    const endListRef = useRef(null);

    useEffect(() => {

        const defaultItemHeight = 30;
        const defaultItemNumber = 20;

        const finalItemNumber = itemNumber || defaultItemNumber;
        const finalItemHeight = itemHeight || defaultItemHeight;

        const maxListHeight: number = finalItemHeight * finalItemNumber;
        const height = items.length < finalItemNumber ? items.length * finalItemHeight : maxListHeight;
        setListHeight(height)
    }, [itemNumber, itemHeight, items])

    useEffect(() => {
        const onIntersection = (entries: any) => {
            if (entries[0].isIntersecting && items.length > 0) {
                handleScroll();
            }
        }

        const observer = new IntersectionObserver(onIntersection);

        if (observer && endListRef.current) {
            observer.observe(endListRef.current)
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        }
    }, [items, handleScroll])

    const listItems = items.map(
        (item) => <Item
            key={item.id}
            id={item.id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
        />
    );

    return (
        <div className="searchable-list">
            <SearchInput handleSearch={handleSearch} />
            {items.length && (
                <div className={"list-body scroller"} style={{ maxHeight: listHeight }}>
                    {
                        items.length > 0 ? listItems : (<p className="loading"> Loading... </p>)
                    }
                    {hasMore && <div ref={endListRef} />}
                </div >
            )}

        </div>
    )
}
export default SearchableList;