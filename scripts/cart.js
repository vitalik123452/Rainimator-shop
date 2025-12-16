let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartDiv = document.getElementById("cart");
    const totalDiv = document.getElementById("total");
    cartDiv.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Кошик порожній 😢</p>";
        totalDiv.textContent = "Разом: 0 грн";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartDiv.innerHTML += `
      <div class="item">
        <div>
          <strong>${item.name}</strong><br>
          ${item.price} грн × 
          <input type="number" min="1" value="${item.quantity}"
            onchange="updateQuantity(${index}, this.value)">
        </div>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
    });

    totalDiv.textContent = `Разом: ${total} грн`;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function updateQuantity(index, value) {
    cart[index].quantity = Number(value);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();