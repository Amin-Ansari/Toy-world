let submenuButton = document.querySelector(".sub-menu-button");
let basketButton = document.querySelector(".shop-basket");
let categoryItems = document.querySelectorAll(".category-list>li");
let categoryListItem = document.querySelectorAll(".category-list-items");
let scrollButton = document.querySelector(".scroll-donw-link");
let videoDiv = document.querySelector(".video-part");

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
  for (let element of categoryListItem) {
    sectionScale(element);
  }
  sectionScale(videoDiv);
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
/*Everytime this function is called the position of the element we have as an argument will be saved and if the top value of the element's position...
  be less than 800 the element will show up 
*/
function sectionScale(element) {
  let elementLocation = element.getBoundingClientRect();
  console.log(elementLocation.top);
  if (elementLocation.top <= 900) {
    if (!element.classList.contains("category-show-up")) {
      element.classList.add("category-show-up");
    }
  }
}
