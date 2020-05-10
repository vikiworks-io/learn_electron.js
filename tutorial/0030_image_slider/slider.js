var slideIndex = 1;
//showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

function display_main_image(){
    alert("Hi");
    var container = document.getElementById("main_container");
    var div1 = document.createElement("DIV");
    div1.className = "mySlides";
    var div2 = document.createElement("DIV");
    div2.className = "numbertext";
    var img = document.createElement("IMG");
    //img.src = "images/"+slideIndex.toString(10)+".jpg";
    img.src = "images/1.jpg";
    img.style="width:100%";

    div2.appendChild(img);
    div1.appendChild(div2);
    container.appendChild(div1);
}

