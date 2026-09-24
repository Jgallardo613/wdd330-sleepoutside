import { renderBreadcrumb, renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product, category) {
  const image = product.Images?.PrimaryMedium || product.Image;
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}&category=${category}">
      <img src="${image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(
      (product) => productCardTemplate(product, this.category),
      this.listElement,
      list
    );
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      renderBreadcrumb(breadcrumb, this.category, list.length);
    }
  }
}