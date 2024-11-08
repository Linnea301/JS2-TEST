import { useState, useEffect } from "react";
import { ItemCard } from "./ItemCard";
import { SearchProduct } from "./SearchProduct";
import { SortItems } from "./SortItems";

export function ProductPage({ addToCart, products }) {
    const [selectedProducts, setSelectedProducts] = useState(products);

    // Uppdatera selectedProducts när produkterna ändras tex efter ett köp
    useEffect(() => {
        
        setSelectedProducts(products);
    }, [products]);

    const handleSearch = (searchTerm) => {
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSelectedProducts(filteredProducts);
    };

    const handleSort = (sortOrder) => {
        const sortedProducts = [...selectedProducts].sort((a, b) => {
            // Sortera i stigande ordning
            if (sortOrder === "asc") {
                return a.price - b.price;
            }
            // Sortera i fallande ordning 
            else if (sortOrder === "desc") {
                return b.price - a.price;
            }
        });
        setSelectedProducts(sortedProducts);
    };

    return (
        <>
            <div id="searchSortDiv">
                <SearchProduct onSearch={handleSearch} />
                <SortItems onSort={handleSort} />
            </div>
            <div id="itemDiv">
                {selectedProducts.length > 0 ? (
                    selectedProducts.map(product => (
                        <ItemCard
                            key={product.id}
                            imgSrc={product.imgSrc}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            product={product} 
                            addToCart={addToCart} 
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}
