import React, { useEffect, useState } from "react";
import WeatherAPI from "../../api/weather/main";
import HeadImage from "../../assets/head.png";
import { FaEye, FaSuperpowers, FaWater, FaWind } from "react-icons/fa";
import Swal from "sweetalert2";
const api = new WeatherAPI();

function Home() {

  const [search, setSearch] = useState("Delhi");
  const [data, setData] = useState();

  const getData = async (place) => {
    if (!place) {
      place = 'Nowhere';
    }
    const response = await api.getWeather(place);
    if (response.cod === '404'|| response.cod === '400') {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There is No Place Like This!",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      handlePlaceCall();
      return null; // Return null in case of an error
    } else {
      const Toast = Swal.mixin({
        toast: true,
        customClass: {
          popup: 'colored-toast'
        },
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        iconColor: "white",
        timerProgressBar: true
      })
      Toast.fire({
        icon: "success",
        title: "Success!"
      })
      return response; // Return the response data
    }
  };


  const handlePlaceCall = async () => {
    const {value: place} = await Swal.fire(
      {
        title: "New Place",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        inputPlaceholder: "Enter New Place",
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        }
      }
    )
    const response =await getData(place)
    setData(response);
    localStorage.setItem("data", JSON.stringify(response));
  }

  useEffect(() => {
    const localdata =localStorage.getItem("data")
    if (localdata){
      setData(JSON.parse(localdata));
    }else{
      const fetchData = async () => {
        await handlePlaceCall();
      };
      fetchData();
    }
  }, []);

  return (
    <>
      {data && (
        <div className="flex flex-col justify-center items-center h-full">
          <img src={HeadImage} alt="" className="w-1/5" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-5xl my-5 text-center">{data.name}</p>
            <p className="text-3xl">Temp: {data.main.temp}</p>
            <div className="flex my-5">
              <WeatherCard icon={<FaEye />} text={'Visibility'} data={data.visibility} />
              <WeatherCard icon={<FaSuperpowers />} text={'Wind'} data={data.wind.speed} />
              <WeatherCard icon={<FaWater />} text={'Humidity'} data={data.main.humidity} />
              <WeatherCard icon={<FaWind />} text={'Pressure'} data={data.main.pressure} />
            </div>
            <hr className="w-full rounded-lg h-5 " />
            <p className="text-3xl">{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</p>
          </div>
          <button className="btn w-1/4 shadow-xl bg-gradient-to-l from-orange-300 to-orange-500 p-2 m-5 rounded-lg font-extrabold" onClick={handlePlaceCall}>New Place</button>
        </div>
      )}
    </>
  );
}

function WeatherCard({ text, icon, data }) {
  return (
    <div className="weather-card bg-slate-200 rounded-lg shadow-lg px-5 py-4 m-3">
      <div className="flex flex-row items-center gap-2">
        <h1>{text}</h1>
        {icon}
      </div>
      <p className="text-3xl font-bold">{data}</p>
    </div>
  );
}
export default Home;
