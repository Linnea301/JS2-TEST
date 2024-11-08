export function Cart({ cart }) {
    
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0); 
    return (
        <div>
            <h2>Din kundvagn</h2>
           
            {cart.map(item => (
                <div key={item.id}>
                    <img id="cartImg" src={item.imgSrc} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.quantity}</p>
                    <p>{(item.price * item.quantity).toFixed(2)} kr</p>
                </div>
            ))}
            <h3>Totalt att betala: {totalPrice.toFixed(2)} kr</h3>
        </div>
    );
}
