import { useState } from 'react';

export function SearchProduct({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault(); 
        onSearch(searchTerm); 
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Sök här..." 
                value={searchTerm} 
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Sök</button>
        </form>
    );
}