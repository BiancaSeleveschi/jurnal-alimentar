let products =   [{
    title: 'Mozzarella',
    calories: 212,
    price: 7,
    isExpired: false,
    category: 'Branzeturi',
    fabricationYear: 2022,
    isFavorite: false,
}, {
    title: 'Ciocolata',
    calories: 500,
    price: 8,
    isExpired: false,
    category: 'Dulce',
    fabricationYear: 2018,
    isFavorite: false,
}, {
    title: 'Inghetata',
    calories: 565,
    price: 10,
    isExpired: false,
    category: 'Dulce',
    fabricationYear: 2022,
    isFavorite: false,
}, {
    title: 'Lapte',
    calories: 62,
    price: 6,
    isExpired: false,
    category: 'Lactate',
    fabricationYear: 2023,
    isFavorite: false,
}, {
    title: 'Dovlecel',
    calories: 12,
    price: 4,
    isExpired: false,
    category: 'Legume',
    fabricationYear: 2023,
    isFavorite: true,
}, {
    title: 'Kiwi',
    calories: 61,
    price: 8,
    isExpired: false,
    category: 'Fructe',
    fabricationYear: 2023,
    isFavorite: true,
}, {
    title: 'Portocale',
    calories: 47,
    price: 6,
    isExpired: false,
    category: 'Fructe',
    fabricationYear: 2023,
    isFavorite: true,
}, {
    title: 'Brocoli',
    calories: 34,
    price: 9,
    isExpired: false,
    category: 'Legume',
    fabricationYear: 2023,
    isFavorite: true,
}, {
    title: 'Conopida',
    calories: 25,
    price: 13,
    isExpired: false,
    category: 'Legume',
    fabricationYear: 2023,
    isFavorite: false,
}]

// products = localStorage.getItem("products") ? localStorage.getItem("products") : products
// localStorage.setItem("products", JSON.stringify(products))
if(localStorage.getItem("products")){
    products = JSON.parse(localStorage.getItem('products')) || [];
}else{
    localStorage.setItem("products", JSON.stringify(products))
}


// const productsFromLS = localStorage.getItem("products")
// console.log(productsFromLS)


let tbody = document.getElementById("products-tbody");

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
        insertProduct(products[i]);
    }
    totalPriceSpan.innerHTML = computeTotalPrice();
    totalCaloriesSpan.innerHTML = computeTotalCalories();
    // favoriteProductsSpan.innerHTML = getFavoriteProductsTitles();
    allCategoriesSpan.innerHTML = getAllCategories();
    // prodWithMinPriceSpan.innerHTML = getProductWithMinPrice();
    mostUsedCategorySpan.innerHTML = getMostUsedCategory();
}


function computeTotalPrice() {
    let sum = 0;
    let str;
    for (let i = 0; i < products.length; i++) {
        sum += products[i].price;
        // str = sum.toString()
    }
    return sum;
}


function computeTotalCalories() {
    let sum = 0;
    let str;
    for (let i = 0; i < products.length; i++) {
        sum += products[i].calories;
        str = sum.toString()
    }
    return str;
}


// function getFavoriteProductsTitles() {
//     let res = [];
//     let contor = 0;
//     for (let i = 0; i < products.length; i++) {
//         if (products[i].isFavorite === true) {
//             res[contor++] = products[i].title;
//         }
//     }
//     return res;
// }

function storeFavoriteProducts() {
    document.cookie = "most-wanted-products=" + JSON.stringify(getFavoriteProductsTitles());
}

function getAllCategories() {
    let array = [];
    for (let i = 0; i < products.length; i++) {
        if (!array.includes(products[i].category)) {
            array.push(products[i].category);
        }
    }
    return array.toString();
}


function getProductWithMinPrice() {
    let productsList = products.sort(sortByPrice)
    return productsList[0].title
}


