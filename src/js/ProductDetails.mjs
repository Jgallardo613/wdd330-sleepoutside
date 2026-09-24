import { alertMessage, getLocalStorage, renderBreadcrumb, setLocalStorage } from './utils.mjs';
import { initComments } from './Comments.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Comments only need the product id, so show them first.
    // This way they appear even if loading the product data fails.
    initComments(this.productId, document.querySelector('#comments'));

    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      throw new Error(`Product ${this.productId || 'not found'} could not be loaded.`);
    }
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cart = (getLocalStorage('so-cart') || []).filter(Boolean);
    const existingItem = cart.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      existingItem.Quantity = (existingItem.Quantity || 1) + 1;
    } else {
      this.product.Quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage('so-cart', cart);
    alertMessage('Product added to cart!');
  }

  renderProductDetails() {
    const image = this.product.Images?.PrimaryLarge || this.product.Image;
    const color = this.product.Colors?.[0]?.ColorName || 'Color not specified';
    renderBreadcrumb(document.querySelector('.breadcrumb'), this.dataSource.category);
    document.querySelector('.product-detail h3').textContent = this.product.Brand.Name;
    document.querySelector('.product-detail h2').textContent = this.product.NameWithoutBrand;
    document.querySelector('.product-detail img').src = image;
    document.querySelector('.product-detail img').alt = this.product.Name;
    document.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
    document.querySelector('.product__color').textContent = color;
    document.querySelector('.product__description').innerHTML = this.product.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = this.product.Id;
  }
}
