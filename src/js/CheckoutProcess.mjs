import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = (getLocalStorage(this.key) || []).filter(
      (item) => item?.Id && item?.Name && Number.isFinite(Number(item.FinalPrice))
    );
    localStorage.setItem(this.key, JSON.stringify(this.list));
    this.displayItemSubtotal();
    this.calculateOrderTotal();
  }

  displayItemSubtotal() {
    const itemList = document.querySelector(this.outputSelector);
    if (!this.list || this.list.length === 0) {
      itemList.innerHTML = '<li>No items in cart.</li>';
      return;
    }
    const htmlItems = this.list.map(
      (item) => `<li class="cart-card divider">
        <img src="${item.Image || item.Images?.PrimaryMedium || ''}" alt="${item.Name}" />
        <h2>${item.Name}</h2>
        <p>qty: ${item.Quantity || 1} &times; $${item.FinalPrice}</p>
      </li>`
    );
    itemList.innerHTML = htmlItems.join('');
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0
    );
    document.querySelector('#subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    const quantity = this.list.reduce((sum, item) => sum + (item.Quantity || 1), 0);
    this.shipping = quantity > 0 ? 10 + (quantity - 1) * 2 : 0;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    document.querySelector('#shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector('#tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector('#order-total').textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  packageItems() {
    return this.list.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.Quantity || 1,
    }));
  }

  async checkout(form) {
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      const payload = {
        orderDate: new Date().toISOString(),
        fname: data.fname,
        lname: data.lname,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        cardNumber: data.cardNumber,
        expiration: data.expiration,
        code: data.code,
        items: this.packageItems(),
        orderTotal: this.orderTotal.toFixed(2),
        shipping: this.shipping,
        tax: this.tax.toFixed(2),
      };
      const services = new ExternalServices();
      await services.checkout(payload);
      localStorage.removeItem(this.key);
      window.location.href = './success.html';
    } catch (err) {
      const errorElement = document.querySelector('#checkout-error');
      const message = err?.message;
      errorElement.textContent =
        typeof message === 'string' ? message : JSON.stringify(message || err);
    }
  }
}