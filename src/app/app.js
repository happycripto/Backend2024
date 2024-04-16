const express = require('express');
const productRoutes = require('../data/productRoutes.js')
const cartRoutes = require('../data/cartRoutes.js');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
