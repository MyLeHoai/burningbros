
export type ItemProps = {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
}

const Item = ({ id, title, thumbnail, price }: ItemProps) => {

    return (
        <div className="product-item" key={id}>
            <img src={thumbnail} alt="product iamge" className="product-image" />
            <div className="product-info">
                <div className="product-name">{title}</div>
                <div className="product-price">{price}$</div>
            </div>
        </div>)
}
export default Item;