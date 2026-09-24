import { getLocalStorage, loadHeaderFooter, setLocalStorage } from './utils.mjs';

loadHeaderFooter().catch((error) => console.error(error));

function renderCartContents() {
  const storedItems = getLocalStorage('so-cart') || [];
  const cartItems = storedItems.filter(isValidCartItem);
  if (cartItems.length !== storedItems.length) {
    setLocalStorage('so-cart', cartItems);
  }
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  const cartFooter = document.querySelector('.cart-footer');

  if (cartItems.length > 0) {
    cartFooter.classList.remove('hide');

    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice) * (item.Quantity || 1),
      0
    );
    
    document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add('hide');
  }
}

function isValidCartItem(item) {
  return Boolean(
    item?.Id && item?.Name && Number.isFinite(Number(item.FinalPrice))
  );
}

function cartItemTemplate(item, index) {
  item = item || {};
  const image = item.Image || item.Images?.PrimaryMedium || '';
  const name = item.Name || 'Unknown product';
  const color = item.Colors?.[0]?.ColorName || 'Color not specified';
  const price = item.FinalPrice ?? '0.00';
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${image}"
      alt="${name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${name}</h2>
  </a>
  <p class="cart-card__color">${color}</p>
  <div class="cart-card__quantity">
    <span>qty: ${item.Quantity || 1}</span>
    <button class="cart-card__quantity-button" type="button" data-action="increase" data-index="${index}" aria-label="Increase quantity">+</button>
    <button class="cart-card__quantity-button" type="button" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">-</button>
  </div>
  <p class="cart-card__price">$${price}</p>
  <button class="cart-card__remove" type="button" data-index="${index}">Remove</button>
</li>`;

  return newItem;
}

document.querySelector('.product-list').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) {
    return;
  }

  const cartItems = (getLocalStorage('so-cart') || []).filter(isValidCartItem);
  const itemIndex = Number(button.dataset.index);
  if (!Number.isInteger(itemIndex) || itemIndex < 0 || itemIndex >= cartItems.length) {
    return;
  }

  if (button.classList.contains('cart-card__remove')) {
    cartItems.splice(itemIndex, 1);
  } else if (button.classList.contains('cart-card__quantity-button')) {
    const item = cartItems[itemIndex] || {};
    const currentQuantity = Number(item.Quantity) || 1;
    item.Quantity = button.dataset.action === 'increase'
      ? currentQuantity + 1
      : Math.max(1, currentQuantity - 1);
    cartItems[itemIndex] = item;
  } else {
    return;
  }

  setLocalStorage('so-cart', cartItems);
  renderCartContents();
});

renderCartContents();