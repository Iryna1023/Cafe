document.addEventListener("partialsLoaded", () => {
    import("./index.js").then(() => {
        updateCartBadge();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        updateCartBadge(); 
    }
    displayCartItems();

    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            localStorage.removeItem('cartItems'); 
            displayCartItems(); 
            updateCartBadge(); 
        });
    } else {
        console.error('Елемент #clear-cart-button не знайдено');
    }
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        return;
    }

    const tableHeader = document.createElement('table');
    tableHeader.classList.add('cart-table');
    tableHeader.innerHTML = `
        <thead>
            <tr>
                <th>Зображення</th>
                <th>Назва</th>
                <th>Ціна</th>
                <th>Кількість</th>
                <th>Дії</th>
            </tr>
        </thead>
        <tbody class="cart-body"></tbody>
    `;

    cartItemsContainer.appendChild(tableHeader);
    const cartBody = tableHeader.querySelector('.cart-body');

    cartItems.forEach((item) => {
        const itemRow = document.createElement('tr');
        itemRow.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td class="cart__name">${item.name}</td>
            <td class="cart__price">${item.price} грн</td>
            <td class="quantity__item">
                <button class="increase">+</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="decrease">-</button>
            </td>
            <td>
                <button class="remove-item">Видалити</button>
            </td>
        `;

        cartBody.appendChild(itemRow);

        itemRow.querySelector('.increase').addEventListener('click', () => {
            item.quantity += 1;
            updateCart(cartItems);
            itemRow.querySelector('.item-quantity').innerText = item.quantity;
            updateCartBadge();
            updateTotalPrice(cartItems);
        });

        itemRow.querySelector('.decrease').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
                updateCart(cartItems);
                itemRow.querySelector('.item-quantity').innerText = item.quantity;
                updateCartBadge();
                updateTotalPrice(cartItems);
            } else {
                removeItemFromCart(item, cartBody, itemRow);
            }
        });

        itemRow.querySelector('.remove-item').addEventListener('click', () => {
            removeItemFromCart(item, cartBody, itemRow);
        });
    });

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="4">Загальна вартість:</td>
        <td class="total-price">${calculateTotalPrice(cartItems)} грн</td>
    `;
    cartBody.appendChild(totalRow);

    const orderButtonRow = document.createElement('tr');
    orderButtonRow.innerHTML = `
        <td colspan="5">
            <button id="checkout-button" class="checkout-button">Оформити замовлення</button>
        </td>
    `;
    cartBody.appendChild(orderButtonRow);

    document.getElementById('checkout-button').addEventListener('click', () => {
        localStorage.removeItem('cartItems'); 
        displayCartItems(); 
        updateCartBadge(); 

        const messageContainer = document.createElement('div');
        messageContainer.innerHTML = `
            <div style="color: green; font-size: 20px;">
                <span>&#10003;</span> Дякуємо за замовлення!
            </div>
        `;
        messageContainer.style.textAlign = 'center';
        messageContainer.style.marginTop = '20px';

        cartItemsContainer.innerHTML = ''; 
        cartItemsContainer.appendChild(messageContainer);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (!cartBadge) {
        console.error('Елемент .cart-badge не знайдено');
        return;
    }
    
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    cartBadge.innerHTML = totalItems;
}

function updateCart(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function removeItemFromCart(item, cartBody, itemRow) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(cartItem => cartItem.name !== item.name);
    updateCart(cartItems); 
    cartBody.removeChild(itemRow);
    updateCartBadge();
    updateTotalPrice(cartItems); 
}

function updateTotalPrice(cartItems) {
    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.innerText = `${calculateTotalPrice(cartItems)} грн`;
    }
}
