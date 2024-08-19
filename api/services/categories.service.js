const { faker } = require("@faker-js/faker")
const boom = require('@hapi/boom')

class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    this.categories = [
      {
        id: faker.string.uuid(),
        name: "Tecnology"
      },
      {
        id: faker.string.uuid(),
        name: "Home"
      },
      {
        id: faker.string.uuid(),
        name: "Travel"
      }
    ]
  }

  async create(data) {
    if (Object.keys(data).length === 0) {
      throw boom.badData("no category to create")
    }
    const category = {
      id: faker.string.uuid(),
      ...data
    }

    this.categories.push(category)
    return category
  }

  async find() {
    return this.categories
  }

  async findOne(id) {
    const category = this.categories.find((category) => category.id === id)
    if (!category) {
      throw boom.notFound('category not found')
    }

    return category
  }

  async update(categoryChanges, id) {
    const index = this.categories.findIndex((category) => category.id === id)
    if (index === -1) {
      throw boom.notFound('category not found')
    }

    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...categoryChanges
    }
    return this.categories[index]
  }

  async delete(id) {
    const index = this.categories.findIndex((category) => category.id === id)
    if (index === -1) {
      throw boom.notFound('category not found')
    }
    this.categories.splice(index, 1)
    return { id }
  }
}

module.exports = CategoriesService
