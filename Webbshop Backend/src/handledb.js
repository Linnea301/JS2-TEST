import fs from "fs/promises";

export async function getItemCardInfo() {
    const rawdata = await fs.readFile('./src/itemCardInfoDB.json');
    return JSON.parse(rawdata);
}

// export async function updateStock(products) {
//     const jsonData = JSON.stringify(products, null, 2); 
//     await fs.writeFile('./src/itemCardInfoDB.json', jsonData);
// }
export async function updateStock(products) {
    try {
        await fs.writeFile('./src/itemCardInfoDB.json', JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Fel vid uppdatering av lagersaldo:', error);
        throw new Error('Kunde inte uppdatera lagersaldo');
    }
}

