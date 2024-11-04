document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    categories.forEach(categoryElement => {
        const category = categoryElement.innerText.toLowerCase();
        fetchProducts(category);
        
    });

    const form = document.getElementById('product-form');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = document.getElementById('id').value.trim();
            const name__p = document.getElementById('name__p').value.trim();
            const image = document.getElementById('image').value.trim();
            const price = document.getElementById('price').value.trim();
            const category = document.querySelector('.category').value;

            const product = { id, name__p, image, price, category };

            if (!id || !name__p || !image || !price || !category) {
                document.getElementById('message').innerText = 'Всі поля є обов\'язковими.';
                return;
            }

            if (isNaN(price) || price <= 0) {
                document.getElementById('message').innerText = 'Ціна має бути додатнім числом.';
                return;
            }

            try {
                const response = await fetch('http://localhost:5500/add-product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                document.getElementById('message').innerText = 'Продукт успішно додано!';
                addNewProductToPage(product);
            } catch (error) {
                console.error('Помилка:', error);
                document.getElementById('message').innerText = 'Сталася помилка при додаванні продукту.';
            }
        });
    }

    const deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault(); 
        const id = document.getElementById('id').value.trim();

        if (!id) {
            document.getElementById('message').innerText = 'Введіть ID продукту для видалення.';
            return;
        }

        try {
            const response = await fetch(`http://localhost:5500/delete-product/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Network response was not ok');

            document.getElementById('message').innerText = 'Продукт успішно видалено!';
            removeProductFromPage(id);
        } catch (error) {
            console.error('Помилка:', error);
            document.getElementById('message').innerText = 'Сталася помилка при видаленні продукту.';
        }
    });
});

async function fetchProducts(category) {
    try {
        const response = await fetch('http://localhost:5500/products');
        if (!response.ok) throw new Error('Network response was not ok');

        const products = await response.json();
        displayProducts(products, category);
    } catch (error) {
        console.error('Помилка при отриманні товарів:', error);
    }
}

function displayProducts(products, category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (products[category]) {
        createCategorySection(category);
        const categoryProducts = products[category];

        for (const id in categoryProducts) {
            const product = {
                ...categoryProducts[id],
                category: category,
                id: id
            };
            addNewProductToPage(product);
        }
    } else {
        productList.innerHTML = '<p>Продукти не знайдено у цій категорії.</p>';
    }
}

function createCategorySection(category) {
    const productList = document.getElementById('product-list');
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category-items';
    categoryDiv.id = `${category}-items`;
    productList.appendChild(categoryDiv);
}

function addNewProductToPage(product) {
    const categoryDiv = document.getElementById(`${product.category}-items`);
    if (!categoryDiv) {
        console.error('Елемент категорії не знайдено.');
        return;
    }

    const productItem = document.createElement('div');
    productItem.classList.add('pro__menu');
    productItem.setAttribute('data-id', product.id);
    productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name__p}" class="menu__water">
        <p>${product.name__p}</p>
        <div class="menu__buy">
            <p class="menu__price">${product.price} грн</p>
            <a href="#"><button class="order" data-art="${product.name__p}">Замовити</button></a>
        </div>
    `;

    categoryDiv.appendChild(productItem);
}

function removeProductFromPage(id) {
    const productItem = document.querySelector(`.pro__menu[data-id="${id}"]`);
    if (productItem) {
        productItem.remove();
    } else {
        document.getElementById('message').innerText = 'Продукт не знайдено.';
    }
}



