//меняем рандомно цвет фона карточек
// Список цветов
let colors = ["#BDCDFF", "#E9D3BE", "#FF917A", "#84A2FF"];

// Получаем все карточки
let cards = document.querySelectorAll(".testimonials-card");

// Индекс последнего выбранного цвета
let lastColorIndex = -1;

// Применяем случайный цвет к каждой карточке
cards.forEach(function (card) {
  let colorIndex;
  do {
    colorIndex = Math.floor(Math.random() * colors.length);
  } while (colorIndex === lastColorIndex);

  let color = colors[colorIndex];
  card.style.backgroundColor = color;
  lastColorIndex = colorIndex;

  //Меняем цвет фейда в конце свернутого текста
  // Находим элемент с классом 'testimonials-card__text-wrapper' внутри карточки
  let textWrapper = card.querySelector(".testimonials-card__text-wrapper");
  if (textWrapper) {
    // Меняем стиль background для ::after
    textWrapper.style.setProperty("--gradient-color", color);
  }
});

//сворачиваем текст
document.querySelectorAll(".testimonials-card").forEach(function (card) {
  let textWrapper = card.querySelector(".testimonials-card__text-wrapper");
  let text = card.querySelector(".testimonials-card__text");
  let button = card.querySelector(".testimonials-card__read-more");

  if (window.innerWidth < 936) {
    // Вычисляем высоту строки
    let lineHeight = parseFloat(getComputedStyle(text).lineHeight);
    let sevenLinesHeight = lineHeight * 5;

    // Проверка высоты текста и сравнение с максимальной высотой
    if (text.scrollHeight > sevenLinesHeight) {
      textWrapper.style.maxHeight = sevenLinesHeight + "px"; // Устанавливаем ограничение по высоте
      button.style.display = "block"; // Показать кнопку, если текст не помещается
      textWrapper.classList.add("gradient"); // Добавляем класс для градиента
    } else {
      button.style.display = "none"; // Скрыть кнопку, если текст помещается
      textWrapper.classList.remove("gradient"); // Убираем класс для градиента
    }

    button.addEventListener("click", function () {
      if (this.textContent === "Читать дальше") {
        textWrapper.style.maxHeight = text.scrollHeight + "px"; // Убираем ограничение по высоте
        this.textContent = "Меньше";
        textWrapper.classList.remove("gradient"); // Убираем класс для градиента
      } else {
        textWrapper.style.maxHeight = sevenLinesHeight + "px"; // Возвращаем ограничение по высоте
        this.textContent = "Читать дальше";
        textWrapper.classList.add("gradient"); // Добавляем класс для градиента
      }
    });
  } else {
    // Вычисляем высоту строки
    let lineHeight = parseFloat(getComputedStyle(text).lineHeight);
    let sevenLinesHeight = lineHeight * 7;

    // Проверка высоты текста и сравнение с максимальной высотой
    if (text.scrollHeight > sevenLinesHeight) {
      textWrapper.style.maxHeight = sevenLinesHeight + "px"; // Устанавливаем ограничение по высоте
      button.style.display = "block"; // Показать кнопку, если текст не помещается
      textWrapper.classList.add("gradient"); // Добавляем класс для градиента
    } else {
      button.style.display = "none"; // Скрыть кнопку, если текст помещается
      textWrapper.classList.remove("gradient"); // Убираем класс для градиента
    }

    button.addEventListener("click", function () {
      if (this.textContent === "Читать дальше") {
        textWrapper.style.maxHeight = text.scrollHeight + "px"; // Убираем ограничение по высоте
        this.textContent = "Меньше";
        textWrapper.classList.remove("gradient"); // Убираем класс для градиента
      } else {
        textWrapper.style.maxHeight = sevenLinesHeight + "px"; // Возвращаем ограничение по высоте
        this.textContent = "Читать дальше";
        textWrapper.classList.add("gradient"); // Добавляем класс для градиента
      }
    });
  }
});

//testimomial swiper
let swiperTestimonial;

window.onload = function () {
  if (window.innerWidth < 936) {
    swiperTestimonial = new Swiper(".testimonials__swiper", {
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      spaceBetween: 50,
      navigation: {
        nextEl: ".testimonials__button-next",
        prevEl: ".testimonials__button-prev",
      },
      pagination: {
        el: ".testimonials__swiper-pagination",
        clickable: true,
      },
    });
  } else {
    //Swiperjs
    // swiperTestimonial = new Swiper(".testimonials__swiper", {
    //   direction: "horizontal",
    //   loop: true,
    //   centeredSlides: true,
    //   slidesPerView: 3,
    //   spaceBetween: 20,
    //   loopAdditionalSlides: 30,
    //   pagination: {
    //     el: ".testimonials__swiper-pagination",
    //   },
    // });

    //slick
    console.log("slick is runnig");
    $(document).ready(function () {
      $(".testimonials__slick-slider").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 2000,
      });
    });
  }
};