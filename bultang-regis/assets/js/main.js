/**
* Template Name: Bootslander
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Hide header on scroll down and show on scroll up
   */
  let lastScrollTop = 0;
  const hideShowHeader = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 200) { // Change to 200px
      selectHeader.style.top = '-100px'; // Adjust this value as needed
    } else if (scrollTop < lastScrollTop && scrollTop < document.documentElement.scrollHeight - window.innerHeight - 200) { // Change to 200px
      selectHeader.style.top = '0';
    }
    lastScrollTop = scrollTop;
  }
  window.addEventListener('scroll', hideShowHeader);


  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
window.addEventListener('load', () => {
// Variable to track whether the user is scrolling up or down
let lastScrollTop = 0;

// Function to handle the scroll event
function handleScroll() {
    const currentScrollTop = window.scrollY;

    // Check if the user is scrolling down
    if (currentScrollTop > lastScrollTop) {
        // If scrolling down, pause the looping animation
        loopTl.pause();
    } else {
        // If scrolling up, check if the user has reached the top of the page
        if (currentScrollTop === 0) {
            // If at the top, resume the looping animation
            loopTl.play();
        }
    }

    // Update the last scroll position
    lastScrollTop = currentScrollTop;

    // Calculate the scroll position
    const scrollPosition = currentScrollTop;

    // Update the position of elements with parallax effect
    const parallaxValue = scrollPosition * 0.5; // Adjust the multiplier to control the intensity of the parallax effect
    const parallaxLeftValue = -scrollPosition * 0.5; // Adjust the multiplier and sign to control the intensity and direction of the parallax effect
    const parallaxRightValue = scrollPosition * 0.5; // Adjust the multiplier and sign to control the intensity and direction of the parallax effect
    // Apply parallax effect to the ".resplendent" element
    gsap.to(".gedungleft", { x: parallaxLeftValue, duration: 0.5 });
    gsap.to(".gedungright", { x: parallaxRightValue, duration: 0.5 });
    gsap.to(".resplendent", { y: parallaxValue, duration: 0.5 });
}

// Listen for the scroll event
window.addEventListener("scroll", handleScroll);

// GSAP Timeline for the looping animation
let loopTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
loopTl.to(".resplendent", { y: "-1rem", duration: 1, ease: "power1.inOut" });

// GSAP Timeline for the initial loading animations
let loadTl = gsap.timeline();
loadTl.from(".gedungbg", { 
  y: -150,       
  opacity: 0,   
  stagger: { amount: 0.3, from: "random" }, 
  duration: 1 
});
gsap.from(".gedungleft", {
  x: -200, // Adjust this value as needed
  stagger: { amount: 0.4, from: "random" },
  duration: 1
});

gsap.from(".gedungright", {
  x: 200, // Adjust this value as needed
  stagger: { amount: 0.4, from: "random" },
  duration: 1.1
});

loadTl.from(".resplendent", { opacity: 0, scale: 0.8, duration: 0.8, onComplete: loopTl.play() }, "<0.5");


let scrollTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".boxes",
    start: "top center ",
    end: "bottom bottom",
    scrub: true
  }
});
scrollTl.from(".box", {opacity: 0, scale: 0.8, duration: 0.15, stagger: {each: 0.4}})



let scrollTl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".poster",
    start: "top center ",
    end: "bottom 70%",
    scrub: 3
  }
});
scrollTl1.from(".forteposter", {opacity: 0, scale: 0.8, duration: 0.15, stagger: {each: 0.4}})

const lenis = new Lenis()

lenis.on('scroll', (e) => {
console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)



const boxes = document.querySelector(".box");

const checkBoxes = ()=> {
  const triggerButton = (window.innerHeight/5)*4;
  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerButton)boxes.classList.add("show");
    else box.classList.remove("show");
  });
};  
  window.addEventListener("scroll", checkBoxes);
  checkBoxes()

  window.addEventListener("load", initAnimations);






})();


document.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
  document.querySelector('.navbar-mobile').classList.toggle('show');
});