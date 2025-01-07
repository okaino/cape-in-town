const express = require("express")
const bodyParser = require('body-parser');
require('dotenv').config()
const axios = require('axios')
const fs = require('fs');
const path = require('path');
const router = new express.Router();
const dataFilePath = path.join(__dirname, '../data', 'data.json');
router.use(bodyParser.json());
// Ensure the data file exists
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([])); // Initialize with an empty array
}

// Helper function to read/write data
const readData = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
const writeData = (data) => fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

// Routes
router.get('/menu', (req, res) => {
    const data = readData();
    res.json(data);
});

router.post('/items', (req, res) => {
    const newItem = req.body;
    const data = readData();
    newItem.id = Date.now();
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});
router.post('/foods', (req, res) => {
    const { category } = req.body; // Extract category from request body
    const data = readData(); // Assuming readData() reads from data.json
    console.log("data",data)
    const filteredData = data.filter((item) => item.category === category);
    res.json(filteredData);
});
router.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const data = readData();
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem };
        writeData(data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});
//  router.post('/sendCart', async (req, res) => {
//     client.messages.create({
//                 from: 'whatsapp:+14155238886',
//         contentSid: 'HX350d429d32e64a552466cafecbe95f3c',
//         contentVariables: '{"1":"12/1","2":"3pm"}',
//         to: 'whatsapp:+905319793748'
//     }).then(message => console.log(message.sid))
// })
// async function sendTemplateMessage () {
    
// }

router.post('/sendCart', (req, res) => {
    const { cart } = req.body;
    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }
      let message = "Cape In Town,\n\n Benim Siparişim:\n";
      cart.cartDynamic.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - Adet: ${item.quantity} - ${item.extraPatty ? item.extraPatty : item.extraChick ? item.extraChick : ""}\n`;
      });
      message += `Adres: \n ${cart.address}\n Sepet Toplamı: ${cart.totalPrice}\n`
      if(cart.notes.length > 0)
        message += `Notlar: \n ${cart.notes}`
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${encodedMessage}`;
    res.json({ whatsappUrl })
})

router.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    let data = readData();
    const initialLength = data.length;
    data = data.filter((item) => item.id !== parseInt(id));

    if (data.length < initialLength) {
        writeData(data);
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


module.exports = router