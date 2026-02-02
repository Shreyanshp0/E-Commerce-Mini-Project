const productContainer = document.querySelector(".product");

// detect category from filename
const page = window.location.pathname.toLowerCase();

let currentCategory = "";

if (page.includes("electronic")) currentCategory = "Electronic";
else if (page.includes("fashion")) currentCategory = "Fashion";
else if (page.includes("books")) currentCategory = "Books";
else if (page.includes("sports")) currentCategory = "Sports";

function renderProducts() {
  const filtered = products.filter(p => p.category === currentCategory);

  productContainer.innerHTML = "";

  filtered.forEach(product => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

renderProducts();
