export function ItemCard({ imgSrc, name, price, stock, product, addToCart }) {
    const handleBuy = () => {
        if (stock > 0) {
            addToCart(product);
        }
    };

    return (
        <div>
            <img src={imgSrc} alt={name} id="itemImg" />
            <h2 id="nameHeader">{name}</h2>
            <p id="priceP">{price} kr</p>
            <p id="stockP">Lagersaldo: {stock}</p>
            <button id="itemCardBtn" onClick={handleBuy} disabled={stock === 0}>Köp</button>
        </div>
    );
}
