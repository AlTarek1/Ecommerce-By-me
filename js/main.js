import { data } from "./data.js";

const products = document.querySelector(".best-products .products");
const menuIcon = document.querySelector("#menu");
const xmenuIcon = document.querySelector("#xmenu");
const cart = document.querySelector(".cart-wrapper");
const numberoFProducts = document.querySelector(".num-products");

let ProductsCart = [
  [0, 0, 0, 0], //EarPhones 1 Frequency array
  [0, 0, 0, 0], //EarPhones 2 Frequency array
  [0, 0, 0, 0], //EarPhones 3 Frequency array
  [0, 0, 0, 0], //EarPhones 4 Frequency array
  [0, 0, 0, 0], //HeadPhones 1 Frequency array
  [0, 0, 0, 0], //HeadPhones 2 Frequency array
  [0, 0, 0, 0], //HeadPhones 3 Frequency array
  [0, 0, 0, 0], //HeadPhones 4 Frequency array
  [0, 0, 0, 0], //Speaker Frequency array
  [0, 0, 0, 0], //Watch Frequency array
];
let Num = 0;
ProductsCart.forEach((e) => {
  e.forEach((ele) => {
    Num += ele > 0;
  });
});
// console.log(Num);

numberoFProducts.textContent = `${Num}`;

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
  console.log(e.path[1].dataset);
  if (e.path[1].dataset?.name && e.path[1].dataset?.num) {
    let val =
      "?param1=" + e.path[1].dataset.name + "&param2=" + e.path[1].dataset.num;
    //   console.log(val);
    window.location.href = "./pages/product.html" + val;
  }
});
