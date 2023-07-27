document.addEventListener("DOMContentLoaded", function () {
  //Делаем скроллер и глобально видимым
  let scroller;
  //При скролле к секции наверн будет выплывать хэдер, 
  //поэтому оставляем ему место, тут объявляем его и его высоту,
  //сейчас это фикс, поэтому так
  let headerHeightFixed = 150;
  //Прячем хэдер
  //В мобильной версии
  if (window.innerWidth < 576) {
    let lastScrollTop = 0;
    let header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let headerContent = document.querySelector(".header__content");

      if (scrollTop > lastScrollTop) {
        header.style.top = "-100px"; // скрываем хэдер
      } else {
        header.style.top = "0"; // показываем хэдер
      }

      let navLinks = document.querySelectorAll(".header__nav-link");

      if (scrollTop > 0) {
        // если страница прокручена вниз
        headerContent.style.background = "rgba(255, 255, 255, 0.8)"; // делаем фон белым
        headerContent.style.color = "black"; // делаем шрифт черным
        navLinks.forEach((link) =>
          link.classList.add("header__nav-link--hover")
        ); // убираем черный цвет при наведении
      } else {
        // если страница в самом верху
        headerContent.style.color = "white"; // делаем шрифт белым
        headerContent.style.background = "rgba(255, 255, 255, 0.1)"; // делаем фон полупрозрачным
        headerContent.style.backdropFilter = "blur(10px)"; // применяем размытие
        headerContent.style.webkitBackdropFilter = "blur(10px)"; // применяем размытие для Safari
        navLinks.forEach((link) =>
          link.classList.remove("header__nav-link--hover")
        ); // добавляем черный цвет при наведении
      }

      lastScrollTop = scrollTop;
    });
  } else {
    //
  }

  //Бургер меню
  const burger = document.querySelector(".header__burger");
  const close = document.querySelector(".header__close");
  const nav = document.querySelector(".header__nav");

  burger.addEventListener("click", function () {
    nav.style.display = "flex";
    burger.style.display = "none";
    close.style.display = "block";
  });

  close.addEventListener("click", function () {
    nav.style.display = "none";
    close.style.display = "none";
    burger.style.display = "block";
  });
  //неочевидное закрытие бургера
  //только для мобильной версии
  if (window.innerWidth < 936) {
    // Получаем все ссылки в навигационном меню
    let navLinks = document.querySelectorAll(".header__nav a");

    // Для каждой ссылки
    for (let i = 0; i < navLinks.length; i++) {
      // Добавляем обработчик события click
      navLinks[i].addEventListener("click", function () {
        // Закрываем меню
        document.querySelector(".header__nav").style.display = "none";
        // Меняем иконку бургера на крестик
        document.querySelector(".header__burger").style.display = "block";
        document.querySelector(".header__close").style.display = "none";
      });
    }
  }
  //Видео О школе
  // Получаем модальное окно
  let modal = document.getElementById("heroModal");

  // Получаем кнопку, которая открывает модальное окно
  let btn = document.querySelector(".hero__video");

  // Получаем элемент <span>, который закрывает модальное окно
  let span = document.querySelector(".hero__modal-close");

  // Когда пользователь нажимает на кнопку, открываем модальное окно
  btn.onclick = function (e) {
    e.preventDefault();
    let iframe = document.createElement("iframe");
    iframe.width = "258";
    iframe.height = "382";
    iframe.src = "https://www.youtube.com/embed/aMcq3T0188c";
    iframe.frameborder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    document.getElementById("videoContainer").appendChild(iframe);
    modal.style.display = "block";
  };

  // Когда пользователь нажимает на <span> (x), закрываем модальное окно
  span.onclick = function () {
    modal.style.display = "none";
    document.getElementById("videoContainer").innerHTML = ""; // Удаляем iframe, чтобы остановить воспроизведение видео
  };

  // Когда пользователь кликает в любом месте за пределами модального окна, закрываем его
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("videoContainer").innerHTML = ""; // Удаляем iframe, чтобы остановить воспроизведение видео
    }
  };

  //swiper about
  let swiper1;

  if (window.innerWidth < 936) {
    swiper1 = new Swiper(".about__swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 25,
      centeredSlides: true,
      loop: true,
      // freeMode: true,
      navigation: {
        nextEl: ".about__swiper-button-next",
        prevEl: ".about__swiper-button-prev",
      },
      pagination: {
        el: ".about__swiper-pagination",
        clickable: true,
      },
    });
  } else {
    //копируем контент
    // Получение элементов, содержимое которых нужно скопировать
    let sourceElements = document.querySelectorAll(".about__swiper-slide");

    // Получение элементов, в которые нужно вставить содержимое
    let targetElements = document.querySelectorAll(".scroll-section__content");

    // Проверка, что количество источников и целей совпадает
    if (sourceElements.length === targetElements.length) {
      // Копирование содержимого каждого элемента
      sourceElements.forEach((sourceElement, index) => {
        targetElements[index].innerHTML = sourceElement.innerHTML;
      });
    } else {
      console.error("Количество источников и целей не совпадает");
    }

    //собсно скролл
    gsap.registerPlugin(ScrollTrigger);

    const pageContainer = document.querySelector(".main");
    pageContainer.setAttribute("data-scroll-container", "");

    scroller = new LocomotiveScroll({
      el: pageContainer,
      smooth: true,
      getDirection: true,
      lerp: 0.07,
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(pageContainer, {
      scrollTop(value) {
        return arguments.length
          ? scroller.scrollTo(value, 0, 0)
          : scroller.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: pageContainer.style.transform ? "transform" : "fixed",
    });

    let horizontalSections = document.querySelectorAll(".horizontal-scroll");

    horizontalSections.forEach((horizontalSection, index) => {
      let pinWrap = horizontalSection.querySelector(".pin-wrap");
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;
      gsap.to(pinWrap, {
        scrollTrigger: {
          scroller: "[data-scroll-container]",
          scrub: true,
          trigger: horizontalSection,
          pin: true,
          start: "top top",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true,
        },
        x: -horizontalScrollLength,
        ease: "none",
      });

      //Обработка координат и состояний кастомного курсора
      const cursor = horizontalSection.querySelector(".custom-cursor");

      let mouseX = 0;
      let mouseY = 0;
      let lastScrollY = 0;
      let scrollDirection = null;

      function updateCursor() {
        const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
        if (
          elementUnderCursor &&
          elementUnderCursor.closest(".horizontal-scroll")
        ) {
          const sectionTop = horizontalSection.getBoundingClientRect().top;
          const pinWrap = horizontalSection.querySelector(".pin-wrap");
          const transformMatrix = window
            .getComputedStyle(pinWrap)
            .getPropertyValue("transform");
          const transformValue = Number(transformMatrix.split(",")[4].trim());
          const scrollProgress =
            (Math.abs(transformValue) / horizontalScrollLength) * 100;
          let rotation = 0;

          if (scrollProgress <= 2) {
            rotation = scrollDirection === "up" ? -90 : 90;
          } else if (scrollProgress >= 97) {
            rotation = scrollDirection === "up" ? -90 : 90;
          } else {
            rotation = scrollDirection === "up" ? -180 : 0;
          }

          cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
          cursor.style.left = mouseX + "px";
          cursor.style.top = mouseY - sectionTop + "px";
          cursor.style.display = "block";
          cursor.classList.add("custom-cursor--active");
          horizontalSection.style.cursor = "none";
          horizontalSection.style.overflow = "visible";
        } else {
          cursor.style.display = "none";
          cursor.classList.remove("custom-cursor--active");
          horizontalSection.style.overflow = "hidden";
        }
      }

      window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updateCursor();
      });

      scroller.on("scroll", (instance) => {
        scrollDirection = lastScrollY > instance.scroll.y ? "up" : "down";
        lastScrollY = instance.scroll.y;
        updateCursor();
      });
    });

    //Меняем цвет фона секции
    const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
    scrollColorElems.forEach((colorSection, i) => {
      const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
      const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

      ScrollTrigger.create({
        trigger: colorSection,
        scroller: "[data-scroll-container]",
        start: "top 50%",
        onEnter: () =>
          gsap.to("body", {
            backgroundColor: colorSection.dataset.bgcolor,
            color: colorSection.dataset.textcolor,
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to("body", {
            backgroundColor: prevBg,
            color: prevText,
            overwrite: "auto",
          }),
      });
    });

    //Скрываем заголовок
    let headerContent = document.querySelector(".header__content");
    let navLinks = document.querySelectorAll(".header__nav-link");

    const showAnim = gsap
      .from(".header", {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      scroller: "[data-scroll-container]",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play();
          headerContent.style.background = "rgba(255, 255, 255, 0.8)";
          headerContent.style.color = "black";
          navLinks.forEach((link) =>
            link.classList.add("header__nav-link--hover")
          );
        } else {
          showAnim.reverse();
          headerContent.style.background = "rgba(255, 255, 255, 0.1)";
          headerContent.style.color = "white";
          navLinks.forEach((link) =>
            link.classList.remove("header__nav-link--hover")
          );
        }
      },
    });

    ScrollTrigger.refresh();
    //Мониторим параметры скролла в корневом элементе и при нулях
    //возвращаем стили хэдера
    // Выберите элемент, который вы хотите наблюдать
    let targetNode = document.querySelector(".main");

    // Опции для наблюдателя (что наблюдать)
    let config = {
      attributes: true,
      childList: false,
      subtree: false,
      attributeFilter: ["style"],
    };

    // Callback функция, которая будет запущена при изменении
    let callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          let styleValue = targetNode.getAttribute("style");
          if (
            styleValue ===
            "transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); opacity: 1; pointer-events: all;"
          ) {
            headerContent.style.background = "rgba(255, 255, 255, 0.1)";
            headerContent.style.color = "white";
            navLinks.forEach((link) =>
              link.classList.remove("header__nav-link--hover")
            );
          }
        }
      }
    };

    // Создание экземпляра наблюдателя с callback функцией
    let observer = new MutationObserver(callback);

    // Начало наблюдения за выбранным элементом и его настройками
    observer.observe(targetNode, config);

    ScrollTrigger.addEventListener("refresh", () => scroller.update());

    ScrollTrigger.refresh();
  }

  //Фотографии школы
  //swiper
  let swiper2;

  if (window.innerWidth < 936) {
    swiper2 = new Swiper(".school-fotos__swiper-container", {
      initialSlide: 1,
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      spaceBetween: 30,
      navigation: {
        nextEl: ".school-fotos__swiper-button-next",
        prevEl: ".school-fotos__swiper-button-prev",
      },
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
    });
  } else {
    swiper2 = new Swiper(".school-fotos__swiper-container", {
      initialSlide: 2,
      slidesPerView: 3,
      centeredSlides: true,
      loop: false,
      loopedSlides: 3,
      spaceBetween: 30,
      speed: 500,
      effect: "slide",
      navigation: {
        nextEl: ".school-fotos__swiper-button-next",
        prevEl: ".school-fotos__swiper-button-prev",
      },
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
      autoplay: {
        delay: 2500, // время задержки между слайдами (в мс)
        disableOnInteraction: false, // продолжать ли автопроигрывание после взаимодействия пользователя со слайдером
      },
    });
  }
  //Gallery

  Fancybox.bind("[data-fancybox]", {
    Toolbar: false,
    ClickSlide: "close",
    // Your custom options
  });

  //Программа обучения
  let swiper3;

  if (window.innerWidth < 936) {
    swiper3 = new Swiper(".program__swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      sticky: true,
    });
  } else {
    swiper3 = new Swiper(".program__swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 0,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      sticky: true,
    });
  }

  let tabPanes = document.querySelectorAll(".program__tab-pane");
  let tabs = document.querySelectorAll(".program__tab-header");
  let image = document.querySelector(".program__img");

  // Массив с URL-адресами изображений
  let images = [
    "images/program-img-lg-1.jpg",
    "images/program-img-lg-1.jpg",
    "images/program-img-lg-1.jpg",
    "images/program-img-lg-1.jpg",
  ];
  // Загрузка содержимого первой вкладки при старте страницы
  tabPanes[0].style.display = "block";
  tabs[0].classList.add("program__tab-header--active");
  image.src = images[0];

  if (window.innerWidth < 936) {
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        for (let i = 0; i < tabPanes.length; i++) {
          if (i === index) {
            tabPanes[i].style.display = "block";
            tabs[i].classList.add("program__tab-header--active");
            image.src = images[i]; // Изменение изображения
          } else {
            tabPanes[i].style.display = "none";
            tabs[i].classList.remove("program__tab-header--active");
          }
        }
      });
    });
  } else {
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        for (let i = 0; i < tabPanes.length; i++) {
          if (i === index) {
            tabPanes[i].style.display = "block";
            tabs[i].classList.add("program__tab-header--active");
            tabs[i].classList.add(
              "program__tab-header-" + (i + 1) + "--active"
            ); // Добавление класса активной вкладке
          } else {
            tabPanes[i].style.display = "none";
            tabs[i].classList.remove("program__tab-header--active");
            tabs[i].classList.remove(
              "program__tab-header-" + (i + 1) + "--active"
            ); // Удаление класса активной вкладки
          }
        }
      });
    });
  }

  // timetable

  let timetableOuterSwiper = new Swiper(".timetable__swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    sticky: true,
    // loop: true,
  });

  let timetableTabPanes = document.querySelectorAll(".timetable__tab-pane");
  let timetableTabHeaders = document.querySelectorAll(".timetable__tab-header");

  timetableTabHeaders.forEach((header, index) => {
    header.addEventListener("click", () => {
      timetableOuterSwiper.slideTo(index);
      timetableTabPanes.forEach((pane, paneIndex) => {
        pane.style.display = paneIndex === index ? "block" : "none";
        timetableTabHeaders[paneIndex].classList.toggle(
          "timetable__tab-header--active",
          paneIndex === index
        );
      });
    });
  });

  if (window.innerWidth < 936) {
    let timetableInnerSwipers = document
      .querySelectorAll(".timetable-daily__swiper-container")
      .forEach(function (element) {
        new Swiper(element, {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 30,
          navigation: {
            nextEl: ".timetable-daily__swiper-button-next",
            prevEl: ".timetable-daily__swiper-button-prev",
          },
        });
      });
  }

  // Load the first tab content on page load
  window.onload = function () {
    timetableTabPanes[0].style.display = "block";
    timetableTabHeaders[0].classList.add("timetable__tab-header--active");
  };

  //accordion-vision
  if (window.innerWidth < 936) {
    let acc = document.getElementsByClassName("vision__button");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        let active = document.querySelector(".vision__button--active");
        if (active && active != this) {
          active.classList.remove("vision__button--active");
          active.nextElementSibling.style.maxHeight = null;
          active.innerHTML = active.innerHTML.replace("-", "+");
        }
        this.classList.toggle("vision__button--active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          this.innerHTML = this.innerHTML.replace("-", "+");
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          this.innerHTML = this.innerHTML.replace("+", "-");
        }
      });
    }
  } else {
    $(document).ready(function () {
      $(".vision__carousel").slick({
        vertical: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 1000,
        pauseOnHover: true,
        arrows: false,
        dots: false,
        infinite: true,
      });
    });
    // Подставляем заголовок описания
    const sourceElementDescriptionTitle =
      document.querySelector(".vision__title");
    const targetElementDescriptionTitle = document.querySelector(
      ".vision__carousel-title"
    );

    if (sourceElementDescriptionTitle && targetElementDescriptionTitle) {
      targetElementDescriptionTitle.textContent =
        sourceElementDescriptionTitle.textContent;
    }

    //Работа карусели
    // Находим все элементы с классом vision__carousel-item и vision__button
    const carouselItems = document.querySelectorAll(".vision__carousel-item");
    const buttons = document.querySelectorAll(".vision__button");

    // Проходим по каждому элементу vision__carousel-item
    carouselItems.forEach((item, index) => {
      // Берем текст из соответствующего элемента vision__button и помещаем его в элемент vision__carousel-item
      if (buttons[index]) {
        item.textContent = buttons[index].textContent;
      }

      // Добавляем обработчик события click на каждый элемент vision__carousel-item
      item.addEventListener("click", () => {
        // Находим элементы vision__carousel-description и vision__carousel-title
        const description = document.querySelector(
          ".vision__carousel-description"
        );
        const title = document.querySelector(".vision__carousel-title");

        // Берем текст из соответствующего элемента vision__button и помещаем его в элементы vision__carousel-description и vision__carousel-title
        if (buttons[index] && description && title) {
          description.textContent =
            buttons[index].nextElementSibling.textContent;
          title.textContent = buttons[index].textContent;
        }
      });
    });
  }

  //people
  let swiperPeople;
  if (window.innerWidth < 936) {
    swiperPeople = new Swiper(".people__swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 50,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: ".people__swiper-button-next",
        prevEl: ".people__swiper-button-prev",
      },
      pagination: {
        el: ".people__swiper-pagination",
        clickable: true,
      },
    });
  } else {
    document
      .querySelector(".people__show-more")
      .addEventListener("click", function () {
        let hiddenCards = document.querySelectorAll(
          ".people__swiper-slide.people__swiper-slide--hidden"
        );
        let button = document.querySelector(".people__show-more");

        if (button.textContent === "Свернуть") {
          // Если все карточки открыты, скрываем все кроме первых трех
          let visibleCards = document.querySelectorAll(
            ".people__swiper-slide:not(.people__swiper-slide--hidden)"
          );
          for (let i = 3; i < visibleCards.length; i++) {
            visibleCards[i].classList.add("people__swiper-slide--hidden");
          }
          // Меняем текст кнопки обратно на "Еще смотреть"
          button.textContent = "Еще смотреть";
          // Прокручиваем страницу к элементу с id="people__swiper-wrapper"
          let currentScrollPosition = scroller.scroll.instance.scroll.y;

          let targetElement = document.getElementById("people__swiper-wrapper");
          let targetPosition =
            targetElement.getBoundingClientRect().top +
            currentScrollPosition -
            headerHeightFixed;

          console.log("currentScrollPosition is " + currentScrollPosition);
          console.log("targetPosition is " + targetPosition);

          scroller.scrollTo(targetPosition, { duration: 800 });
        } else {
          // Если есть скрытые карточки, показываем следующие три
          for (let i = 0; i < 3; i++) {
            if (hiddenCards[i]) {
              hiddenCards[i].classList.remove("people__swiper-slide--hidden");
            }
          }
          // Если больше нет скрытых карточек, меняем текст кнопки на "Свернуть"
          if (
            document.querySelectorAll(
              ".people__swiper-slide.people__swiper-slide--hidden"
            ).length === 0
          ) {
            button.textContent = "Свернуть";
          }
        }
      });
  }

  //testimonials

  //testimomial swiper
  $(document).ready(function () {
    $(".testimonials__slider").slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      // centerMode: true,
      infinite: true,
      arros: true,
      nextArrow: $(".testimonials__arrow--next"),
      prevArrow: $(".testimonials__arrow--prev"),
      responsive: [
        {
          breakpoint: 963,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arros: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            // centerMode: false,
            arrows: true,
            nextArrow: $(".testimonials__arrow--next"),
            prevArrow: $(".testimonials__arrow--prev"),
          },
        },
      ],
    });
  });

  // Сворачиваем блоки длинные текста
  //Обязательно указать высоту строки для сворачиваемого блока

  //В отзывах 8-9 строк
  $(".expander__wrapper").each(function () {
    let wrapper = $(this);
    let textElement = wrapper.find(".expander__text");
    let fullHeight;

    const maxLinesMobile = 9;
    const maxLinesDesktop = 8;

    let lineHeight = parseFloat(textElement.css("line-height"));
    let maxLines = window.innerWidth < 936 ? maxLinesMobile : maxLinesDesktop;
    let maxHeight = lineHeight * maxLines;

    let button = $('<button class="expander__button">Читать далее</button>');
    textElement.after(button);
    textElement.css("overflow", "hidden");
    textElement.css("height", maxHeight + "px");

    button.on("click", function () {
      fullHeight = textElement.prop("scrollHeight");

      if (textElement.height() > maxHeight) {
        textElement.animate({ height: maxHeight + "px" });
        $(this).text("Читать далее");
      } else {
        textElement.animate({ height: fullHeight + "px" });
        $(this).text("Свернуть");
      }
    });

    button.on("blur", function () {
      if (textElement.height() > maxHeight) {
        textElement.animate({ height: maxHeight + "px" });
        button.text("Читать далее");
      }
    });
  });

  //4-5 строк футер и педсостав
  $(".expander__wrapper--4-5").each(function () {
    let wrapper = $(this);
    let textElement = wrapper.find(".expander__text--4-5");
    let fullHeight;

    const maxLinesMobile = 4;
    const maxLinesDesktop = 5;

    let lineHeight = parseFloat(textElement.css("line-height"));
    let maxLines = window.innerWidth < 936 ? maxLinesMobile : maxLinesDesktop;
    let maxHeight = lineHeight * maxLines;

    let button = $(
      '<button class="expander__button--4-5">Читать далее</button>'
    );
    textElement.after(button);
    textElement.css("overflow", "hidden");
    textElement.css("height", maxHeight + "px");

    button.on("click", function () {
      fullHeight = textElement.prop("scrollHeight");

      if (textElement.height() > maxHeight) {
        textElement.animate({ height: maxHeight + "px" });
        $(this).text("Читать далее");
      } else {
        textElement.animate({ height: fullHeight + "px" });
        $(this).text("Свернуть");
      }
    });

    button.on("blur", function () {
      if (textElement.height() > maxHeight) {
        textElement.animate({ height: maxHeight + "px" });
        button.text("Читать далее");
      }
    });
  });

  //accordion-questions
  const acc = document.getElementsByClassName("questions__button");

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      const active = document.querySelector(".questions__button--active");
      if (active && active != this) {
        active.classList.remove("questions__button--active");
        active.nextElementSibling.style.maxHeight = null;
        active.innerHTML = active.innerHTML.replace("-", "+");
      }
      this.classList.toggle("questions__button--active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        this.innerHTML = this.innerHTML.replace("-", "+");
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        this.innerHTML = this.innerHTML.replace("+", "-");
      }
    });
  }

  //footer swiper
  let footerSwiper;
  let numOfSlides = document.querySelectorAll(".footer__news-slide").length;
  let numOfSlidesToAdd = numOfSlides % 2;

  if (window.innerWidth < 936) {
    footerSwiper = new Swiper(".footer__news-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: ".footer__slider-arrow--next",
        prevEl: ".footer__slider-arrow--prev",
      },
    });
  } else {
    //slick
    $(document).ready(function () {
      $(".footer__slick-slider").slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        nextArrow: $(".footer__slick-arrow"),
        prevArrow: false,
        autoplay: false,
        autoplaySpeed: 2000,
      });
    });
  }

  //YandexMap
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [59.961691, 30.308902], // координаты центра карты
      zoom: 17,
      controls: [], // убирает все элементы управления
      behaviors: ["drag"], // позволяет только перетаскивать карту
    });

    var myPlacemark = new ymaps.Placemark(
      [59.961691, 30.308902],
      {},
      {
        // координаты маркера
        iconLayout: "default#image",
        iconImageHref: "images/footer-map-placemarker.svg", // путь к вашему пользовательскому изображению
        iconImageSize: [52, 75], // размеры вашего изображения
        iconImageOffset: [-26, -75], // смещение изображения
      }
    );

    myMap.geoObjects.add(myPlacemark);

    //Модальное окно
    let modal = document.querySelector(".modal-contact");
    let btns = document.querySelectorAll(".form-button");
    let span = document.querySelector(".modal-contact__close-btn");
    let header = document.querySelector(".header");
    btns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "block";
        header.style.display = "none";
      });
    });
    span.onclick = function () {
      modal.style.display = "none";
      header.style.display = "block";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  //Переопределяем якорные ссылки обрабатывая их кастомных скроллером
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      let targetElement = document.querySelector(this.getAttribute("href"));
      let targetPosition =
        targetElement.getBoundingClientRect().top +
        scroller.scroll.instance.scroll.y - 
        headerHeightFixed;

      scroller.scrollTo(targetPosition, 0, 0);
    });
  });

});


