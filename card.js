
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
