import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId =
    getParam('product') || document.getElementById('addToCart')?.dataset.id;
const category = getParam('category') || 'tents';
const dataSource = new ExternalServices(category);

const product = new ProductDetails(productId, dataSource);
loadHeaderFooter()
    .then(() => product.init())
    .catch((error) => console.error(error));