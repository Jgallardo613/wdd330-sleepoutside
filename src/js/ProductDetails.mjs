import { getLocalStorage, renderBreadcrumb, setLocalStorage } from './utils.mjs';
import { initComments } from './Comments.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));

    // Comments subsystem: show and add comments for this product
    initComments(this.productId, document.querySelector('#comments'));
  }

  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    const existingItem = cart.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      existingItem.Quantity = (existingItem.Quantity || 1) + 1;
    } else {
      this.product.Quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    renderBreadcrumb(document.querySelector('.breadcrumb'), this.dataSource.category);
    document.querySelector('.product-detail h3').textContent = this.product.Brand.Name;
    document.querySelector('.product-detail h2').textContent = this.product.NameWithoutBrand;
    document.querySelector('.product-detail img').src = this.product.Images.PrimaryLarge;
    document.querySelector('.product-detail img').alt = this.product.Name;
    document.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
    document.querySelector('.product__color').textContent = this.product.Colors[0].ColorName;
    document.querySelector('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}