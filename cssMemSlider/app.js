document.addEventListener('DOMContentLoaded', () => {

  const slider = document.querySelector('.slider'),
    slides = slider.querySelectorAll('.slider-slide-item'),
    slidesField = slider.querySelector('.slider-slide-inner'),
    width = window.getComputedStyle(slider).width,
    indicators = slider.querySelector('.slider-pagination'),
    slideDescr = slider.querySelectorAll('.slider-descr-item')
  let index = 1,
    offset = 0

  // window.addEventListener('resize', () => {
  //   const width = window.getComputedStyle(slider).width
  // })

  slidesField.style.width = `${100*slides.length}%`
  slides.forEach(slide => {
    slide.style.width = width
  })

  //indicators
  const circles = []
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.backgroundImage = `url(assets/${i+1}.jpg)`
    const circle = document.createElement('div')
    circle.setAttribute('data-slide', i + 1)
    circle.classList.add('slider-pagination-item')

    if (i == 0) {
      circle.classList.add('slider-pagination-item_active')
    }
    indicators.append(circle)
    circles.push(circle)

  }

  function transformSlide() {
    slidesField.style.transform = `translateX(-${offset}px)`
  }

  function changeDotColor() {
    circles.forEach(circle => circle.classList.remove('slider-pagination-item_active'));
    circles[index - 1].classList.add('slider-pagination-item_active')
  }

  function changeSlideDescr() {
    slideDescr.forEach(descr => {
      descr.style.display = 'none'
      slideDescr[index - 1].style.transform = 'translateX(100%)'
    })
    setTimeout(() => {
      slideDescr[index - 1].style.transform = 'translateX(0)'
    })
    slideDescr[index - 1].style.display = 'block'
  }
  changeSlideDescr()


  circles.forEach(circle => {
    circle.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide')
      index = slideTo
      offset = +width.slice(0, width.length - 2) * (slideTo - 1)
      transformSlide()
      changeDotColor()
      changeSlideDescr()
    })
  });


})