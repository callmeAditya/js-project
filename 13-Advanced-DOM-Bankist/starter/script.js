'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const navbtns = document.querySelectorAll('.nav__link')
const navlink = document.querySelector('.nav__links')
const nav = document.querySelector('.nav')

//tabs
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')


const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);



//MODAL screen
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//Learn More button
btnScrollTo.addEventListener('click', function (e) {
  // console.log(e);

  const s1coord = section1.getBoundingClientRect()
  // console.log(s1coord);

  // window.scrollTo({left:s1coord.left + window.pageXOffset, top:s1coord.top+ window.pageYOffset, behavior:'smooth'})

  //alternate-new one
  section1.scrollIntoView({ behavior: 'smooth' })
})



// Navlink buttons: forEach loop is cumbersome for large events!
// navbtns.forEach((ele, i) => {
//   ele.addEventListener('click', function (e) {
//     // console.log('link');
//     e.preventDefault()
//     // 1.method   
//     // const section=document.querySelector(`#section--${i+1}`)
//     // 2nd method
//     const id = this.getAttribute('href')
//     const section = document.querySelector(id)
//     section.scrollIntoView({ behavior: 'smooth' })

//   })
// })

//Event Delegation: selecting only target elements
navlink.addEventListener('click', function (e) {
  e.preventDefault()

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    const section = document.querySelector(id)
    section.scrollIntoView({ behavior: 'smooth' })
  }
})


//Tabbed compo
//event delegation

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault() //stops reload
  const click = e.target.closest('.operations__tab') // bcoz tabs container contains both button and span element-> closest will get the siblings

  if (click) {
    //REMOVE ACTIVE CLASSES
    tabs.forEach(t => t.classList.remove('operations__tab--active')) // clearning all before activating one
    tabContent.forEach(c => c.classList.remove('operations__content--active'))

    //ACTIVATE TAB
    click.classList.add('operations__tab--active') // makes it rise

    //ACTIVATE CONTENT
    const tabid = click.getAttribute('data-tab') // or below one
    // const tabid= click.dataset.tab
    const content = document.querySelector(`.operations__content--${tabid}`)
    content.classList.add('operations__content--active')
  }
})

//menu fade animation-in

const menufun = function (e) {

  if (e.target.classList.contains('nav__link')) {  //<li> : nav__links
    const click = e.target;

    const sibling = click.closest('.nav').querySelectorAll('.nav__link'); //< ul>: nav__link // go to parent and select siblings
    const logo = click.closest('.nav').querySelector('img')

    sibling.forEach((s) => {
      if (s !== click) {
        // click.style.opacity = 1;
        s.style.opacity = this
      }
      logo.style.opacity = this

    })
  }

}
nav.addEventListener('mouseover', menufun.bind(0.5))
nav.addEventListener('mouseout', menufun.bind(1))


//sticky nav- obsolete method
// const navcoords= section1.getBoundingClientRect();

// window.addEventListener('scroll', ()=>{

//   if(window.scrollY>navcoords.top){
//     nav.classList.add('sticky')
//   }else{
//     nav.classList.remove('sticky')
//   }
// })


//intersection observer API;

// const obsfun=function(entires,observer){
//   entires.forEach(ele=>{
//     console.log(ele);
//   })
// }

// const obsopt={
//   root:null,
//   threshold:0.1

// }

// const observer=new IntersectionObserver(obsfun, obsopt)
// observer.observe(section1)

const header = document.querySelector('.header')
const navheight = nav.getBoundingClientRect().height;

const obsfun = function (entries, observer) {

  //my method
  // entries.forEach(ele=>{
  //   if(!ele.isIntersecting){
  //     nav.classList.add('sticky')
  //   }else{
  //     nav.classList.remove('sticky')
  //   }
  // })
  // console.log(entries);
  const [entry] = entries // just want first element of the array which is Intersection Observer
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }

}

const obsopt = {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,

}

const observer = new IntersectionObserver(obsfun, obsopt)
observer.observe(header)


//revealing elements  L-198
// hide them first 
for (let i = 1; i <= 3; i++) {
  const sectionid = document.getElementById(`section--${i}`)
  sectionid.classList.add('section--hidden')
}

const allSection = document.querySelectorAll('.section')

//function
const Reveal = function (entries, observer) {
  const [entry] = entries
  // console.log(entry);
  if (!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden')

  observer.unobserve(entry.target)// no to observe after target

}

const secobsopt = {
  root: null,
  threshold: 0.15, // reveal only when 15% visible
}

const sectionObserver = new IntersectionObserver(Reveal, secobsopt)
allSection.forEach(function (sect) {
  sectionObserver.observe(sect)
})



//Lazy Loading Images L 199

const imgTargets = document.querySelectorAll('img[data-src]') // css method
// console.log(imgTargets);

const loadImg = (entries, observer) => {

  const [entry] = entries
  // console.log(entry);

  if (!entry.isIntersecting) return

  //replace src with data-src          inspect it
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img')// removes blurness
  })


  observer.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loadImg,
  {
    root: null,
    threshold: 0.15,
  })

imgTargets.forEach((img) => {
  imgObserver.observe(img)
})




// slider

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const dotsContainer = document.querySelector('.dots')

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
// slider.style.transform='scale(0.3)'
slider.style.overflow = 'visible'

let currslide = 0
const numslides = slides.length


//dots below slider L201

const createDots = function () {
  console.log(currslide);
  slides.forEach((_, i) => {
    const html = `<button class='dots__dot' data-slide="${i}" ></button>`
    dotsContainer.insertAdjacentHTML('beforeend', html)
  })
}
createDots()


const activeDots = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
activeDots(0) //L 201




const goToSlide = function (ele) {

  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - ele) * 100}%)`
  })
}

goToSlide(0)

const nextslide = function (e) {
  if (currslide === numslides - 1) {
    currslide = 0; // to stop slider

  } else {
    currslide++;
  }

  goToSlide(currslide)
  activeDots(currslide)
}

const prevslide = function () {
  if (currslide === 0) {
    currslide = numslides - 1; // to stop slider

  } else {
    currslide--;
  }
  goToSlide(currslide)
  activeDots(currslide)
}

//right-slide
btnRight.addEventListener('click', nextslide)
//left-slide
btnLeft.addEventListener('click', prevslide)

//key-events
document.addEventListener('keydown', function (e) {

  if (e.key === 'ArrowLeft') prevslide()
  e.key === 'ArrowRight' && nextslide()
})

dotsContainer.addEventListener('click', function (e) {

  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset
    goToSlide(slide)
    activeDots(slide)
  }
})