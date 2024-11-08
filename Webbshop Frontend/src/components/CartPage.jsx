import { Cart } from "./Cart";
import { PayButton } from "./PayButton";
import { EmptyCartButton } from "./EmptyCartButton";

export function CartPage({ cart, setCart, setPage, resetCartCount }) {
    const handlePayment = () => {
        setCart([]); 
        resetCartCount(); 
        setPage('purchase'); 
    };
   
    return (
        <>
            <Cart cart={cart} />
            <PayButton handlePayment={handlePayment} /> 
            <EmptyCartButton setCart={setCart} /> 
        </>
    );
}
