const { faker, da } = require('@faker-js/faker')

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

  create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return this.products
  }

  findOne(id) {
    return this.products.find((product) => product.id === id)
  }

  update(productToUpdate, id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }

    this.products[index] = productToUpdate
    return this.products[index]
  }

  patch(productChanges, id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }

    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...productChanges
    }
    return this.products[index]
  }

  delete(id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }

    this.products.splice(index, 1)
    return { id }
  }

}

module.exports = ProductsService
