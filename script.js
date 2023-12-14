/* ----- BASE ------ */
"use strict";

// get required selectors to maniplute menu toggle
const navbar = document.querySelector(".navbar");
const menuTogglersContainer = document.querySelector(".menu-togglers");
const bxMenu = document.querySelector(".bx-menu");

/* -- show/hide menu -- */
menuTogglersContainer.addEventListener("click", () => {
  // if navbar tag have show-nav in as class
  navbar.classList.toggle("show-nav");
});

/* ================================================ */

/* -------- theme changing -------- */
const themeTogglers = document.querySelector(".theme-togglers");
const lightIcon = document.querySelector(".bxs-sun");
const darkIcon = document.querySelector(".bxs-moon");

var lightmode = localStorage.getItem("lightmode");

// enable dark mode function
const enableLightMode = () => {
  // add class dark mode to the body
  document.body.classList.add("lightmode");
  localStorage.setItem("lightmode", "enabled");
  // change theme toggle styles
  lightIcon.style.display = "none";
  darkIcon.style.display = "block";
};

if (lightmode && lightmode === "enabled") {
  enableLightMode();
}

// disable dark mode function
const disableLightMode = () => {
  // remove class dark mode from the body
  document.body.classList.remove("lightmode");
  localStorage.setItem("lightmode", null);
  // change theme toggle styles
  lightIcon.style.display = "block";
  darkIcon.style.display = "none";
};

// active/deactive dark mode
themeTogglers.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  if (!lightmode || lightmode !== "enabled") {
    enableLightMode();
  } else {
    disableLightMode();
  }
});


/* -- hide show hero buttons -- */
// delay before showing them
const heroButtonsContainer = document.querySelector(".hero-btns-container");

var delayTime = 1000;

heroButtonsContainer.style.transition = "opacity 1000ms";

setTimeout(() => {
  heroButtonsContainer.style.opacity = 1;
}, delayTime);

// --- prevent form submission on contact section ---
const sendMsgButton = document.querySelector(".send-msg-btn");
sendMsgButton.addEventListener("click", (e) => {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-btn");

  const products = productList.querySelectorAll("li");

  products.forEach(product => {
      const addButton = product.querySelector(".add-to-cart");
      addButton.addEventListener("click", () => {
          addToCart(product);
      });
  });

  let cart = [];

  function addToCart(product) {
      const productId = product.dataset.id;
      const productName = product.dataset.name;
      const productPrice = parseFloat(product.dataset.price);

      const existingItem = cart.find(item => item.id === productId);

      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
      }

      updateCart();
  }

  function updateCart() {
      cartItems.innerHTML = "";
      let total = 0;

      cart.forEach(item => {
          const cartItem = document.createElement("li");
          cartItem.innerText = `${item.name} - Quantity: ${item.quantity} - Rs.${(item.price * item.quantity).toFixed(2)}`;
          cartItems.appendChild(cartItem);

          total += item.price * item.quantity;
      });

      cartTotal.innerText = total.toFixed(2);
  }

  checkoutButton.addEventListener("click", () => {
      alert("Thank you for your purchase!");
      cart = [];
      updateCart();
  });
});
