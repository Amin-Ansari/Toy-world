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
let addButtons = document.querySelectorAll(".product-add-card");
let productInfo = {};

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
addButtons.forEach(function (item) {
  item.addEventListener("click", addTocard);
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
    } else if (window.innerWidth >= 567 && window.innerWidth < 992) {
      if (ulRight >= -theLIftValue * (theULChildNumber - 3)) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight - theLIftValue}px`;
        if (ulRight == -theLIftValue * (theULChildNumber - 3)) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    } else if (window.innerWidth >= 992) {
      if (ulRight >= -theLIftValue * (theULChildNumber - 5)) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight - theLIftValue}px`;
        if (ulRight == -theLIftValue * (theULChildNumber - 5)) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    }
  } else {
    if (window.innerWidth < 567) {
      if (ulRight < 0) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight + theLIftValue}px`;
        if (ulRight == -theLIftValue) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    } else if (window.innerWidth >= 567 && window.innerWidth < 992) {
      if (ulRight < 0) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight + theLIftValue}px`;
        if (ulRight == -theLIftValue) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    } else if (window.innerWidth >= 992) {
      if (ulRight < 0) {
        showAllTheMoveButtons(theUl);
        theUl.style.right = `${ulRight + theLIftValue}px`;
        if (ulRight == -theLIftValue) {
          this.classList.replace("opa-1", "opa-0");
        }
      }
    }
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
function interfeerOrNot(ulRight, liftRight) {
  if (ulRight % liftRight != 0) {
    return false;
  } else {
    return true;
  }
}
// Every one millisecond checks if result of right value of UL element divided to width of li element of the ul is not equal to zero, it sets the right value of ul to zero and hides the back buttons
setInterval(function () {
  let theUlRight = document.querySelectorAll(".slide-list");
  for (let element of theUlRight) {
    let rightVal = returnProp(element, "width");
    if (rightVal != 0) {
      let liftVal = returnProp(element.firstElementChild, "width");
      if (!interfeerOrNot(rightVal, liftVal)) {
        let buttons = document.querySelectorAll(
          `#${element.parentElement.id} > span`
        );
        buttons[0].classList.replace("opa-1", "opa-0");
        element.style.right = `0px`;
      }
    }
  }
}, 1);

function addTocard() {
  productInfo["productName"] =
    this.parentElement.parentElement.firstElementChild.innerText;
  productInfo["ProductNumber"] = Number(this.nextElementSibling.value);
  productInfo["Productprice"] = Number(
    this.parentElement.previousElementSibling.firstElementChild.innerText
  );
  addToLocalStorage();
}
function addToLocalStorage() {
  if (localStorage.length > 0) {
    for (let i = 1; i <= localStorage.length; i++) {
      let itemCompare = JSON.parse(localStorage.getItem(`product${i}`));
      if (productInfo.productName == itemCompare.productName) {
        itemCompare.ProductNumber += Number(productInfo.ProductNumber);
        localStorage.setItem(`product${i}`, JSON.stringify(itemCompare));
      }
      console.log("if");
    }
  } else {
    localStorage.setItem(
      `product${localStorage.length + 1}`,
      JSON.stringify(productInfo)
    );
    console.log("else");
  }
}
