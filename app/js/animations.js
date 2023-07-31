gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();

tl.addLabel("start")
  .fromTo(
    ".hero",
    {
      backgroundSize: "300%",
    },
    {
      backgroundSize: "100%",
    }
  )
  .from(
    ".hero__title",
    {
      x: -300,
      scale: 2,
      opacity: 0,
    },
    "start"
  )
  .from(
    ".hero__text",
    {
      x: -400,
      scale: 2,
      opacity: 0,
    },
    "start"
  )
  .addLabel("second")
  .fromTo(
    ".header__nav li",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
    },
    "second"
  )
  .from(
    ".header__contacts-list li",
    {
      x: -1000,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    },
    "second"
  )
  .addLabel("third")
  .fromTo(
    [".header__logo-img", ".header__cta"],
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1.2,
      opacity: 1,
      duration: 0.2,
    }
  )
  .to([".header__logo-img", ".header__cta"], {
    scale: 1,
    duration: 0.8,
  });

// Hero scroll animation
function createAnimationHero() {
  const tlHero = gsap.timeline();

  tlHero
    .fromTo(
      [".hero__title", ".hero__text"],
      {
        x: 0,
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "center top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        x: -300,
        opacity: 0,
        stagger: 0.25,
      }
    )
    .addLabel("hero-cta")
    .fromTo(
      ".hero__actions",
      {
        x: 0,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "50% top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        x: 325,
        y: 150,
        scale: 2,
      },
      "hero-cta"
    )
    .fromTo(
      ".hero__video",
      {
        x: 0,
        scale: 1,
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "25% top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        x: -300,
        y: -50,
        opacity: 0,
      },
      "hero-cta"
    )
    .fromTo(
      ".hero",
      {
        backgroundPosition: "center top",
        // backgroundSize: "100%",
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "25% top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        backgroundPosition: "center -200px",
        // backgroundSize: "125%",
      },
      "hero-cta"
    )
    .fromTo(
      ".hero__bg--addon",
      {
        backgroundPosition: "center top",
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "25% top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        backgroundPosition: "center -300px",
      },
      "hero-cta"
    )
    .fromTo(
      ".hero__bg--addon",
      {
        opacity: 1,
      },
      {
        scrollTrigger: {
          trigger: ".hero",
          start: "80% top",
          end: "90% top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        opacity: 0,
      }
    )
    .addLabel("about")
    .fromTo(
      ".about__title",
      {
        y: 150,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".about",
          start: "top 70%",
          end: "top 50%",
          scroller: "[data-scroll-container]",
          markers: true,
          scrub: true,
        },
        y: 0,
        opacity: 1,
        transformOrigin: "bottom center",
      },
      "about"
    )
    .fromTo(
      ".about__text",
      {
        y: 150,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".about",
          start: "top 60%",
          end: "top 40%",
          scroller: "[data-scroll-container]",
          markers: true,
          scrub: true,
        },
        y: 0,
        opacity: 1,
        transformOrigin: "bottom center",
      }
      // "about"
    )
    .fromTo(
      ".about",
      {
        "--decor1-size": "0",
      },
      {
        scrollTrigger: {
          trigger: ".about",
          start: "top 60%",
          end: "top 40%",
          scroller: "[data-scroll-container]",
          markers: true,
          scrub: true,
        },
        "--decor1-size": "100%",
      }
      // "about"
    );



}

