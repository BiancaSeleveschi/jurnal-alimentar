let titleInput = document.getElementById("title-input");
let categoryInput = document.getElementById("category-input");
let caloriesInput = document.getElementById("calories-input");
let priceInput = document.getElementById("price-input");
let button = document.getElementById("create-button");

function addProduct() {
    let products = JSON.parse(localStorage.getItem("products")) || []; // create an empty array if "products" doesn't exist in local storage
    let product = {
        title: titleInput.value,
        category: categoryInput.value,
        calories: caloriesInput.value,
        price: priceInput.value
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}
//Dupa apasarea butonului
//1 sa apara un alert de suucces ca s-a adaugat produsul sau de pericol ca a dat eroare si sa dispara dupa 5 sec
//2 sa fie curatate inputurile de textele introduse
button && button.addEventListener("click", addProduct);
// localStorage.setItem("products", JSON.stringify(products))

