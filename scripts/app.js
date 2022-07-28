let submenuButton = document.querySelector(".sub-menu-button");
let basketButton = document.querySelector(".shop-basket");
let categorySection = document.querySelector(".category-section");

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
  sectionScale(categorySection);
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
function sectionScale(section) {
  let locationNum = section.clientHeight;
  if (document.documentElement.scrollTop >= locationNum / 2) {
    if (
      !categorySection.firstElementChild.classList.contains("category-show-up")
    ) {
      categorySection.firstElementChild.classList.add("category-show-up");
    }
  }
}
