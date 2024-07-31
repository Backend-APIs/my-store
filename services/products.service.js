const { faker } = require('@faker-js/faker')

class ProductsService {

  /* For now we're going to manage this in memory, afterwards we'll add persistence with PostgreSQL,
  but the good thing about services is that it doesn't matter where you persist the data.
  */
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
      })
    }
  }

  create() {

  }

  find() {
    return this.products
  }

  findOne(id) {
    return this.products.find((product) => product.id === id)
  }

  update(productToUpdate, id) {
    if (!this.products.find((product) => product.id === id)) {
      return
    }

    this.products = this.products.map((product) => product.id === id ? productToUpdate : product)
    return this.products.find((product) => product.id === id)
  }

  delete() {

  }

}

module.exports = ProductsService
