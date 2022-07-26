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
let theUlSlide = document.querySelectorAll(".slide-list");
let productInfo = {};

submenuButton.addEventListener("click", showSubMenu);
basketButton.addEventListener("click", showBasket);
window.addEventListener("load", function () {
  basketLength();
  filltheBasket();
});
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
document.addEventListener("click", function (eventOb) {
  if (eventOb.target.innerText == "حذف محصول") {
    let theElement = eventOb.target.parentElement.parentElement.parentElement;
    let theContainer =
      eventOb.target.parentElement.parentElement.parentElement.parentElement
        .children;
    let theproductList = [];
    for (let i = 0; i < theContainer.length; i++) {
      if (theElement == theContainer[i]) {
        theElement = i;
      }
      theproductList.push(JSON.parse(localStorage.getItem(`product${i + 1}`)));
    }
    theproductList.splice(theElement, 1);
    localStorage.clear();
    for (let i = 0; i < theproductList.length; i++) {
      localStorage.setItem(
        `product${i + 1}`,
        JSON.stringify(theproductList[i])
      );
    }
    filltheBasket();
    basketLength();
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
    }
  } else {
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
  let theElement = theUl.firstElementChild;
  theElement = Math.floor(returnProp(theElement, "width"));
  if (this.classList.contains("forward")) {
    theUl.scrollLeft -= theElement;
  } else {
    theUl.scrollLeft += theElement;
  }
}
function returnProp(theObject, propValue) {
  let theValue = getComputedStyle(theObject)[`${propValue}`];
  theValue = theValue.split("px");
  return Number(theValue[0]);
}

// This function checks if all the snap points are scrolled, then hidden the needed button
setInterval(function () {
  for (let element of theUlSlide) {
    let theSize = element.firstElementChild;
    theSize = Math.floor(returnProp(theSize, "width"));
    let backButton = document.querySelector(`#${element.id} > .backward`);
    let forwardButton = document.querySelector(`#${element.id} > .forward`);
    if (element.scrollLeft >= -(theSize - 20)) {
      backButton.classList.replace("opa-1", "opa-0");
    } else {
      backButton.classList.replace("opa-0", "opa-1");
    }
    if (element.scrollLeft <= -(theSize * 2) + -20) {
      forwardButton.classList.replace("opa-1", "opa-0");
    } else {
      forwardButton.classList.replace("opa-0", "opa-1");
    }
  }
}, 1);
function addTocard() {
  productInfo["productName"] =
    this.parentElement.parentElement.firstElementChild.innerText;
  let theNumberInput = this.nextElementSibling;
  productInfo["productNumber"] = Number(theNumberInput.value);
  productInfo["productprice"] = Number(
    this.parentElement.previousElementSibling.firstElementChild.innerText
  );
  let imageSource =
    this.parentElement.parentElement.nextElementSibling.firstElementChild.src;
  productInfo["productImage"] = imageSource.substring(
    imageSource.indexOf("images/"),
    imageSource.length
  );
  addToLocalStorage();
  basketLength();
  theNumberInput.value = 1;
}
function addToLocalStorage() {
  let itemCompare = {};
  if (localStorage.length > 0) {
    for (let i = 1; i <= localStorage.length; i++) {
      itemCompare[`product${i}`] = JSON.parse(
        localStorage.getItem(`product${i}`)
      );
    }
    for (let j = 1; j <= localStorage.length; j++) {
      if (productInfo.productName == itemCompare[`product${j}`].productName) {
        itemCompare[`product${j}`].productNumber += Number(
          productInfo.productNumber
        );
        localStorage.setItem(
          `product${j}`,
          JSON.stringify(itemCompare[`product${j}`])
        );
        filltheBasket();
        return;
      }
    }
    addToLocal();
  } else {
    addToLocal();
  }
}
function addToLocal() {
  localStorage.setItem(
    `product${localStorage.length + 1}`,
    JSON.stringify(productInfo)
  );
  filltheBasket();
}
function basketLength() {
  let theBasketLength = document.querySelector(".bsket-length");
  let theLengthNumber = 0;
  for (let i = 1; i <= localStorage.length; i++) {
    let theItem = JSON.parse(localStorage.getItem(`product${i}`));
    theLengthNumber += Number(theItem.productNumber);
  }
  theBasketLength.innerHTML = theLengthNumber;
}
function filltheBasket() {
  let theBasketContainer = document.querySelector(".basket-cards");
  theBasketContainer.firstElementChild.nextElementSibling.innerHTML = "";
  if (!localStorage.length) {
    theBasketContainer.firstElementChild.nextElementSibling.appendChild(
      emptyParagraph()
    );
    theBasketContainer.lastElementChild.classList.add("dis-none");
  } else {
    theBasketContainer.lastElementChild.classList.remove("dis-none");
    theBasketContainer.firstElementChild.nextElementSibling.appendChild(
      ulCreateor()
    );
    for (let i = 1; i <= localStorage.length; i++) {
      let product = JSON.parse(localStorage.getItem(`product${i}`));
      let item = addProductToBsket();
      item.firstElementChild.firstElementChild.firstElementChild.src =
        product.productImage;
      // The code below checks if the image did not loaded set the src of the img to the laternative value
      item.firstElementChild.firstElementChild.firstElementChild.addEventListener(
        "error",
        function () {
          this.src = `../${product.productImage}`;
          this.error = null;
        }
      );
      item.firstElementChild.lastElementChild.firstElementChild.innerHTML =
        product.productName;
      item.firstElementChild.lastElementChild.firstElementChild.nextElementSibling.firstElementChild.innerHTML =
        product.productprice;
      item.lastElementChild.firstElementChild.firstElementChild.value =
        product.productNumber;
      item.lastElementChild.firstElementChild.firstElementChild.addEventListener(
        "click",
        function () {
          changeTheProductNumber(i, this);
        }
      );
      item.lastElementChild.firstElementChild.firstElementChild.addEventListener(
        "change",
        function () {
          changeTheProductNumber(i, this);
        }
      );
      theBasketContainer.firstElementChild.nextElementSibling.firstElementChild.appendChild(
        item
      );
      calculateTheSum();
    }
  }
}
function changeTheProductNumber(currentIndex, elem) {
  let productItem = JSON.parse(localStorage.getItem(`product${currentIndex}`));
  productItem.productNumber = Number(elem.value);
  localStorage.setItem(`product${currentIndex}`, JSON.stringify(productItem));
  basketLength();
  calculateTheSum();
}
function emptyParagraph() {
  let paragraph = document.createElement("p");
  paragraph.classList.add("empty-basket");
  paragraph.innerHTML = "سبد خرید شما خالی است";
  return paragraph;
}
function ulCreateor() {
  let list = document.createElement("ul");
  list.classList.add("basket-list");
  return list;
}
function addProductToBsket() {
  let item = document.createElement("li");
  item.innerHTML = ` <div class="right">
  <div class="basket-img-container">
    <img
      class="full-width-image"
      src=""
      alt="product image"
    />
  </div>
  <div class="basket-item-info">
    <h3></h3>
    <p><span class="item-price"></span>تومان</p>
    <button type="button">حذف محصول</button>
  </div>
</div>
<div class="left">
  <form
    class="number-form"
    action="javascript:void(0)"
    method="post"
  >
    <input
      type="number"
      name="number-input"
      id=""
      min="1"
      value=""
      class="item-num"
    />
  </form>
</div>`;
  item.className = "basket-item";
  return item;
}
function calculateTheSum() {
  let theTotalPrice = document.querySelector(".total-price");
  let totalPrice = 0;
  for (let i = 1; i <= localStorage.length; i++) {
    let theProduct = JSON.parse(localStorage.getItem(`product${i}`));
    totalPrice +=
      Number(theProduct.productNumber) * Number(theProduct.productprice);
  }
  theTotalPrice.firstElementChild.innerHTML = totalPrice;
}
