export function PayButton({ handlePayment }) {
    const handleClick = () => {
        handlePayment(); 
    };

    return (
        <button onClick={handleClick}>Betala</button>
    );
}
