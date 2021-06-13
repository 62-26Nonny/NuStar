var track = document.querySelector(".carousel_track");
var slides = Array.from(track.children);
var nextButton = document.querySelector(".carousel_right_button");
var prevButton = document.querySelector(".carousel_left_button");
var left_index = 0;
var right_index = 4;

var slideWidth = slides[0].getBoundingClientRect().width;

function setClassSlides(){
    slides[0].classList.add("first_slide");
    slides[0].classList.add("current_slide");
    slides[5].classList.add("last_slide");
}
setClassSlides();

function setSlidePosition(){
    slideWidth = slides[0].getBoundingClientRect().width;
    for(let i = 0; i < slides.length; i++){
        slides[i].style.left = slideWidth * i + "px";
    }
}
setSlidePosition();

window.addEventListener('resize', setSlidePosition);

function moveSlide(currentSlide, nextSlide){
    track.style.transform = "translateX(-" + nextSlide.style.left + ")";
    currentSlide.classList.remove("current_slide");
    nextSlide.classList.add("current_slide");
}

nextButton.addEventListener('click', e => {
    var currentSlide = document.querySelector(".current_slide");
    left_index = left_index + 1;
    right_index = right_index + 1;
    if(right_index > 9 ){
        var nextSlide = document.querySelector(".first_slide");
        left_index = 0;
        right_index = 4;
    } else {
        var nextSlide = currentSlide.nextElementSibling;
    }
    moveSlide(currentSlide, nextSlide);
});

prevButton.addEventListener('click', e => {
    var currentSlide = document.querySelector(".current_slide");
    left_index = left_index - 1;
    right_index = right_index - 1;
    if(left_index < 0){
        var nextSlide = document.querySelector(".last_slide");
        left_index = 5;
        right_index = 9;
    } else {
        var nextSlide = currentSlide.previousElementSibling;
    }
    moveSlide(currentSlide, nextSlide);
});

function clickCarousel(){
    nextButton.click();
}

setInterval(clickCarousel, 3000);
