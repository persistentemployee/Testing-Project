function getCart() {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
}

let cart = getCart();

function loadCartPage() {
  const mainContent = document.getElementById("cart-items");
  if (mainContent)
    mainContent.innerHTML = '<div class="loading">Loading cart...</div>';
  renderCart();
}

function addToCart(product, quantity) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cartPrinceContainer = document.getElementById("cart-price-summary");
  const cartItemsContainer = document.getElementById("cart-items");
  const accordianItemsContainer = document.getElementById(
    "accordion-containers"
  );
  const cart = getCart();
  if (!cart.length) {
    setEmptyPage();
  } else {
    if (cartPrinceContainer) cartPrinceContainer.style.display = "block";
    if (accordianItemsContainer)
      accordianItemsContainer.style.display = "block";
    const cartItemsHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="item-image">
          <img src="${item.image}" alt="${item.title}">
                  <div class="item-details">
                    <h2 class="product-des">${item.title}</h2>
                    <p>Size: Medium</p>
                    <p>Color: Storm</p>
                    <p>$${item.price}</p>
                </div>
        </div>
       <div class="cartItemContainer">

                <div class="quantity-increase">
                <button onclick="decQuantity(${item.id})" id="subtract-quantity" class="btn-qcontrol">-</button>
                    <span class="quantity" class="btn-control" id="btn-cards">${item.quantity}</span>
                    <button onclick="increaseItemQuantity(${item.id})"  id="add-quantity" class="btn-qcontrol">+</button>
                            </div>   
               </div>   
        <div class="savelater">
                    <p><i class="fa-solid fa-pen-to-square"></i> Edit Item</p>
                    <p onclick="removeFromCart(${item.id})" ><i  class="fa-solid fa-trash-can"></i> Remove</p>
                   <p> <i class="fa-regular fa-heart"></i> Save for later </p>
                <!-- <a href="#" class="edit-link">Edit</a>
                <a href="#" class="save-link">Save</a> -->
            </div>
      </div>
    `
      )
      .join("");
    if (cartItemsContainer)
      cartItemsContainer.innerHTML = `<div class="cart">${cartItemsHTML}</div>`;
  }
}

function renderPriceDetails() {
  const cartItemsContainer = document.getElementById("cart-price-summary");
  const cart = getCart();
  if (!cart.length) return;
  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const priceDetails = `<h3  style="font-weight: 100;">Price Summary</h3>
      <div class="summary-item">
          <span>Subtotal</span>
          <span id="subtotal">$${totalPrice}</span>
      </div>
      <div class="summary-item">
          <span>Coupon</span>
          <span id="subtotal">- $77.60</span>
      </div>
      <div class="summary-item">
          <span>Gift Card</span>
          <span id="subtotal">- $100.00</span>
      </div>
      <div class="summary-item">
          <span>Estimated Tax</span>
          <span id="subtotal">$23.28</span>
      </div>
      <div class="summary-item">
          <span>Estimated Shipping</span>
          <span id="subtotal">Free</span>
      </div>
      <div class="summary-item">
          <span class="total">Estimated Total</span>
          <span id="subtotals">$233.68</span>
      </div>
              <button id="price" onclick="onClickCheckout()"><i class="fa-solid fa-lock"></i> &nbsp;CHECKOUT</button>
            <button id="paypal"><i class="fa-brands fa-paypal"></i> &nbsp;Paypal</button>`;
  if (cartItemsContainer) cartItemsContainer.innerHTML = priceDetails;
}

window.removeFromCart = function (productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  if (!cart.length) {
    setEmptyPage();
    return;
  }
  renderCart();
};

window.addEventListener("DOMContentLoaded", () => {
  loadCartPage();
  renderPriceDetails();
});

function onClickCheckout() {
  window.location.href = "checkout-contact-info.html";
}

function increaseItemQuantity(id) {
  const indexToUpdate = cart.findIndex((item) => item.id === id);
  let currentQuantity = cart[indexToUpdate].quantity;
  if (currentQuantity >= 10) return;
  cart.splice(indexToUpdate, 1, {
    ...cart[indexToUpdate],
    quantity: ++currentQuantity,
  });
  saveCart(cart);
  renderCart();
}

function decQuantity(id) {
  const indexToUpdate = cart.findIndex((item) => item.id === id);
  let currentQuantity = cart[indexToUpdate].quantity;
  if (currentQuantity <= 1) return;
  cart.splice(indexToUpdate, 1, {
    ...cart[indexToUpdate],
    quantity: --currentQuantity,
  });
  saveCart(cart);
  renderCart();
}

function saveCart(updatedCart) {
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

function setEmptyPage() {
  const cartPrinceContainer = document.getElementById("cart-price-summary");
  const cartItemsContainer = document.getElementById("cart-items");
  const accordianItemsContainer = document.getElementById(
    "accordion-containers"
  );
  cartItemsContainer.innerHTML = "<p>Cart is Empty</p>";
  cartPrinceContainer.style.display = "none";
  accordianItemsContainer.style.display = "none";
}

function resetCart() {
  cart = [];
  localStorage.clear();
  window.location.href = "home-page.html";
}
