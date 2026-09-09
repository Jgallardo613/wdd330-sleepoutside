import ProductData from "./ProductData.mjs";
import ProductLists from "./ProductLists.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductLists("Tents", dataSource, element);

productList.init();