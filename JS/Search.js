const searchInput = document.getElementById("searchInput");
const suggestionBox = document.getElementById("search-suggestion");

let matchedProduct = null;

// 🔹 Handle typing (NO redirect)
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        suggestionBox.style.display = "none";
        matchedProduct = null;
        return;
    }

    matchedProduct = products.find(p =>
        p.name.toLowerCase().startsWith(query)
    );

    if (matchedProduct) {
        suggestionBox.innerHTML = `
            <strong>${matchedProduct.name}</strong><br>
            ₹${matchedProduct.price} • ${matchedProduct.category}
        `;
        suggestionBox.style.display = "block";
    } else {
        suggestionBox.style.display = "none";
    }
});

// 🔹 Handle ENTER key (REDIRECT + HIGHLIGHT)
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        if (!matchedProduct) {
            alert("Product not found");
            return;
        }

        // Save highlight info
        localStorage.setItem("highlightProductId", matchedProduct.id);

        const categoryPages = {
            Electronic: "Electronic.html",
            Fashion: "Fashion.html",
            Books: "books.html",
            Sports: "Sports.html",
            "Home Decoration": "homePro.html"
        };

        window.location.href = categoryPages[matchedProduct.category];
    }
});