function getMostUsedCategory() {
    let counts = {};
    let mostUsedCategory;
    let maxCount = 0;
    for (let i = 0; i < products.length; i++) {
        let category = products[i].category;
        counts[category] = (counts[category] || 0) + 1;
        if (counts[category] > maxCount) {
            mostUsedCategory = category;
            maxCount = counts[category];
        }
    }
    return mostUsedCategory;
}


function insertProduct(product) {
    let newRow = document.createElement("tr");

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
    deleteTd.innerHTML = `<button class="delete-button" onclick = deleteProduct(this)>Sterge</button>`;
    newRow.appendChild(deleteTd);

    let favoriteTd = document.createElement("td");
    if (product.isFavorite) {
        favoriteTd.innerHTML = `<button class="favorite-button" onclick = markFavoriteProduct(this)>Sterge favorit</button>`;
    } else {
        favoriteTd.innerHTML = `<button class="notfavorite-button" onclick = markFavoriteProduct(this)>Adauga favorit</button>`;
    }
    newRow.appendChild(favoriteTd);

    tbody.appendChild(newRow);
}


function deleteProduct(buttonElement, title) {
    let trow = buttonElement.parentNode.parentNode;
    tbody.removeChild(trow)
    let index = products.findIndex((product) => product.title === title)
    if (index !== -1) {
        products.splice(index, 1);
    }
    localStorage.setItem('products', JSON.stringify(products));
}


filterButton.addEventListener("click", filterProducts);

function filterProducts() {
    tbody.innerHTML = "";
    let searchTitle = titleFilterInput.value.toLowerCase();
    let searchCategory = categoryFilterInput.value.toLowerCase();
    let searchMinPrice = minPriceFilterInput.value;
    let searchMaxPrice = maxPriceFilterInput.value;
    let searchMinCalories = minCaloriesFilterInput.value;
    let searchMaxCalories = maxCaloriesFilterInput.value;
    for (let i = 0; i < products.length; i++) {
        let title = products[i].title.toLowerCase();
        let category = products[i].category.toLowerCase();
        if (title.includes(searchTitle) && category.includes(searchCategory) &&
            ((products[i].price >= searchMinPrice && products[i].price <= searchMaxPrice) ||
                (searchMinPrice === "" || searchMaxPrice === '')) && ((products[i].calories >= searchMinCalories &&
                products[i].calories <= searchMaxCalories) || (searchMinCalories === "" || searchMaxCalories === ''))) {
            insertProduct(products[i]);
        }
    }
}

function sortProductsByPrice() {
    products.sort(sortByPrice);
    displayProducts();
}

function sortByPrice(a, b) {
    return a.price - b.price;
}

priceSortButton && priceSortButton.addEventListener("click", sortProductsByPrice);


function sortProductsByCalories() {
    products.sort(function (a, b) {
        return a.calories - b.calories;
    });
    displayProducts();
}

caloriesSortButton && caloriesSortButton.addEventListener("click", sortProductsByCalories);


function sortProductsByCategory() {
    products.sort(function (a, b) {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    })
    displayProducts();
}

categorySortButton && categorySortButton.addEventListener("click", sortProductsByCategory)


function markFavoriteProduct(buttonElement) {
    let tr = buttonElement.parentNode.parentNode;
    let productTitle = tr.cells[0].innerHTML;
    let productIndex = getProductIndexByTitle(productTitle);
    products[productIndex].isFavorite = !products[productIndex].isFavorite
    displayProducts();
}


function getProductIndexByTitle(productTitle) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].title === productTitle) {
            return i;
        }
    }
}


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

// tbody && displayProducts()


function getFavoriteProductsTitles() {
    let res = [];
    let contor = 0;
    return products.filter((p) => p.isFavorite)
    // for (let i = 0; i < products.length; i++) {
    //     if (products[i].isFavorite === true) {
    //         res[contor++] = products[i].title;
    //     }
    // }
    // return res.toString();
    // ;
}

// favoriteProductsSpan.innerHTML = getFavoriteProductsTitles();
tbody && displayProducts()