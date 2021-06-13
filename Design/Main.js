
// NAV BAR //
function openNav(){
    document.querySelector('.nav_bar').style.width = '250px';
}
function closeNav(){
    document.querySelector('.nav_bar').style.width = '0px';
}

// CAROUSEL //
const track = document.querySelector(".carousel_track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel_button-right");
const prevButton = document.querySelector(".carousel_button-left");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange next slides
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);

// move to target slide
const moveToSlide = (track, currentSlide, targetSlide, currentDot, targetDot) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current_slide');
  targetSlide.classList.add('current_slide');
  
}

// update nav dot
const updateDot = (currentDot, targetDot) => {
  currentDot.classList.remove('current_active');
  targetDot.classList.add('current_active');
}

const hiddenButton = (targetIndex, slides, prevButton, nextButton) => {
  if(targetIndex === 0){
    prevButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  } else if (targetIndex === slides.length - 1){
    prevButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
  }
  else {
    prevButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');
  }
}

// click next
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current_slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current_active');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDot(currentDot, nextDot);
  hiddenButton(nextIndex, slides, prevButton, nextButton);
})
// click prev
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current_slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current_active');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDot(currentDot, prevDot);
  hiddenButton(prevIndex, slides, prevButton, nextButton);
})
// click nav
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  
  if(!targetDot) return;

  const currentSlide = track.querySelector('.current_slide');
  const currentDot = dotsNav.querySelector('.current_active');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  
  moveToSlide(track, currentSlide, targetSlide);
  updateDot(currentDot, targetDot);
  hiddenButton(targetIndex, slides, prevButton, nextButton);
  

})