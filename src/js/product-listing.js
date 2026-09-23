import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import './newsletter.js';

const category = getParam('category') || 'tents';
const categoryName = category
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

document.title = `Top Products: ${categoryName}`;

const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);

loadHeaderFooter()
  .then(() => productList.init())
  .catch((error) => console.error(error));
