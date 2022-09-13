let cookie = document.cookie
let favoriteProducts = JSON.parse(cookie.split("=")[1])

let divElem = document.getElementById("fav-products-div")

let pElem = document.createElement("p")

pElem.innerHTML = favoriteProducts
divElem.appendChild(pElem)
