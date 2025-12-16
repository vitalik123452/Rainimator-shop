// Отримання ID товару з URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Отримання товарів з JSON файлу
async function getProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
        return [];
    }
}

// Пошук товару за ID
function findProductById(products, id) {
    return products.find(product => product.id === id);
}

// Відображення деталей товару
function displayProductDetails(product) {
    const productDetails = document.querySelector('#product-details');
    const breadcrumbTitle = document.querySelector('#breadcrumb-title');

    if (!product) {
        productDetails.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>Товар не знайдено</h3>
                <a href="products.html" class="btn btn-primary mt-3">Повернутися до каталогу</a>
            </div>
        `;
        return;
    }

    // Оновлення заголовка в хлібних крихтах
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = product.title;
    }

    // Відображення деталей товару
    productDetails.innerHTML = `
        <div class="col-md-6">
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h1>${product.title}</h1>
            <p>${product.fullDescription}</p>
            <h4>Ціна: ${product.price} грн</h4>
            <button class="btn btn-primary btn-lg" id="add-to-cart-btn">Додати до кошика</button>
        </div>
    `;

    // Додавання товару до кошика
    const addToCartBtn = document.querySelector('#add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product.id, product.title, product.price, product.image);
    });
}

// Додавання товару до кошика
function addToCart(productId, title, price, image) {
    const product = { id: productId, title, price, image };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Товар додано до кошика!');
}

// Основна функція для завантаження деталей товару
async function initProductPage() {
    const productId = getProductIdFromURL();
    const products = await getProducts();
    const product = findProductById(products, productId);
    displayProductDetails(product);
}

// Ініціалізація сторінки
initProductPage();
document.getElementById("addToCartBtn").addEventListener("click", () => {
    const product = {
        id: "rain-wynter-hoodie",
        name: "Rain Wynter Hoodie",
        price: 1200,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Товар додано в кошик!");
});