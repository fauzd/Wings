gsap.registerPlugin(ScrollTrigger);

if (window.innerWidth > 936) {
  const tl = gsap.timeline();

  tl.delay(1);
  tl.addLabel("start")
    .from(".hero__bg--addon", {
      opacity: 0,
      // scale: 10,
      transformOrigin: "bottom center",
    })
    .to(
      ".hero__title",
      {
        // x: -300,
        // scale: 2,
        opacity: 1,
        duration: 2,
      },
      "start"
    )
    .to(
      [".hero__text", ".header__content", ".header__contacts"],
      {
        // x: -400,
        // scale: 2,
        opacity: 1,
        duration: 1,
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
    .to(
      ".header__contacts-list li",
      {
        opacity: 1,
        stagger: 0.2,
        duration: .5,
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
    .to(
      [".header__logo-img", ".header__cta", ".hero_actions"],
      {
        scale: 1,
        duration: 0.8,
      },
      "third"
    )
    .to(
      ".hero__actions",
      {
        opacity: 1,
        duration: 1,
      },
      "third"
    );

  // Hero scroll animation
  function createAnimationHero() {
    const tlHero = gsap.timeline();

    tlHero
      .fromTo(
        [".hero__content"],
        {
          // x: 0,
          y: 0,
          // scale: 1,
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "top -20%",
            scroller: "[data-scroll-container]",
            scrub: true,
          },
          // x: -600,
          y: -300,
          // scale: 0.1,
          opacity: 0,
          stagger: 0.25,
        }
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
          y: 0,
          xPercent: -50,
          scale: 1,
        },
        {
          scrollTrigger: {
            trigger: ".hero",
            start: "bottom bottom",
            end: "bottom 40%",
            scroller: "[data-scroll-container]",
            scrub: true,
          },
          y: -400,
          xPercent: -50,
          scale: 2,
          transformOrigin: "bottom center",
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
            scrub: true,
          },
          "--decor1-size": "100%",
        }
        // "about"
      );
  }

  //Horizontal section animation

  function horizontalSectionSlidesAnimation() {
    const slides = document.querySelectorAll(".scroll-section__content");
    const pinWrap = document.querySelector(".pin-wrap");
    const pinWrapWidth = pinWrap.offsetWidth;

    slides.forEach((slide, index) => {
      // Вычисляем ширину одного слайда
      const slideWidth = pinWrapWidth / slides.length;

      // Начальная точка для анимации (левый край слайда пересекает середину экрана)
      const startScroll =
        slideWidth * index + slideWidth / 2 - window.innerWidth / 2;

      // Определяем начальное и конечное положение по оси Y в зависимости от чётности индекса
      const startY = index % 2 === 0 ? 155 : -155;
      const endY = index % 2 === 0 ? 55 : -55;

      // Создаем анимацию для каждого слайда
      gsap.fromTo(
        slide.querySelectorAll(".about__slide-img, .about__slide-title, .text"),
        {
          opacity: 0,
          y: startY,
          scale: 0,
        },
        {
          opacity: 1,
          y: endY,
          scale: 1,
          transformOrigin: "bottom center",
          duration: 0.5,
          stagger: 0.3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: pinWrap,
            scroller: "[data-scroll-container]",
            start: () => `+=${startScroll}`,
          },
        }
      );
    });
  }

  //Меняем цвет фона секции
  // function initColorTriggers() {
  //   const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  //   scrollColorElems.forEach((colorSection, i) => {
  //     const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
  //     const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

  //     ScrollTrigger.create({
  //       trigger: colorSection,
  //       scroller: "[data-scroll-container]",
  //       start: "top 50%",
  //       onEnter: () => {
  //         const currentBgColor = colorSection.dataset.bgcolor; // Считываем актуальное значение
  //         const currentTextColor = colorSection.dataset.textcolor; // Считываем актуальное значение
  //         gsap.to("body", {
  //           backgroundColor: currentBgColor,
  //           color: currentTextColor,
  //           overwrite: "auto",
  //         });
  //       },
  //       onLeaveBack: () =>
  //         gsap.to("body", {
  //           backgroundColor: prevBg,
  //           color: prevText,
  //           overwrite: "auto",
  //         }),
  //     });
  //   });
  // }

  function initColorTriggers() {
    const scrollColorElems = document.querySelectorAll("[data-bgcolor]");

    scrollColorElems.forEach((colorSection) => {

      // Для скролла вниз
      ScrollTrigger.create({
        trigger: colorSection,
        scroller: "[data-scroll-container]",
        start: "top 50%",
        end: "bottom bottom",
        onEnter: () => {
          const currentBgColor = colorSection.dataset.bgcolor;
          gsap.to("body", {
            backgroundColor: currentBgColor,
            overwrite: "auto",
          });
        },
      });

      // Для скролла вверх
      ScrollTrigger.create({
        trigger: colorSection,
        scroller: "[data-scroll-container]",
        start: "bottom 50%",
        end: "top top",
        onEnterBack: () => {
          const currentBgColor = colorSection.dataset.bgcolor;
          gsap.to("body", {
            backgroundColor: currentBgColor,
            overwrite: "auto",
          });
        },
      });
    });
  }

  //Section program
  function createAnimationProgramBg(index) {
    const programContenArea = document.querySelector(".program__tab-content");
    const bgColors = ["#84a2ff", "#bdcdff", "#e9d3be", "#ffa880"];
    // const timetable = document.querySelector(".timetable");
    
    // timetable.dataset.bgcolor = bgColors[index];

    gsap.to(programContenArea, {
      backgroundColor: bgColors[index],
      duration: 1,
      ease: "power2.out",
    });

  }

  //Section features
  function createAnimationFeatures() {
      gsap.fromTo(
        ".features__title",
        {
          yPercent: -100,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".features",
            start: "top 50%",
            // end: "top 30%",
            scroller: "[data-scroll-container]",
            // scrub: true,
          },
          yPercent: 0,
          opacity: 1,
          duration: 2,
        }
      );
      gsap.fromTo(
        ".features__card",
        {
          yPercent: -50,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".features__row",
            start: "top 60%",
            // end: "top 25%",
            scroller: "[data-scroll-container]",
            // scrub: true,
          },
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
        }
      );
  }

  //Section vision
  function createAnimationVision() {
    //Сперва синхронизируем цвет фейдером карусели и фона
    let isVisionVisible = false;

    function updateGradientColor() {
      if (!isVisionVisible) return;

      // Получаем цвет фона секции body
      const bodyBackgroundColor = getComputedStyle(
        document.body
      ).backgroundColor;

      // Создаем градиент с новым цветом
      const gradientBefore = `linear-gradient(to bottom, ${bodyBackgroundColor} 20%, transparent 100%)`;
      const gradientAfter = `linear-gradient(to top, ${bodyBackgroundColor} 20%, transparent 100%)`;

      // Получаем родителя слайдера
      const slider = document.querySelector(".vision");

      // Обновляем градиент для псевдоэлементов
      slider.style.setProperty("--gradientBefore", gradientBefore);
      slider.style.setProperty("--gradientAfter", gradientAfter);

      // Запрашиваем следующую перерисовку
      requestAnimationFrame(updateGradientColor);
    }

    // Создаем экземпляр Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        // Проходим по всем entries
        entries.forEach((entry) => {
          // Если секция .vision видна на экране
          if (entry.isIntersecting) {
            isVisionVisible = true;
            // Обновляем цвет градиента
            updateGradientColor();
          } else {
            isVisionVisible = false;
          }
        });
      },
      {
        threshold: 0.1, // Секция .vision считается видимой, когда хотя бы 10% ее видно на экране
      }
    );

    // Начинаем отслеживать секцию .vision
    observer.observe(document.querySelector(".vision"));

    // Создаем экземпляр MutationObserver
    const mutationObserver = new MutationObserver(updateGradientColor);

    // Начинаем отслеживать изменения атрибута style секции body
    mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }
  // Функция анимации текста в карусели
  function animateVisionCarousel(element1, element2, newText1, newText2) {
    gsap.to([element1, element2], {
      duration: 0.5,
      opacity: 0,
      // xPercent: 100,
      // scale: 0,
      onComplete: () => {
        element1.textContent = newText1;
        element2.textContent = newText2;

        gsap.to([element1, element2], {
          duration: 0.5,
          opacity: 1,
          // xPercent: 0,
          // scale: 1,
        });
      },
    });
  }

  //Section People
  function createAnimationPeople() {
    const tlPeople = gsap.timeline();

    tlPeople
      .fromTo(
        ".people__title, .people__subtitle",
        {
          yPercent: -100,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".people",
            start: "top 60%",
            end: "top 40%",
            scroller: "[data-scroll-container]",
            scrub: true,
          },
          yPercent: 0,
          opacity: 1,
        }
      )
      .fromTo(
        ".people__text--1, .people__text--2, .people__caption-wrapper",
        {
          yPercent: -50,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: ".people",
            start: "top 40%",
            end: "top 10%",
            scroller: "[data-scroll-container]",
            scrub: true,
          },
          yPercent: 0,
          opacity: 1,
        }
      );
    gsap.fromTo(
      ".people__principal-img-wrapper",
      {
        "--yPercentBefore": 100,
        "--xPercentBefore": 100,
        "--yPercentAfter": 200,
        "--xPercentAfter": 200,
        "--opacity": 0,
      },
      {
        scrollTrigger: {
          trigger: ".people__principal-img-wrapper",
          start: "-10% center",
          // end: "top 50%",
          scroller: "[data-scroll-container]",
        },
        "--yPercentBefore": 0,
        "--xPercentBefore": 0,
        "--yPercentAfter": 0,
        "--xPercentAfter": 0,
        "--opacity": 1,
        duration: 1,
      }
    );
    gsap.fromTo(
      ".swiper-slide__img-wrapper",
      {
        "--opacityBgPeopleSlide": 0,
      },
      {
        scrollTrigger: {
          trigger: ".people__swiper-wrapper",
          start: "top center",
          // end: "top 50%",
          scroller: "[data-scroll-container]",
        },
        "--opacityBgPeopleSlide": 1,
        duration: 3,
      }
    );
  }

  //Section Licences
  function createAnimationLicenses() {
    gsap.fromTo(
      ".licenses__title",
      {
        yPercent: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".licenses",
          start: "top 50%",
          end: "top 30%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        yPercent: 0,
        opacity: 1,
      }
    );
    gsap.fromTo(
      ".licenses__text",
      {
        yPercent: -50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".licenses",
          start: "top 30%",
          end: "top top",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        yPercent: 0,
        opacity: 1,
      }
    );
    gsap.fromTo(
      ".licenses__preview-1",
      {
        yPercent: 30,
        xPercent: -9,
        // opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".licenses",
          start: "top 30%",
          // end: "top top",
          scroller: "[data-scroll-container]",
        },
        yPercent: 0,
        xPercent: 0,
        // opacity: 1,
        ease: "Power2.easeInOut",
        duration: 1,
      }
    );
    gsap.fromTo(
      ".licenses__preview-2",
      {
        yPercent: 15,
        xPercent: 9,
        // opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".licenses",
          start: "top 30%",
          // end: "top top",
          scroller: "[data-scroll-container]",
          // scrub: true,
        },
        yPercent: 0,
        xPercent: 0,
        // opacity: 1,
        ease: "Power2.easeInOut",
        duration: 1,
      }
    );
  }

  //Section Testimonials
  function createAnimationTestimonials() {
    gsap.fromTo(
      ".testimonials__title",
      {
        yPercent: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".testimonials",
          start: "top 50%",
          end: "top 30%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        yPercent: 0,
        opacity: 1,
      }
    );
    
    gsap.fromTo(
      ".testimonials__card",
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".testimonials",
          start: "top 40%",
          scroller: "[data-scroll-container]",
        },
        opacity: 1,
        duration: 0.9,
        stagger: 0.3
      }
    );
  }

  //Section howto
  function createAnimationHowTo() {
    gsap.fromTo(
      ".howto__title, .howto__subtitle",
      {
        yPercent: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".howto",
          start: "top 40%",
          end: "top 30%",
          scroller: "[data-scroll-container]",
          scrub: true
        },
        yPercent: 0,
        opacity: 1,
      }
    );
    gsap.fromTo(
      ".howto__text",
      {
        yPercent: -30,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".howto",
          start: "top 30%",
          end: "top 10%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        yPercent: 0,
        opacity: 1,
      }
    );

    gsap.fromTo(
      ".howto__img",
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".howto",
          start: "top 60%",
          end: "top 15%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        opacity: 1,
      }
    )
    gsap.fromTo(
      ".howto__card",
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".howto__bottom",
          start: "top center",
          // end: "top 15%",
          scroller: "[data-scroll-container]",
          // scrub: true,
        },
        opacity: 1,
        duration: 0.9,
        stagger: 0.3,
      }
    );
  }

  //Section Form
  function createAnimationForm() {
    gsap.fromTo(
      ".form__title",
      {
        opacity: 0,
        yPercent: -400,
      },
      {
        scrollTrigger: {
          trigger: ".form",
          start: "top 80%",
          end: "top 50%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        opacity: 1,
        yPercent: 0,
      }
    )
    gsap.fromTo(
      ".form__text--address, .form__form",
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".form",
          start: "top 60%",
          end: "top 30%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        opacity: 1,
      }
    );
  }

  //Section questions
  function createAnimationQuestions() {
    gsap.fromTo(
      ".questions__title",
      {
        opacity: 0,
        yPercent: -100,
      },
      {
        scrollTrigger: {
          trigger: ".questions",
          start: "top 60%",
          end: "top 50%",
          scroller: "[data-scroll-container]",
          scrub: true,
        },
        opacity: 1,
        yPercent: 0,
      }
    )
    gsap.fromTo(
      ".questions__button",
      {
        yPercent: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".questions",
          start: "top 55%",
          // end: "top 30%",
          scroller: "[data-scroll-container]",
          // scrub: true,
        },
        opacity: 1,
        yPercent: 0,
        duration: .5,
        stagger: .3
      }
    )
    gsap.to(".questions__more-button", {
      scrollTrigger: {
        trigger: ".questions__more",
        start: "top -10%",
        end: "top -20%",
        scroller: "[data-scroll-container]",
        scrub: true,
      },
      backgroundColor: "#BDCDFF",
      color: "#BDCDFF",
    });
    gsap.to(".questions__more-title", {
      scrollTrigger: {
        trigger: ".questions__more",
        start: "top -10%",
        end: "top -20%",
        scroller: "[data-scroll-container]",
        scrub: true,
      },
      color: "#BDCDFF",
    });
  }
}