
class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }


    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        if (this.products.some((p) => p.code === product.code)) {
            console.error('El código del producto ya existe');
            return;
        }

        const newProduct = {
            ...product,
            id: this.productIdCounter,
        };

        this.products.push(newProduct);
        this.productIdCounter++;

    }

    getProducts() {
        return this.products;
    }

    getProductByID(id) {
        const product = this.products.find((p) => p.id === id);
            if (!product) {
                console.error('Producto no encontrado');
                return;
            }

        return product;
    }

}

// Ejemplo de uso
const productManager = new ProductManager();
productManager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 100,
    thumbnail: "thumbnail1.jpg",
    code: "001",
    stock: 10
});
productManager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 200,
    thumbnail: "thumbnail2.jpg",
    code: "002",
    stock: 20
});

console.log(productManager.getProducts());
console.log(productManager.getProductByID(2));
console.log(productManager.getProductByID(3)); // Debería mostrar un error