export default class ProductData {
  constructor() {
    this.baseURL = import.meta.env.VITE_SERVER_URL;
  }

  async getData(category) {
    const response = await fetch(`${this.baseURL}products/search/${category}`);
    if (!response.ok) {
      throw new Error(`Unable to load products: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${this.baseURL}product/${id}`);
    if (!response.ok) {
      throw new Error(`Unable to load product: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.Result;
  }
}
