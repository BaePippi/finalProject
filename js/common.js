// 헤더전체 시작
const $barIcon = document.querySelector(".fa-bars");
const $barMenu = document.querySelector(".bar-menu");
const $cartIcon = document.querySelector(".fa-cart-shopping");
const $cartMenu = document.querySelector(".cart-menu");
const $cartX = document.querySelector(".cart-right-title .fa-xmark");
const $header = document.querySelector("header");
const $title = document.querySelector(".header-container > p");
console.log($title)
$title.addEventListener('click', () => {
  location.pathname = "/main";
})

$barIcon.addEventListener("click", () => {
  if ($barMenu.classList.contains("hidden")) {
    $barMenu.classList.toggle("hidden");
    $cartMenu.classList.toggle("hidden", true);
    $barMenu.classList.remove("menu-off");
    $barMenu.classList.add("menu-on");
  } else {
    $barMenu.classList.remove("menu-on");
    $barMenu.classList.add("menu-off");
    setTimeout(() => {
      $barMenu.classList.toggle("hidden");
      $cartMenu.classList.toggle("hidden", true);
    }, 1000);
  }
});
$cartIcon.addEventListener("click", () => {
  if ($cartMenu.classList.contains("hidden")) {
    $cartMenu.classList.toggle("hidden");
    $barMenu.classList.toggle("hidden", true);
    $cartMenu.classList.remove("cart-off");
    $cartMenu.classList.add("cart-on");
  }
});
$cartX.addEventListener("click", () => {
  if (!$cartMenu.classList.contains("hidden")) {
    $cartMenu.classList.remove("cart-on");
    $cartMenu.classList.add("cart-off");
    setTimeout(() => {
      $cartMenu.classList.toggle("hidden");
      $barMenu.classList.toggle("hidden", true);
    }, 500);
  }
});

var beforePosition = document.documentElement.scrollTop;
document.addEventListener("scroll", function () {
  var afterPosition = document.documentElement.scrollTop;
  if (afterPosition > 10) {
    if (beforePosition < afterPosition) {
      $header.classList.add("active");
      $headerUnder.classList.add("active");
    } else {
      $header.classList.remove("active");
      $headerUnder.classList.remove("active");
    }
  }
  beforePosition = afterPosition;
});

const $headerUnder = document.querySelector(".header-under");
//헤더끝
