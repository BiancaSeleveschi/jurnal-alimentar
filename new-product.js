import { products } from './script.js';

let titleInput, categoryInput, caloriesInput, priceInput, button;

window.addEventListener('DOMContentLoaded', () => {
    titleInput = document.getElementById("title-input");
    categoryInput = document.getElementById("category-input");
    caloriesInput = document.getElementById("calories-input");
    priceInput = document.getElementById("price-input");
    button = document.getElementById("create-button");

    button && button.addEventListener("click", addProduct);
});

export function addProduct() {
    let product = {
        title: titleInput.value,
        category: categoryInput.value,
        calories: caloriesInput.value,
        price: priceInput.value
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}
