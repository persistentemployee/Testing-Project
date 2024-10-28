const randomSizes = ["S", "M", "L", "XL"];
const randomColors = ["Red", "Blue", "Green", "Black"];
const randomNames = [
  "Men's T-Shirt",
  "Women's Jacket",
  "Men's Jeans",
  "Women's Dress",
];

function getRandomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getOrders() {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
}

function loadOrders() {
  const container = document.getElementById("order-review");
  const orders = getOrders();

  // Loop through each object in the orders array
  orders.forEach((product) => {
    // Create the product column
    const coloumnDiv = document.createElement("div");
    const coloumnTextDiv = document.createElement("div");
    const coloumnlabelDiv = document.createElement("div");
    coloumnDiv.classList.add("columns");
    coloumnTextDiv.classList.add("coloumnTextDiv");

    const orderQuantity = document.createElement("div");
    orderQuantity.classList.add("Order-quantity");

    // Create the product image
    const productImg = document.createElement("img");
    productImg.src = product.image;
    productImg.setAttribute("width", "100%");
    productImg.alt = product.name;
    orderQuantity.appendChild(productImg);
    coloumnTextDiv.appendChild(orderQuantity);
    // Create the product labels
    const productNameLabel = document.createElement("label");
    productNameLabel.textContent = `Clothe Name: ${getRandomValue(
      randomNames
    )}`;
    coloumnlabelDiv.appendChild(productNameLabel);

    const productSizeLabel = document.createElement("label");
    productSizeLabel.textContent = `Size: ${getRandomValue(randomSizes)}`;
    coloumnlabelDiv.appendChild(productSizeLabel);

    const productColorLabel = document.createElement("label");
    productColorLabel.textContent = `Color: ${getRandomValue(randomColors)}`;
    coloumnlabelDiv.appendChild(productColorLabel);

    const productQuantityLabel = document.createElement("label");
    productQuantityLabel.textContent = `Quantity: ${product.quantity}`;
    coloumnlabelDiv.appendChild(productQuantityLabel);
    coloumnTextDiv.appendChild(coloumnlabelDiv);

    coloumnDiv.appendChild(coloumnTextDiv);
    // Append the product column to the container
    container.appendChild(coloumnDiv);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadOrders();
});
