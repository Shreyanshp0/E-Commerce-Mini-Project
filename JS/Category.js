// document.addEventListener("DOMContentLoaded", () => {

//     const container = document.querySelector(".product");
//     if (!container) return;

//     const file = window.location.pathname.split("/").pop();

//     let category = "";
//     if (file === "Electronic.html") category = "Electronic";
//     else if (file === "Fashion.html") category = "Fashion";
//     else if (file === "books.html") category = "Books";
//     else if (file === "Sports.html") category = "Sports";
//     else if (file === "homePro.html") category = "Home Decoration";

//     const highlightId = localStorage.getItem("highlightProductId");

//     const filtered = products.filter(p => p.category === category);
//     container.innerHTML = "";

//     filtered.forEach(product => {
//         container.innerHTML += `
//             <div class="product-card" id="product-${product.id}">
//                 <img src="${product.image}">
//                 <h4>${product.name}</h4>
//                 <p>₹${product.price}</p>
//                 <button onclick="addToCart(${product.id})">Add to Cart</button>
//             </div>
//         `;
//     });

//     // 🔥 APPLY HIGHLIGHT AFTER RENDER
//     if (highlightId) {
//         setTimeout(() => {
//             const target = document.getElementById(`product-${highlightId}`);
//             if (target) {
//                 target.classList.add("highlight-product");
//                 target.scrollIntoView({ behavior: "smooth", block: "center" });
//             }

//             // Remove only AFTER highlight is applied
//             localStorage.removeItem("highlightProductId");
//             localStorage.removeItem("highlightCategory");
//         }, 300);
//     }
// });
document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".product");
    if (!container) return;

    // Detect category from page name
    const file = window.location.pathname.split("/").pop();
    let category = "";

    if (file === "Electronic.html") category = "Electronic";
    else if (file === "Fashion.html") category = "Fashion";
    else if (file === "books.html") category = "Books";
    else if (file === "Sports.html") category = "Sports";
    else if (file === "homePro.html") category = "Home Decoration";

    // Initial products for category
    let categoryProducts = products.filter(p => p.category === category);

    // Render function
    function renderProducts(list) {
        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML = "<p>No products found.</p>";
            return;
        }

        list.forEach(product => {
            container.innerHTML += `
                <div class="product-card" id="product-${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>₹${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
    }

    // Initial render
    renderProducts(categoryProducts);

    // ===== PRICE FILTER LOGIC =====
    const priceRadios = document.querySelectorAll('input[name="price"]');

    priceRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            const value = radio.value;
            let filtered = [];

            if (value === "all") {
                filtered = categoryProducts;
            } 
            else if (value === "0-50") {
                filtered = categoryProducts.filter(p => p.price <= 50);
            } 
            else if (value === "51-100") {
                filtered = categoryProducts.filter(p => p.price >= 51 && p.price <= 100);
            } 
            else if (value === "101-200") {
                filtered = categoryProducts.filter(p => p.price >= 101 && p.price <= 200);
            } 
            else if (value === "201-500") {
                filtered = categoryProducts.filter(p => p.price >= 201 && p.price <= 500);
            } 
            else if (value === "500+") {
                filtered = categoryProducts.filter(p => p.price > 500);
            }

            renderProducts(filtered);
        });
    });

});


document.addEventListener("DOMContentLoaded", () => {

    const currentPage = window.location.pathname.split("/").pop();

    const categoryMap = {
        "Electronic.html": "Electronics",
        "Fashion.html": "Fashion",
        "books.html": "Books",
        "Sports.html": "Sports",
        "homePro.html": "Home Decoration"
    };

    const currentCategory = categoryMap[currentPage];
    if (!currentCategory) return;

    // Find matching sidebar link
    const sidebarLinks = document.querySelectorAll(".sidebar a");

    sidebarLinks.forEach(link => {
        if (link.textContent.trim() === currentCategory) {
            link.classList.add("active-category");
        }
    });

});
