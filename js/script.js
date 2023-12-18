$(document).ready(() => {
  const root = document.documentElement

  //HIDE POPUP
  setTimeout(() => {
    $(".form-popUp").css("display", "none")
    $(".form-popUp").css("opacity", "1")
  }, 100)
  //
  //SMOOTH SCROLL
  function smoothScrollInitialization() {
    SmoothScroll({
      // Время скролла 400 = 0.4 секунды
      animationTime: 800,
      // Размер шага в пикселях
      stepSize: 75,

      // Дополнительные настройки:

      // Ускорение
      accelerationDelta: 30,
      // Максимальное ускорение
      accelerationMax: 2,

      // Поддержка клавиатуры
      keyboardSupport: true,
      // Шаг скролла стрелками на клавиатуре в пикселях
      arrowScroll: 50,

      // Pulse (less tweakable)
      // ratio of "tail" to "acceleration"
      pulseAlgorithm: true,
      pulseScale: 4,
      pulseNormalize: 1,

      // Поддержка тачпада
      touchpadSupport: true,
    })
  }

  smoothScrollInitialization()

  //SMOOTH SCROLL
  // CALC

  var currencySave
  const depositRange = document.querySelector("#input-dep")
  const resultSum = document.querySelector(".calculator__output-sum")
  const euroCounty = [
    "AT",
    "CH",
    "DE",
    "LI",
    "LU",
    "BE",
    "CZ",
    "ES",
    "FR",
    "GR",
    "HU",
    "IT",
    "NL",
    "PL",
    "PT",
    "RO",
    "RS",
    "HR",
    "SK",
    "SL",
    "DK",
    "FI",
    "NO",
    "SE",
  ]

  fetch("https://amos-mamaya.fun/geo")
    .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
    .then((data) => {
      if (euroCounty.includes(data.country_code)) {
        currencySave = "€"
      } else if (data.country_code == "GB") {
        currencySave = "£"
      } else {
        currencySave = "$"
      }
    })
    .catch((error) => {
      console.log(`Something went wrong... Status: ${error}`)
      currencySave = "$"
    })
    .finally(() => {
      function updateAllInputResults(data) {
        const sum = depositRange.value
        resultSum.innerText = `${currencySave}${Math.round(sum * 5.226)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`
      }

      $("#input-dep").ionRangeSlider({
        min: 250,
        max: 10000,
        from: 250,
        prefix: currencySave,
        onChange: function (data) {
          updateAllInputResults(data)
        },
      })
    })

  // CALC
  // MODAL

  $(".more-button").click(() => {
    $(".form-popUp").fadeIn(300)
  })
  const modalItem = document.querySelector(".form-popUp")
  modalItem.addEventListener("click", (event) => {
    if (event.target.classList.contains("form-popUp__wrapper")) {
      $(".form-popUp").fadeOut(300)
    }
  })

  // MODAL
  // USERS LINE

  const marqueeContent = document.querySelector(".running-line-container")
  root.style.setProperty("--marquee-elements", marqueeContent.children.length)
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed")
  for (let index = 0; index < 15; index++) {
    marqueeContent.appendChild(marqueeContent.children[index].cloneNode(true))
  }

  // USERS LINE
  // TIMER

  startTimer(60 * 4.9, $(".countdown"))

  // TIMER

  // SLIDES

  // setInterval(function () {
  //   let currentSlide = $(".slide.active")
  //   let nextSlide = currentSlide.next(".slide")
  //   if (nextSlide.length === 0) {
  //     nextSlide = $(".slide:first-child")
  //   }
  //
  //   currentSlide.removeClass("active")
  //   setTimeout(() => nextSlide.addClass("active"), 1000)
  // }, 6000)

  // SLIDES
})

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds
  setInterval(function () {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = divideNumber(minutes < 10 ? "0" + minutes : minutes)
    seconds = divideNumber(seconds < 10 ? "0" + seconds : seconds)

    display.html(`${minutes} <span>:</span> ${seconds}`)

    if (--timer < 0) {
      timer = 0
    }
  }, 1000)
}

function divideNumber(num) {
  let result = ``

  for (let i of num.toString()) {
    result += `<span class="number">${i}</span>`
  }
  return result
}
