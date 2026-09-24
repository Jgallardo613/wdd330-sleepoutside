import CheckoutProcess from '../js/CheckoutProcess.mjs';

const checkout = new CheckoutProcess('so-cart', '.cart-item-list');
checkout.init();

document.querySelector('#zip').addEventListener('blur', () => {
  checkout.calculateOrderTotal();
});

document.querySelector('#checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.checkValidity()) {
    checkout.checkout(e.target);
  } else {
    e.target.reportValidity();
  }
});