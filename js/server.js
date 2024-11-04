const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const productsFilePath = path.join(__dirname, '../products.json');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/add-product', async (req, res) => {
    const newProduct = req.body;

    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        const products = data.length === 0 ? {} : JSON.parse(data);

        const requiredFields = ['category', 'id', 'name__p', 'image', 'price'];
        for (const field of requiredFields) {
            if (!newProduct[field]) {
                return res.status(400).json({ error: `Поле "${field}" є обов'язковим.` });
            }
        }

        if (!products[newProduct.category]) {
            products[newProduct.category] = {};
        }

        if (products[newProduct.category][newProduct.id]) {
            return res.status(400).json({ error: 'ID продукту вже існує.' });
        }

        products[newProduct.category][newProduct.id] = {
            name__p: newProduct.name__p,
            image: newProduct.image,
            price: Number(newProduct.price),
        };

        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
        res.status(200).json({ message: 'Продукт успішно додано!' });
    } catch (error) {
        console.error('Помилка:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

app.get('/products', async (req, res) => {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        const products = data.length === 0 ? {} : JSON.parse(data);

        const category = req.query.category;
        if (category && products[category]) {
            res.status(200).json({ [category]: products[category] }); 
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        console.error('Помилка:', error);
        res.status(500).send('Внутрішня помилка сервера');
    }
});

app.delete('/delete-product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        const products = data.length === 0 ? {} : JSON.parse(data);

        let productFound = false;

        for (const category in products) {
            if (products[category][productId]) {
                delete products[category][productId];
                productFound = true;
                break;
            }
        }

        if (!productFound) {
            return res.status(404).json({ error: 'Продукт не знайдено.' });
        }

        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
        res.status(200).json({ message: 'Продукт успішно видалено.' });
    } catch (error) {
        console.error('Помилка:', error);
        res.status(500).json({ error: 'Внутрішня помилка сервера' });
    }
});

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});














