const stores = require("../stores.json")
const fs = require("fs")

const categories = [];
stores.forEach((store) => {
  if (!categories.includes(store.category)) {
    categories.push(store.category)
  }
})

fs.writeFileSync("categories.json", JSON.stringify(categories));