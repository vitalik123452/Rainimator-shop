class Cart {
    constructor() {
        this.items = this.loadCartFromCookies() || {}; // Завантаження кошика з cookies
        this.total = 0;
        this.updateCartCount();
    }

    // Додавання товару до кошика
    addItem(product) {
        if (this.items[product.id]) {
            this.items[product.id].quantity += 1;
        } else {
            this.items[product.id] = {
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image
            };
        }
        this.saveCartToCookies();
        this.updateCartCount();
    }

    // Видалення товару з кошика
    removeItem(productId) {
        if (this.items[productId]) {
            delete this.items[productId];
            this.saveCartToCookies();
            this.updateCartCount();
        }
    }

    // Очищення кошика
    clearCart() {
        this.items = {};
        this.saveCartToCookies();
        this.updateCartCount();
    }

    // Підрахунок загальної суми
    calculateTotal() {
        this.total = 0;
        for (let key in this.items) {
            this.total += this.items[key].price * this.items[key].quantity;
        }
        return this.total;
    }

    // Отримання кількості товарів
    getItemCount() {
        let count = 0;
        for (let key in this.items) {
            count += this.items[key].quantity;
        }
        return count;
    }

    // Оновлення лічильника в навігації
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(element => {
            element.textContent = count;
            if (count > 0) {
                element.style.display = 'inline';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Збереження кошика в cookies
    saveCartToCookies() {
        const cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }

    // Завантаження кошика з cookies
    loadCartFromCookies() {
        const cookies = document.cookie.split('; ');
        const cartCookie = cookies.find(row => row.startsWith('cart='));
        if (cartCookie) {
            return JSON.parse(cartCookie.split('=')[1]);
        }
        return null;
    }

    // Відображення товарів у кошику
    renderCart(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Очищення контейнера
        for (let key in this.items) {
            const item = this.items[key];
            const cartItem = `
                <div class="cart-item d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.title}" class="me-3" style="width: 100px;">
                        <div>
                            <h5>${item.title}</h5>
                            <p>Ціна: ${item.price} грн</p>
                            <p>Кількість: ${item.quantity}</p>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="cart.removeItem(${key}); cart.renderCart('${containerId}')">Видалити</button>
                </div>
                <hr>
            `;
            container.innerHTML += cartItem;
        }
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${this.calculateTotal()} грн`;
        }
    }
}

// Ініціалізація кошика
const cart = new Cart();

// Додавання товару до кошика (приклад використання)
function addToCart(productId, title, price, image) {
    const product = { id: productId, title, price, image };
    cart.addItem(product);
    alert('Товар додано до кошика!');
}

// Відображення кошика на сторінці cart.html
if (document.getElementById('cart-container')) {
    cart.renderCart('cart-container');
}