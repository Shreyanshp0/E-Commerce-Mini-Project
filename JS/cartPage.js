// ================= CART HELPERS =================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.innerText = getCart().length;
    }
}

// ================= CART RENDER =================
function renderCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    if (!cartItemsDiv || !totalEl) return;

    const cart = getCart();
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <p>Your cart is empty. <a href="Home.html">Shop Now!</a></p>
        `;
        totalEl.innerText = "₹0";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalEl.innerText = `₹${total}`;
}

// ================= CART ACTIONS =================
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// ================= CHECKOUT MODAL =================
function openCheckout() {
    if (getCart().length === 0) {
        alert("Your cart is empty!");
        return;
    }
    document.getElementById("checkout").style.display = "block";
}

function closeCheckout() {
    document.getElementById("checkout").style.display = "none";
}

// ================= PURCHASE LOGIC =================
function completePurchase() {

    // Inputs WITHOUT IDs (based on your HTML)
    const email = document.querySelector('#checkout input[type="email"]').value.trim();
    const address = document.querySelector('#checkout input[type="text"]').value.trim();
    const card = document.getElementById("card").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    // ✅ VALIDATION
    if (!email || !address || !card || !cvv) {
        alert("Please fill all the fields.");
        return;
    }

    if (card.length !== 16) {
        alert("Card number must be 16 digits.");
        return;
    }

    if (cvv.length !== 3) {
        alert("CVV must be 3 digits.");
        return;
    }

    // ✅ CLEAR CART
    localStorage.removeItem("cart");
    updateCartCount();
    renderCart();

    // ✅ CLOSE CHECKOUT MODAL
    closeCheckout();

    // ✅ OPEN THANK YOU MODAL
    document.getElementById("thank-you").style.display = "block";

    console.log("✅ Confirmation email sent successfully!");
}

// ================= THANK YOU MODAL =================
function closeThankYou() {
    document.getElementById("thank-you").style.display = "none";
    window.location.href = "Home.html";
}

// ================= INPUT RESTRICTIONS =================
window.onload = () => {
    renderCart();
    updateCartCount();

    const cardInput = document.getElementById("card");
    const cvvInput = document.getElementById("cvv");

    if (cardInput) {
        cardInput.addEventListener("input", () => {
            cardInput.value = cardInput.value.replace(/\D/g, "").slice(0, 16);
        });
    }

    if (cvvInput) {
        cvvInput.addEventListener("input", () => {
            cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 3);
        });
    }
};
