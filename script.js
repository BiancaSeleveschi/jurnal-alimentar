let products = [
  {
    title: 'Mozzarella',
    calories: 212,
    price: 5,
    isExpired: false,
    category: 'chesse',
    fabricationYear: 2022,
    isFavorite: true,
  },
  {
    title: 'Chocolate',
    calories: 500,
    price: 8,
    isExpired: false,
    category: 'sweets',
    fabricationYear: 2018,
    isFavorite: false,
  },
  {
    title: 'ice-cream',
    calories: 565,
    price: 10,
    isExpired: false,
    category: 'sweets',
    fabricationYear: 2022,
    isFavorite: false,
  },
  {
    title: 'Milk',
    calories: 62,
    price: 6,
    isExpired: false,
    category: 'dairy products',
    fabricationYear: 2022,
    isFavorite: true,
  }
]


let tbody = document.getElementById("products-tbody");

let titleInput = document.getElementById("title-input");
let categoryInput = document.getElementById("category-input");
let caloriesInput = document.getElementById("calories-input");
let priceInput = document.getElementById("price-input");
let button = document.getElementById("create-button");

let priceSortButton = document.getElementById("price-sort-button");
let caloriesSortButton = document.getElementById("calories-sort-button");
let categorySortButton = document.getElementById("category-sort-button");

let categoryFilterInput = document.getElementById("category-filter-input");
let titleFilterInput = document.getElementById("title-filter-input");
let minPriceFilterInput = document.getElementById("min-price-filter-input");
let maxPriceFilterInput = document.getElementById("max-price-filter-input");
let minCaloriesFilterInput = document.getElementById("min-calories-filter-input");
let maxCaloriesFilterInput = document.getElementById("max-calories-filter-input");
let filterButton = document.getElementById("filter-button");

let totalPriceSpan = document.getElementById("total-price-span");
let totalCaloriesSpan = document.getElementById("total-calories-span");
let favoriteProductsSpan = document.getElementById("favorite-products-span");
let allCategoriesSpan = document.getElementById("all-categories-span");
let prodWithMinPriceSpan = document.getElementById("name-min-price-span");
let mostUsedCategorySpan = document.getElementById("most-used-category-span");


function displayProducts() {
  tbody.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    insertProductInTable(products[i]);
  }
  totalPriceSpan.innerHTML = computeTotalPrice();
  totalCaloriesSpan.innerHTML = computeTotalCalories();
  favoriteProductsSpan.innerHTML = getFavoriteProductsTitles();
  allCategoriesSpan.innerHTML = getAllCategories();
  prodWithMinPriceSpan.innerHTML = getProductsDetailsWithMinPrice();
  mostUsedCategorySpan.innerHTML = getMostUsedCategory();
}


function computeTotalPrice() {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum;
}

//b.
function computeTotalCalories() {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].calories;
  }
  return sum;
}

//c.
function getFavoriteProductsTitles() {
  let res = [];
  let contor = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].isFavorite === true) {
      res[contor++] = products[i].title;
    }
  }
  return res;
}

//d.
function getAllCategories() {
  let array = [];
  for (let i = 0; i < products.length; i++) {
    if (!array.includes(products[i].category)) {
      array.push(products[i].category);
    }
  }
  return array;
}

//e.
function getProductsDetailsWithMinPrice() {
  let min = Number.MAX_SAFE_INTEGER;
  let minPriceProduct = {};
  for (let i = 0; i < products.length; i++) {
      minPriceProduct = {
      name: products[i].title,
      price: min,
    }
    if (products[i].price < min) {
      min = products[i].price;
    }
  }
  return minPriceProduct;
}

//f.
function getMostUsedCategory() {
  let category1 = "cheese";
  let category2 = "sweets";
  let category3 = "dairy products";
  let contor1 = 0;
  let contor2 = 0;
  let contor3 = 0;
  let res1;
  let res2;
  let res3;
  for (let i = 0; i < products.length; i++) {
    if (products[i].category === category1) {
      res1 = products[i].category;
      contor1++;
    }
    if (products[i].category === category2) {
      res2 = products[i].category;
      contor2++;
    }
    if (products[i].category === category3) {
      res3 = products[i].category;
      contor3++;
    }
  }
  if (contor1 > contor2 && contor1 > contor3) {
    return res1;
  }
  if (contor2 > contor1 && contor2 > contor3) {
    return res2;
  }
  if (contor3 > contor2 && contor3 > contor1) {
    return res3;
  }
}


