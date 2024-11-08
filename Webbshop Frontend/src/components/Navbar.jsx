export function Navbar({ setPage, cartCount }) {
    return (
        <nav>
            <div id="navDiv">
                <h3 onClick={() => setPage('products')}>Produkter</h3>
                <h3 onClick={() => setPage('cart')}>
                    Kundvagn <span id="cartAmount">{cartCount}</span>
                </h3>
            </div>
        </nav>
    );
}
