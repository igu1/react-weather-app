class WeatherAPI {
  constructor() {
    this.baseURL =
      "https://api.openweathermap.org/data/2.5/weather?appid=51cbd37eb82e8ce2609606c847c0f3b9&units=metric";
  }

  async getWeather(city) {
    const data = await fetch(`${this.baseURL}&q=${city}`);
    return await data.json();
  }

}


export default WeatherAPI;