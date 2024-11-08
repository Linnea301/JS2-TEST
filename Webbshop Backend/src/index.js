import express from "express";
import cors from "cors";
import { getItemCardInfo, updateStock } from './handledb.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000; 

//Detta är samma kod som den under fast den har console logar ? Jag hade denna koden först
// app.get('/iteminfo', async (req, res) => {
//     const itemCardInfo = await getItemCardInfo();
//     res.json(itemCardInfo);
// });

// Hämtar alla produkter
app.get('/iteminfo', async (req, res) => {
    try {
      console.log('GET /iteminfo begäran mottagen');
      const itemCardInfo = await getItemCardInfo();
      console.log('Produkter hämtade:', itemCardInfo);
      res.json(itemCardInfo);
    } catch (error) {
      console.error('Fel vid hämtning av produktdata:', error);
      res.status(500).json({ message: 'Fel vid hämtning av produktdata' });
    }
  });
  
  //OBS se över patchen
  app.patch('/purchase', async (req, res) => {
    const purchasedItems = req.body;

    try {
        const products = await getItemCardInfo(); //OBS har ändrat från getProducts

        
        purchasedItems.forEach(purchasedItem => {
            const product = products.find(p => p.id === purchasedItem.id);
            if (product) {
             
                if (product.inStock >= purchasedItem.quantity) {    // Kontrollera att det finns tillräckligt med lager innan vi minskar det
                    product.inStock -= purchasedItem.quantity; 
                } else {
                    return res.status(400).json({ message: `Inte tillräckligt med lager för ${product.name}.` });
                }
            }
        });

        // Spara den uppdaterade produkten
        await updateStock(products);

        res.status(200).json({ message: "Köp genomfört och lagersaldo uppdaterat." });
    } catch (error) {
        console.error("Fel vid genomförande av köp:", error);
        res.status(500).json({ message: "Kunde inte genomföra köpet." });
    }
});



app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
