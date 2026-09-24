import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const category = 'tents';
const dataSource = new ProductData(category);
const listElement = document.querySelector('.product-list');

loadHeaderFooter().catch((error) => console.error(error));
new ProductList(category, dataSource, listElement).init();
