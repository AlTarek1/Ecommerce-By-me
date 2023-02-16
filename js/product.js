import { data } from "./data.js";

let dataUrl = decodeURIComponent(window.location.search);

dataUrl = dataUrl
  .substring(1)
  .split("&")
  .map((e) => {
    return e.split("=")[1].trim();
  });

const cart = document.querySelector(".cart-wrapper");
const productscart = document.querySelector(".products-cart");
const menuIcon = document.querySelector(".icon");
const xmenuIcon = document.querySelector("#xmenu");
const productInfo = document.querySelector("#product_info");
const numberoFProducts = document.querySelector(".num-products");
const addtocart = document.querySelector("#addToCart");
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
const items = document.querySelector("#items");
const productsTo = document.querySelector(".products-show");

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
let currentProd = { i: 0, j: +dataUrl[1] },
  currentQuantity = 1;
let img = [];
data.forEach((e, a) => {
  if (e.name === dataUrl[0]) {
    img = e.imgs;
    currentProd.i = a;
  }
});
let MayAlso = data.map((e) => {
  return e.imgs
    .map((el, i) => {
      return `
    <div class="product productTo" data-name=${e.name} data-i=${i} >
    <img src="../assets/${el}" alt="" />
    <h4>${e.name}</h4>
    <p>${e.price}</p>
    </div>
    `;
    })
    .join("");
});
MayAlso += data
  .map((e) => {
    if (e.name !== dataUrl[0])
      return e.imgs
        .map((el, i) => {
          return `
      <div class="product productTo" data-name=${e.name} data-i=${i}>
      <img src="../assets/${el}" alt="" />
      <h4>${e.name}</h4>
      <p>${e.price}</p>
      </div>
      `;
        })
        .join("");
  })
  .join("");
document.querySelector(".products-show").innerHTML = MayAlso;
let cnt = 0;
let Element = `
<div class="image">
<img class="main-img" src="../assets/${img[+dataUrl[1]]}" alt="" />
<div class="small-img">
${img
  .map((e, i) => {
    if (i === +dataUrl[1]) {
      return `<img data-key=${cnt++} class="active-img show-img" src="../assets/${e}" alt="" />`;
    } else {
      return `<img data-key=${cnt++} class="show-img" src="../assets/${e}" alt="" />`;
    }
  })
  .join()}

</div>
</div>
`;
productInfo.insertAdjacentHTML("afterbegin", Element);

menuIcon.addEventListener("click", (e) => {
  cart.classList.toggle("display-none");
});
xmenuIcon.addEventListener("click", (e) => {
  cart.classList.toggle("display-none");
});

const renderCart = () => {
  productscart.innerHTML = "";
  const prod = ProductsCart.map((e, i) => {
    const dat = e
      .map((ele, j) => {
        if (ele) {
          const parma = ` <div class="product">
        <img src="../assets/${data[i].imgs[j]}" alt="" />
        <div class="info">
          <h1>${data[i].name}</h1>
          <div class="chnge">
            <i class="fa-solid fa-minus" id="minus2"></i>
            <p id="innerNum" data-i=${i} data-j=${j}>${ele}</p>
            <i class="fa-solid fa-plus" id="plus2"></i>
          </div>
        </div>
        <div class="right">
          <p>${data[i].price}$</p>
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
      </div>`;
          return parma;
        }
      })
      .join("");
    return dat;
  }).join("");
  let Num = 0;
  ProductsCart.forEach((e) => {
    e.forEach((ele) => {
      Num += ele > 0;
    });
  });
  numberoFProducts.textContent = `${Num}`;
  items.textContent = `${Num}`;
  productscart.insertAdjacentHTML("afterbegin", prod);
};
addtocart.addEventListener("click", (e) => {
  ProductsCart[currentProd.i][currentProd.j] += currentQuantity;
  renderCart();
});

minus.addEventListener("click", () => {
  if (currentQuantity > 1) currentQuantity--;
  document.querySelector("#currentQunt").innerText = currentQuantity;
});
plus.addEventListener("click", () => {
  if (currentQuantity < 20) currentQuantity++;
  document.querySelector("#currentQunt").innerText = currentQuantity;
});
productscart.addEventListener("click", (e) => {
  if (e.target.closest(".fa-plus")) {
    let p = e.target.previousElementSibling;
    ProductsCart[p.dataset.i][p.dataset.j]++;
  } else if (e.target.closest(".fa-minus")) {
    let p = e.target.nextElementSibling;
    ProductsCart[p.dataset.i][p.dataset.j]--;
  } else if (e.target.closest(".fa-circle-xmark"  )) {
    let p = e.target.closest(".product").children[1].children[1].children[1];
    ProductsCart[p.dataset.i][p.dataset.j] = 0;
  }    renderCart();

});

const showImg = document.querySelectorAll(".show-img");

showImg.forEach((e) =>
  e.addEventListener("click", (el) => {
    showImg.forEach((ele) => ele.classList.remove("active-img"));
    el.target.classList.add("active-img");
    document.querySelector(".main-img").src = el.target.src;
    currentProd.j = el.target.dataset.key;
  })
);

productsTo.addEventListener("click", (e) => {
  //   console.log(e);
  if (e.target.closest(".productTo")) {
    let val =
      "?param1=" + e.target.closest(".productTo").dataset.name + "&param2=" +e.target.closest(".productTo").dataset.i;
    //   console.log(val);
    window.location.href = "../pages/product.html" + val;
  }
});
