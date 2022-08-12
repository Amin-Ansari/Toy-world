let submenuButton = document.querySelector(".sub-menu-button");
let basketButton = document.querySelector(".shop-basket");
let categoryItems = document.querySelectorAll(".category-list>li");
let categoryListItem = document.querySelectorAll(".toy-list > li");
let scrollButton = document.querySelector(".scroll-donw-link");
let videoDiv = document.querySelector(".video-part");
let playButton = document.querySelector(".play-icon");
let container = document.querySelector(".video-container");
let video = document.querySelector(".video-container>video");
let subscribeSection = document.querySelector(".subscribe-part");
let emailInput = document.querySelector(".email-in");
let instagrampost = document.querySelectorAll(".image-list li");
let typeButtons = document.querySelectorAll(".toy-type");
let aboutImages = document.querySelectorAll(".boy-image");
let relatedProducts = document.querySelectorAll(".related-produtects");
let moveButtons = document.querySelectorAll(`.move-slide`);

submenuButton.addEventListener("click", showSubMenu);
basketButton.addEventListener("click", showBasket);
document.addEventListener("click", puaseVideo);
document.addEventListener("click", function (eventOb) {
  if (eventOb.target.classList.contains("basket-stored")) {
    showBasket();
  } else if (eventOb.target.classList.contains("basket-close-btn")) {
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
  if (videoDiv) {
    sectionScale(videoDiv);
  }
  sectionScale(subscribeSection);
  for (let element of instagrampost) {
    sectionScale(element);
  }
  for (let element of aboutImages) {
    sectionScale(element);
  }
  for (let element of relatedProducts) {
    sectionScale(element);
  }
});
if (scrollButton) {
  scrollButton.addEventListener("click", function () {
    document.documentElement.scrollTop =
      document.documentElement.clientHeight * 0.5;
  });
}
if (playButton) {
  playButton.addEventListener("click", playVideo);
}
emailInput.addEventListener("blur", inputValidation);
typeButtons.forEach(function (item) {
  item.addEventListener("click", changeTheType);
});
moveButtons.forEach(function (item) {
  item.addEventListener("click", moveSlider);
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
  if (elementLocation.top <= 850) {
    if (!element.classList.contains("category-show-up")) {
      element.classList.add("category-show-up");
    }
  }
}
function playVideo() {
  container.classList.replace("dis-none", "dis-flex");
  video.classList.toggle("category-show-up");
}
function puaseVideo(eventOb) {
  let container = document.querySelector(".video-container");
  if (
    eventOb.target == container ||
    eventOb.target.classList.contains("video-close")
  ) {
    video.pause();
    video.currentTime = 0;
    container.classList.replace("dis-flex", "dis-none");
    if (video.classList.contains("category-show-up")) {
      video.classList.remove("category-show-up");
    }
  }
}
function inputValidation() {
  let addsignIndex = this.value.indexOf("@");
  if (addsignIndex <= 0 && this.value.length) {
    if (!this.classList.contains("unvalidEmail")) {
      this.classList.add("unvalidEmail");
      this.nextElementSibling.classList.add("show-state");
      console.log(this.value.length);
    }
  } else {
    console.log(this.value.length);
    this.classList.remove("unvalidEmail");
    this.nextElementSibling.classList.remove("show-state");
  }
}
function changeTheType() {
  let title = document.querySelector(".toy-type-title");
  resetAllTypes();
  this.classList.replace("toy-hover-state", "selected-type");
  title.innerHTML = this.innerHTML;
  showAndHideProducts(this.id);
}
function resetAllTypes() {
  for (let element of typeButtons) {
    element.classList.replace("selected-type", "toy-hover-state");
  }
}
function showAndHideProducts(givvenId) {
  let allTheproducts = document.querySelectorAll(".toy-list>li");
  showAllProducts(allTheproducts);
  if (givvenId != "all") {
    for (let element of allTheproducts) {
      if (!element.classList.contains(`${givvenId}`))
        if (!element.classList.contains("dis-none"))
          element.classList.add("dis-none");
    }
  } else {
    showAllProducts(allTheproducts);
  }
}
function showAllProducts(products) {
  for (let prod of products) {
    prod.classList.remove("dis-none");
  }
}
function moveSlider() {
  let theUl = this.parentElement.firstElementChild.nextElementSibling;
  let theULChildNumber = theUl.children;
  let theLIftValue = theUl.firstElementChild;
  theULChildNumber = theULChildNumber.length;
  theLIftValue = returnProp(theLIftValue, "width");
  let ulRight = returnProp(theUl, "right");
  if (this.classList.contains("forward")) {
    if (window.innerWidth < 567) {
      if (ulRight >= -theLIftValue * (theULChildNumber - 2)) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight - theLIftValue}px`;
        if (ulRight == -theLIftValue * (theULChildNumber - 2)) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    }
    if (window.innerWidth >= 567 && window.innerWidth <= 768) {
      if (ulRight >= -theLIftValue * (theULChildNumber - 3)) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight - theLIftValue}px`;
        if (ulRight == -theLIftValue * (theULChildNumber - 3)) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    }
    if (window.innerWidth >= 768) {
      if (ulRight >= -theLIftValue * (theULChildNumber - 5)) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight - theLIftValue}px`;
        if (ulRight == -theLIftValue * (theULChildNumber - 5)) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    }
  } else {
  }
}
function returnProp(theObject, propValue) {
  let theValue = getComputedStyle(theObject)[`${propValue}`];
  theValue = theValue.split("px");
  return Number(theValue[0]);
}
function showAllTheMoveButtons(UlElement) {
  let neededId = UlElement.parentElement.id;
  let buttons = document.querySelectorAll(`#${neededId} > span`);
  for (let element of buttons) {
    element.classList.replace("opa-0", "opa-1");
  }
}
