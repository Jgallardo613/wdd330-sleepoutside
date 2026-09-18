import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getCartItems();
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML =
    htmlItems.join('') || '<li class="cart-empty">Your cart is empty.</li>';
}

function getCartItems() {
  try {
    const cartItems = getLocalStorage('so-cart');
    return Array.isArray(cartItems) ? cartItems : [];
  } catch {
    return [];
  }
}

function removeCartItem(productId) {
  const updatedCart = getCartItems().filter((item) => item.Id !== productId);
  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="cart-card__remove" type="button" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">X</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

document.querySelector('.product-list').addEventListener('click', (event) => {
  const removeButton = event.target.closest('.cart-card__remove');
  if (removeButton) {
    removeCartItem(removeButton.dataset.id);
  }
});

renderCartContents();
