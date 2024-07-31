class CategoriesService {
  constructor() {
    this.categories = []
    this.generate()
  }

  generate() {
    this.categories = [
      {
        id: "1",
        name: "Tecnology"
      },
      {
        id: "2",
        name: "Home"
      },
      {
        id: "3",
        name: "Travel"
      }
    ]
  }

  find() {
    return this.categories
  }

  findOne(id) {
    return this.categories.find((category) => category.id === id)
  }

  update(categoryToUpdate, id) {
    if (!this.categories.find((category) => category.id === id)) {
      return
    }

    this.categories = this.categories.map((category) => category.id === id ? categoryToUpdate : category)
    return this.categories.find((category) => category.id === id)
  }

  delete(id) {

  }
}

module.exports = CategoriesService
