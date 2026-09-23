async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  }
  throw { name: 'servicesError', message: jsonResponse };
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData() {
    const response = await fetch(this.path);
    const data = await convertToJson(response);
    return Array.isArray(data) ? data : data.Result || [];
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      'http://wdd330-backend.onrender-osp8.com/checkout',
      options
    );
    return convertToJson(response);
  }
}