import { format } from 'date-fns'

class Weather {
  key = '49dea5168d1542f88fc212246230308'
  constructor (city) {
    this.city = city
  }

  async summary () {
    try {
      const response = await this.current()
      const city = response.location.name
      const condition = response.current.condition.text
      const icon = response.current.condition.icon
      const date = new Date(response.location.localtime)
      const localtime = format(date, 'HH:mm')
      const localdate = format(date, 'eeee, MMM do yy')
      const temp = `${response.current.temp_c} &deg;C`
      const day = response.current.is_day

      return { day, city, condition, icon, temp, localtime, localdate }
    } catch (e) {
      console.log('There was a problem. \nFull error log:\n', e)
    }
  }

  async details () {
    try {
      const response = await this.current()
      const cloud = `${response.current.cloud} &percnt;`
      const feel = `${response.current.feelslike_c} &deg;C`
      const humidity = `${response.current.humidity} &percnt;`
      const wind = `${response.current.wind_kph} km/h`

      return { cloud, feel, humidity, wind }
    } catch (e) {
      console.log('There was a problem. \nFull error log:\n', e)
    }
  }

  async forecast () {
    try {
      const response = await this.current()
      const forecast = response.forecast.forecastday
      const days = []

      forecast.forEach(function (thisday) {
        const day = {
          date: thisday.date,
          avgtemp: thisday.day.avgtemp_c,
          avghumidity: thisday.day.avghumidity,
          maxtemp: thisday.day.maxtemp_c,
          mintemp: thisday.day.mintemp_c,
          rain: thisday.day.daily_chance_of_rain
        }
        days.push(day)
      })
      return days
    } catch (e) {
      console.log('There was a problem. \nFull error log:\n', e)
    }
  }

  async current () {
    const url = `http://api.weatherapi.com/v1/forecast.json?q=${this.city}&key=${this.key}&days=3`
    const request = await fetch(url, { mode: 'cors' })
    const response = await request.json()
    return response
  }
}

export { Weather }
