window.addEventListener("DOMContentLoaded", init);

function init() {

  var navItem = document.getElementsByClassName("nav__item");
  var activeItem = document.getElementsByClassName("nav__item_active");
  

  for (var i = 0; i < navItem.length; i++) {

    navItem[i].addEventListener('click', function () {
      this.classList.add('nav__item_active');

    });
  }



}



