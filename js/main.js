import { data } from "./data.js";

const products = document.querySelector(".best-products .products");
const menuIcon = document.querySelector("#menu");
const xmenuIcon = document.querySelector("#xmenu");
const cart = document.querySelector(".cart-wrapper");
const numberoFProducts = document.querySelector(".num-products");

let ProductsCart = [];

data.forEach((e) => {
  for (let i = 0; i < e.imgs.length; i++) {
    let element = ` 
  <div class="product" data-name=${e.name} data-num=${i}>
    <img src="assets/${e.imgs[i]}" alt="" />
    <div class="product-info">
        <h4>${e.name}</h4>
        <p>${e.price}$</p>
   </div>
  </div>
  `;
    products.insertAdjacentHTML("beforeend", element);
  }
});

menuIcon.addEventListener("click", (e) => {
  cart.classList.toggle("display-none");
});
xmenuIcon.addEventListener("click", (e) => {
  cart.classList.toggle("display-none");
});

products.addEventListener("click", (e) => {

  if (e.target.closest(".product") ) {
    let val =
      "?param1=" +e.target.closest(".product").dataset.name + "&param2=" + e.target.closest(".product").dataset.num;
    //   console.log(val);
    window.location.href = "./../pages/product.html" + val;
  }
});
