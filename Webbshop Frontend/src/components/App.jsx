import { useState, useEffect } from 'react';
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { PurchasePage } from "./PurchasePage";
import { Navbar } from "./Navbar";
import { getItemCardInfo } from '../utils/fetchItemCardDB';

export function App() {
    // Hanterar vilken sida som ska visas
    const [page, setPage] = useState('products');

    // Kundvagnens produkter
    const [cart, setCart] = useState([]);
    // Antal produkter i kundvagnen
    const [cartCount, setCartCount] = useState(0); 
    // Hämta alla produkter från databasen
    const [products, setProducts] = useState([]); 

   
    const fetchItemInfo = async () => {
        try {
            const data = await getItemCardInfo();
            setProducts(data); 
        } catch (error) {
            console.error("Kunde inte hämta produktdata:", error);
        }
    };

    // Anropa fetchItemInfo när sidan laddas för att hämta produkter
    useEffect(() => {
        fetchItemInfo();
    }, []);

    
    const addToCart = (product, quantity) => {

        let existingProduct = cart.find(item => item.id === product.id);


        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setCartCount(cartCount + 1);
    };

    // Funktion som hanterar köpet när användaren bekräftar
    const handlePurchase = async () => {
        // Skapa en lista med de sålda varorna, här antas varje produkt ha kvantitet 1
        const purchasedItems = cartItems.map(item => ({
            id: item.id, // Produktens ID
            quantity: 1 // Sätt varje produkts kvantitet till 1 (kan förändras om kvantitet används)
        }));

        try {
            // Skickar ett POST-anrop till backend för att genomföra köpet och uppdatera lagersaldot
            const response = await fetch("http://localhost:3000/purchase", {
                method: "PATCH", // Skicka en POST-förfrågan
                headers: {
                    "Content-Type": "application/json" // Ange att vi skickar JSON-data
                },
                body: JSON.stringify(purchasedItems) // Skicka de sålda varorna som JSON
            });

            // Om svaret inte är OK (t.ex. 404 eller 500), kastas ett fel
            if (!response.ok) {
                throw new Error("Något gick fel med uppdateringen av lagersaldot.");
            }

            // Töm kundvagnen efter genomfört köp
            setCartItems([]); 
            // Navigera till bekräftelsesidan efter köp
            navigateToPurchaseCompleted();

        } catch (error) {
            // Om något går fel, visa ett alert-fönster
            alert("Köp misslyckades. Vänligen försök igen.");
        }
    };
            
   
    const resetCartCount = () => {
        setCartCount(0);
    };

    // Rendera rätt sida beroende på vilken page som är vald
    const renderPage = () => {
        if (page === 'products') {
            return <ProductPage addToCart={addToCart} products={products} />;
        } 
        if (page === 'cart') {
            return <CartPage cart={cart} setPage={setPage} setCart={setCart} resetCartCount={resetCartCount} />;
        } 
        if (page === 'purchase') {
            return <PurchasePage 
                cart={cart} 
                setCart={setCart} 
                resetCartCount={resetCartCount} 
                handlePurchaseComplete={handlePurchaseComplete} 
            />;
        } 
       
        return <ProductPage addToCart={addToCart} products={products} />;
    };

    return (
        <>
            <Navbar setPage={setPage} cartCount={cartCount} />
            {renderPage()}
        </>
    );
}
