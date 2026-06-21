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
   * Scroll with offset on links with a class name .scrollto
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
   * Scroll with offset on page load with hash links in the url
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

const lenis = new Lenis()
lenis.on('scroll', (e) => {
  console.log(e)
})
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

// Set lag smoothing to 0 for better animation performance
gsap.ticker.lagSmoothing(0);

// Function to initialize all GSAP animations
function initAnimations() {
  // Initial animations
  gsap.from(".resplendenttext", {
    duration: 1.5,
    opacity: 0,
    y: 100,
    ease: "power1.inOut",
  });
  
  gsap.from(".resplendenticon", {
    duration: 1,
    opacity: 0,
    y: 100,
    ease: "power1.inOut",
    delay: 1,
  });
  
  // ScrollTrigger animations
  gsap.from(".fortelationstext h3", {
    scrollTrigger: {
      trigger: ".fortelationstext h3",
      start: "top 90%",
      end: "bottom 60%",
      toggleActions: "play none none none",
    },
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power2.out",
  });
  
  gsap.from(".fortelationstext h6", {
    scrollTrigger: {
      trigger: ".fortelationstext h6",
      start: "top 90%",
      end: "bottom 60%",
      toggleActions: "play none none none",
    },
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power2.out",
  });

  // About text word animation
  const textElement = document.querySelector(".abouttext");
  if (textElement) {
    const words = textElement.innerText.split(" ");
    textElement.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
    gsap.set(".word", { opacity: 0 });
    gsap.to(".word", {
      scrollTrigger: {
        trigger: ".abouttext",
        start: "top 105%",
        end: "bottom 20%",
        scrub: 0.25,
      },
      opacity: 1,
      stagger: 0.01,
    });
  }

  // Animation for .aboutforteimg
  gsap.from(".aboutforteimg", {
    scrollTrigger: {
      trigger: ".aboutforteimg",
      start: "top 90%",
      end: "top 50%",
      toggleActions: "play none none none",
    },
    duration: 1.8,
    opacity: 0,
    x: 100,
    ease: "power1.inOut",
  });

  // History forte animation
  gsap.from(".historyforte h1", {
    scrollTrigger: {
      trigger: ".historyforte h1",
      start: "top 90%",
      end: "bottom 30%",
      scrub: true,
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  // Fortelations 2023 animation
  gsap.from(".fortelations2023", {
    scrollTrigger: {
      trigger: ".fortelations2023",
      start: "top 90%",
      end: "bottom 30%",
      scrub: true,
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power1.inOut",
  });

  // Gallery section animation
  gsap.from(".galleryforte h1", {
    scrollTrigger: {
      trigger: ".galleryforte h1",
      start: "top 60%",
      end: "bottom 30%",
      scrub: true,
    },
    opacity: 0,
    y: 100,
    duration: 1.5,
  });

  // Horizontal scrolling for fortelationshistory with enhanced visuals
  const historyContainer = document.querySelector('.fortelationshistory');
  
  if (historyContainer) {
    // Create the horizontal scroll animation
    const horizontalScroll = gsap.to(historyContainer, {
      x: () => -(historyContainer.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: historyContainer,
        pin: true,
        scrub: 1.5,
        end: () => `+=${historyContainer.scrollWidth}`,
        onUpdate: (self) => {
          // Animate cards as they come into/out of view
          const cards = historyContainer.querySelectorAll('[class^="fortelations"]');
          cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const containerRect = historyContainer.getBoundingClientRect();
            
            // Calculate visibility
            const visibility = Math.max(0, Math.min(1, 
              (window.innerWidth / 2 - Math.abs(cardRect.left - window.innerWidth / 2)) / (window.innerWidth / 2)
            ));
            
            // Apply scale and opacity based on visibility
            gsap.to(card, {
              scale: 0.85 + (visibility * 0.15),
              opacity: 0.6 + (visibility * 0.4),
              duration: 0.3,
              overwrite: 'auto'
            });
          });
        }
      }
    });

    // Add stagger animation to cards
    gsap.to('[class^="fortelations"]', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.3)',
      scrollTrigger: {
        trigger: historyContainer,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // Gallery rows animation
  gsap.utils.toArray('.gallery-row').forEach((row) => {
    const images = row.querySelectorAll('img');
    if (images.length > 1) {
      gsap.from(images, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: row,
          start: 'top 105%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    } else {
      gsap.from(row, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: row,
          start: 'top 100%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  });
}

// Initialize animations after the page is fully loaded
window.addEventListener("load", initAnimations);

document.querySelector('.mobile-nav-toggle').addEventListener('click', function() {
  document.querySelector('.navbar-mobile').classList.toggle('show');
});