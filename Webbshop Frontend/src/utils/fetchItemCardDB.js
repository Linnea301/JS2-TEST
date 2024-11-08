const baseURL = "http://localhost:3000/iteminfo";

async function getItemCardInfo() {
    const res = await fetch(baseURL);
    const itemCardInfo = await res.json();
    
    return itemCardInfo;
    
}


export {getItemCardInfo};