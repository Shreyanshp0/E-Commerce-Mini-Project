console.log("home.js loaded");

window.onload = function () {

    const container = document.querySelector("#home-products");
    console.log("Container:", container);
    console.log("Products:", products);

    if (!container) {
        console.error("home-products div not found");
        return;
    }

    if (!products || products.length === 0) {
        console.error("products array not loaded");
        return;
    }

    const shuffled = [...products].sort(() => Math.random() - 0.5);
    const randomProducts = shuffled.slice(0, 15);
    
    container.innerHTML = "";
    
    randomProducts.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
    });

    updateCartCount();
    
};
