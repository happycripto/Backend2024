const express = require('express');
const router = express.Router();
const fs = require('fs');

// Función para generar un ID único para el carrito
function generateUniqueCartId() {
  // Implementa la lógica para generar un ID único, por ejemplo, utilizando un timestamp
    return Date.now().toString();
}

// Función para guardar el carrito en "cart.json"
function saveCartToFile(cart) {
  const cartsData = loadCartsFromFile();
  cartsData.push(cart);
  fs.writeFileSync('data/cart.json', JSON.stringify(cartsData, null, 2), 'utf-8');
}

// Para leer json de productos
function loadProductsFromFile() {
  try {
    const data = fs.readFileSync('data/products.json', 'utf-8');
    return JSON.parse(data);
    
  } catch (error) {
    return [];
  }
}


// Función para cargar los carritos desde el archivo "cart.json"
function loadCartsFromFile() {
  try {
    const data = fs.readFileSync('data/cart.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}


// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  try {
      const newCart = req.body;
      const cartId = generateUniqueCartId();
      newCart.id = cartId;
      newCart.products = [];
      const carts = loadCartsFromFile();
      carts.push(newCart);
      saveCartToFile(carts);
      res.json({ message: 'Carrito creado exitosamente', id: cartId });
  } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito' });
  }
});


// Ruta para obtener un carrito por su ID
router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const carts = loadCartsFromFile();
  const cart = carts.find((cart) => cart.id === cartId);
  if (cart) {
      res.json(cart);
  } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// En la función para agregar un producto al carrito, puedes obtener el producto desde loadProductsFromFile
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid, 10); // Convertir a número
  const quantity = req.body.quantity || 1; // Default a 1 si no se especifica

  const carts = loadCartsFromFile();
  const cart = carts.find((cart) => cart.id === cartId);
  if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
  }

  const products = loadProductsFromFile();
  const product = products.find((product) => product.id === productId);
  if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
  }

  const existingProduct = cart.products.find((product) => product.id === productId);
  if (existingProduct) {
      existingProduct.quantity += quantity;
  } else {
      cart.products.push({ id: productId, quantity });
  }

  saveCartsToFile(carts);
  res.json({ message: 'Producto agregado al carrito exitosamente' });
});

module.exports = router;