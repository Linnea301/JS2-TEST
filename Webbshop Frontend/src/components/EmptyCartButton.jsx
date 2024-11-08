export function EmptyCartButton({ setCart, resetCartCount, setPage }) {
    const handleEmptyCart = () => {
        setCart([]); 
        resetCartCount(); 
        setPage('products'); 
    };

    return (
        <button onClick={handleEmptyCart}>Töm Varukorg</button>
    );
}
