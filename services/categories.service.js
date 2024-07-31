const { faker } = require("@faker-js/faker")

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

  create(data) {
    const category = {
      id: faker.string.uuid(),
      ...data
    }

    this.categories.push(category)
    return category
  }

  find() {
    return this.categories
  }

  findOne(id) {
    return this.categories.find((category) => category.id === id)
  }

  update(categoryChanges, id) {
    const index = this.categories.findIndex((category) => category.id === id)
    if (index === -1) {
      throw new Error('category not found')
    }

    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...categoryChanges
    }
    return this.categories[index]
  }

  delete(id) {
    const index = this.categories.findIndex((category) => category.id === id)
    if (index === -1) {
      throw new Error('category not found')
    }
    this.categories.splice(index, 1)
    return { id }
  }
}

module.exports = CategoriesService
