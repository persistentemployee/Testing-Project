// products.js
function fetchProducts() {
  return fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .catch((err) => console.error("Error fetching products:", err));
}

function getProductById(id) {
  const products = allProducts || [];
  return products.find((product) => product.id === id);
}
