import { DOM } from './dom.js'
import { Weather } from './api.js'
import './assets/styles.scss'

async function displayWeather (city) {
  const now = new Weather(city)
  const summary = await now.summary()
  const details = await now.details()
  let salut

  if (summary.day === 1) {
    salut = 'Good Day'
  } else if (summary.day === 0) {
    salut = 'Good Night'
  }

  DOM.salut.innerHTML = salut
  DOM.city.innerHTML = summary.city
  DOM.date.innerHTML = summary.localdate
  DOM.time.innerHTML = summary.localtime
  DOM.condition.innerHTML = summary.condition
  DOM.condImg.src = summary.icon
  DOM.temp.innerHTML = summary.temp
  DOM.cloud.innerHTML = details.cloud
  DOM.humidity.innerHTML = details.humidity
  DOM.wind.innerHTML = details.wind
}

DOM.query.addEventListener('focusin', (e) => {
  DOM.btn.style.backgroundColor = 'hsla(0,0%,80%,1)'
  console.log('check')
})
DOM.query.addEventListener('focusout', (e) => {
  DOM.btn.style.backgroundColor = 'transparent'
  console.log('check')
})

DOM.form.addEventListener('submit', (e) => {
  e.preventDefault()
  const query = DOM.query.value

  displayWeather(query)
  e.target.reset()
})

window.addEventListener('load', () => {
  displayWeather('Maputo')
})
