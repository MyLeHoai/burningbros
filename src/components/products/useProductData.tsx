import axios from "axios";
import { useCallback, useEffect, useState } from "react";


export type Product = {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    item: { [key: string]: string };
}

export function useLoadProductData() {

    const [items, setItems] = useState<Product[]>([]);
    const [searchString, setSearchString] = useState<string>("")
    const [page, setPage] = useState<number>(1);
    const [hasMoreItem, setHasMoreItem] = useState<boolean>(true);

    const dummyApi = "https://dummyjson.com/products";

    const fetchData = async (url: string) => {
        const products = await (await axios.get(url)).data.products;
        setItems(products);
        setPage(1);
        setHasMoreItem(true);
    };

    const fetchMoreData = useCallback(async () => {
        const urlWithSearchString = `${dummyApi}/search?q=${searchString}&limit=${20}&skip=${page * 20}`;
        const urlWithoutSearchString = `${dummyApi}?limit=${20}&skip=${page * 20}`;

        const url = searchString ? urlWithSearchString : urlWithoutSearchString;

        const { data } = await axios.get(url);

        if (data.products.length > 0) {
            setItems(oldItems => [...oldItems, ...data.products]);
            setPage(prev => prev + 1);
        } else {
            setHasMoreItem(false)
        }
    }, [page, searchString])

    const handleSearch = async (searchInput: string) => {
        setSearchString(searchInput);
        const url = `${dummyApi}/search?q=${searchInput}&limit=20`;
        fetchData(url);
    };

    useEffect(() => {
        fetchData(`${dummyApi}?limit=20&skip=0`);
    }, [])

    return {
        items,
        fetchMoreData,
        hasMoreItem,
        handleSearch
    }
}
