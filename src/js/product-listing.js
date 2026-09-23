import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

const category = getParam('category') || 'tents';
const categoryName = category
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

document.title = `Top Products: ${categoryName}`;

const dataSource = new ExternalServices(category);
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);

loadHeaderFooter()
  .then(() => productList.init())
  .catch((error) => console.error(error));