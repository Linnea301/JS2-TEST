export function SortItems({ onSort }) {
    const handleSort = (event) => {
        onSort(event.target.value); 
    };

    return (
        <div>
            <label htmlFor="sort">Sortera efter: </label>
            <select name="sort" onChange={handleSort}>
                <option value="asc">Lägst pris först</option>
                <option value="desc">Högst pris först</option>
            </select>
        </div>
    );
}
