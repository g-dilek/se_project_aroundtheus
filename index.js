document.addEventListener("scroll", function () {
  var scroll = window.scrollY || window.pageYOffset;
  var car = document.querySelector(".car");
  car.style.left = scroll + "px";
});
