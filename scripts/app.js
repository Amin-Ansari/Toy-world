let submenuButton = document.querySelector(".sub-menu-button");
let basketButton = document.querySelector(".shop-basket");
let categoryItems = document.querySelectorAll(".category-list>li");
let scrollButton = document.querySelector(".scroll-donw-link");

submenuButton.addEventListener("click", showSubMenu);
basketButton.addEventListener("click", showBasket);
document.addEventListener("click", function (eventOb) {
  if (eventOb.target.classList.contains("basket-stored")) {
    showBasket();
  } else if (eventOb.target.classList.contains("fa-xmark")) {
    showBasket();
  }
});
document.addEventListener("scroll", () => {
  for (let element of categoryItems) {
    sectionScale(element);
  }
});
scrollButton.addEventListener("click", function () {
  document.documentElement.scrollTop =
    document.documentElement.clientHeight * 0.5;
});

function showSubMenu() {
  barsTransform();
  let theMobileMenu = document.querySelector(".mobile-menu");
  theMobileMenu.classList.toggle("show-sub");
}
function barsTransform() {
  let allBars = document.querySelectorAll(".bars");
  for (let i = 0; i < allBars.length; i++) {
    allBars[i].classList.toggle("opened");
  }
}
function showBasket() {
  let basketContainer = document.querySelector(".basket-stored");
  let basketCard = document.querySelector(".basket-cards");
  basketContainer.classList.toggle("cards-flex");
  setTimeout(() => {
    basketCard.classList.toggle("scale-normal");
  }, 50);
}
function sectionScale(element) {
  let elementLocation = element.getBoundingClientRect();
  if (elementLocation.top <= 800) {
    if (!element.classList.contains("category-show-up")) {
      element.classList.add("category-show-up");
    }
  }
}
