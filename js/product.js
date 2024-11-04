document.addEventListener("partialsLoaded", () => {
    import("./index.js").then(() => {
        loadCart();
    });
});

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    const categories = document.querySelectorAll('.category');
    categories.forEach(categoryElement => {
        const category = categoryElement.innerText.toLowerCase();
        fetchProducts(category);
    });

    const productList = document.getElementById('product-list');
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('order')) {
            const productItem = event.target.closest('.pro__menu');
            const productId = productItem.getAttribute('data-id');
            const productName = event.target.getAttribute('data-art');
            const productPrice = parseInt(productItem.querySelector('.menu__price').innerText);
            const productImage = productItem.querySelector('img').src;

            addToCart(productId, productName, productPrice, productImage);
        }
    });
});

function addToCart(id, name, price, image) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, image, price, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartBadge = document.getElementById('my-cart');
    if (cartBadge) {
        cartBadge.innerText = cartCount;
    }
    localStorage.setItem('cartCount', cartCount);
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartDisplay();

    const storedCartCount = localStorage.getItem('cartCount');
    if (storedCartCount) {
        const cartBadge = document.getElementById('my-cart');
        if (cartBadge) {
            cartBadge.innerText = storedCartCount;
        }
    }
}

async function fetchProducts(category) {
    try {
        const response = await fetch('http://localhost:5500/products');
        if (!response.ok) throw new Error('Network response was not ok');

        const products = await response.json();
        displayProducts(products, category);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products, category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    if (products[category]) {
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
        productList.innerHTML = '<p>No products found in this category.</p>';
    }
}

function addNewProductToPage(product) {
    const productList = document.getElementById('product-list');
    const productItem = document.createElement('div');
    productItem.classList.add('pro__menu');
    productItem.setAttribute('data-id', product.id);
    productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name__p}" class="menu__water">
        <p>${product.name__p}</p>
        <div class="menu__buy">
            <p class="menu__price">${product.price} грн</p>
            <button class="order" data-art="${product.name__p}">Замовити</button>
        </div>
    `;
    productList.appendChild(productItem);
}
