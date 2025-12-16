document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    try {
        const response = await fetch('products.json');
        const products = await response.json();
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-category').textContent = `Категорія: ${product.category}`;
            document.getElementById('product-price').innerHTML = `${product.price} грн`;
            document.getElementById('product-description').textContent = product.description;

            // Set up add to cart button
            const addToCartBtn = document.getElementById('add-to-cart-btn');
            addToCartBtn.onclick = () => addToCart(product);
        } else {
            console.error('Product not found');
            document.querySelector('.product-details').innerHTML = '<h2>Товар не знайдено</h2>';
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
