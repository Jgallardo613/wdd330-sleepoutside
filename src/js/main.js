import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';
import './newsletter.js';
import Alert from './Alert.js';

loadHeaderFooter().catch((error) => console.error(error));

const dataSource = new ProductData('tents');
const listElement = document.querySelector('.product-list');

const productList = new ProductList('tents', dataSource, listElement);
productList.init();

const alert = new Alert();
alert.init();
