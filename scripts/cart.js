// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('#cart-container');
    const totalContainer = document.querySelector('#cart-total');

    if (!cartContainer) return;

    // Функція для відображення кошика
    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Кошик порожній</p>';
            if (totalContainer) totalContainer.innerText = '0 грн';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.style.display = 'flex';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '10px';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}" width="80" style="margin-right:10px;">
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                    <button class="remove-item" data-index="${index}">Видалити</button>
                </div>
            `;
            cartContainer.appendChild(itemDiv);

            // Підрахунок суми
            const priceNumber = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            total += priceNumber;
        });

        if (totalContainer) totalContainer.innerText = `${total} грн`;

        // Видалення товару
        const removeButtons = cartContainer.querySelectorAll('.remove-item');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.dataset.index;
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    renderCart();
});