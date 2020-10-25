const axios = require('axios')

const URL = 'https://api.openweathermap.org/data/2.5/weather'

exports.handler = async function (event, context, callback) {
  const { q } = event.queryStringParameters
  const { data } = await axios.get(URL, {
    params: {
      q,
      units: 'metric',
      APPID: process.env.WEATHER_API_KEY
    }
  })
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data)
  })
}
