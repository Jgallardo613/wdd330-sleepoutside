console.log("Main script loaded");

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import "./newsletter.js";

const productList = new ProductList("tents", new ProductData(), document.getElementById("product-list"));
const productData = new ProductData();