function insertProductInTable(product) {

  let newRow = document.createElement("tr");
  let n = Number.MAX_SAFE_INTEGER;

  let newTitleTd = document.createElement("td");
  newTitleTd.innerHTML = product.title;
  newRow.appendChild(newTitleTd);

  let newCategoryTd = document.createElement("td");
  newCategoryTd.innerHTML = product.category;
  newRow.appendChild(newCategoryTd);

  let newCaloriesTd = document.createElement("td");
  newCaloriesTd.innerHTML = product.calories;
  newRow.appendChild(newCaloriesTd);

  let newPriceTd = document.createElement("td");
  newPriceTd.innerHTML = product.price;
  newRow.appendChild(newPriceTd);

  let deleteTd = document.createElement("td")
  deleteTd.innerHTML = `<button onclick = deleteProduct(this)>Delete</button>`;
  newRow.appendChild(deleteTd);

  let favoriteTd = document.createElement("td");
  if (product.isFavorite) {
    favoriteTd.innerHTML = `<button class="favorite-button" onclick = markFavoriteProduct(this)>Sterge favorit</button>`;
  }
  else {
    favoriteTd.innerHTML = `<button class="notfavorite-button" onclick = markFavoriteProduct(this)>Adauga favorit</button>`;
  }
  newRow.appendChild(favoriteTd);

  tbody.appendChild(newRow);
}


function addProduct() {
  let product = {};
  product.title = titleInput.value;
  product.category = categoryInput.value;
  product.calories = caloriesInput.value;
  product.price = priceInput.value;

  products[products.length] = product;
  insertProductInTable(product);
}
button.addEventListener("click", addProduct);


function deleteProduct(buttonElement) {
  let trow = buttonElement.parentNode.parentNode;
  tbody.removeChild(trow)
}


//i.
function filterProducts() {
  tbody.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].category === categoryFilterInput.value) {
      insertProductInTable(products[i]);
    }
    if (products[i].title === titleFilterInput.value) {
      insertProductInTable(products[i]);
    }
    if (products[i].price >= minPriceFilterInput.value && products[i].price <= maxPriceFilterInput.value) {
      insertProductInTable(products[i]);
    }
    if (products[i].calories >= minCaloriesFilterInput.value && products[i].calories <= maxCaloriesFilterInput.value) {
      insertProductInTable(products[i]);
    }
  }
}
filterButton.addEventListener("click", filterProducts);


function sortProductsByPrice() {
  products.sort(sortByPrice);
  displayProducts();
}

function sortByPrice(prod1, prod2) {
  if (prod1.price > prod2.price) {
    return 1;
  }
  if (prod1.price < prod2.price) {
    return -1;
  }
  return 0;
}
priceSortButton.addEventListener("click", sortProductsByPrice);


//g.
function sortProductsByCalories() {
  products.sort(sortByCalories);
  displayProducts();
}

function sortByCalories(prod1, prod2) {
  if (prod1.calories > prod2.calories) {
    return 1;
  }
  if (prod1.calories < prod2.calories) {
    return -1;
  }
  return 0;
}
caloriesSortButton.addEventListener("click", sortProductsByCalories);


//h. 
function sortProductsByCategory() {
  products.sort(sortByCategory)
  displayProducts();
}

function sortByCategory(p1, p2) {
  if (p1.category > p2.category) {
    return 1;
  }
  if (p1.category < p2.category) {
    return -1;
  }
  return 0;
}
categorySortButton.addEventListener("click", sortProductsByCategory)


function markFavoriteProduct(buttonElement) {
  let tr = buttonElement.parentNode.parentNode;
  let productTitle = tr.cells[0].innerHTML;
  let productIndex = getProductIndexByTitle(productTitle);
  products[productIndex].isFavorite = !products[productIndex].isFavorite
  displayProducts();
}

function getProductByTitle(productTitle) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === productTitle) {
      return products[i];
    }
  }
}

function getProductIndexByTitle(productTitle) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].title === productTitle) {
      return i;
    }
  }
}


//a.
function removeProductByArray() {
  let productTitle = tr.cells[0].innerHTML;
  let productIndex = getProductIndexByTitle(productTitle);
}

function removeProduct() {
  for (let i = 0; i < products.length; i++) {
    products[i] = products[i + 1];
  }
  products.length--;
}


//r.
function storeFavoriteProducts() {
  document.cookie = "favorite-products=" + JSON.stringify(getFavoriteProductsTitles());
}

displayProducts()