export default class ProductData {
    constructor(category) {
        this.category = category;
    }

    async getData(category = this.category) {
        this.category = category;
        const response = await fetch(`/json/${category}.json`);
        if (!response.ok) {
            throw new Error(`Unable to load products for ${category}.`);
        }
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            throw new Error(`No product data is available for ${category}.`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : data.Result || [];
    }

    async findProductById(id) {
        const products = await this.getData();
        return products.find((product) => product.Id === id);
    }
}
