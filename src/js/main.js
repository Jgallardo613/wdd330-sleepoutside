import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ExternalServices('tents');
const listElement = document.querySelector('.product-list');

const productList = new ProductList('tents', dataSource, listElement);
productList.init();