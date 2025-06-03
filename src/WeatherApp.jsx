import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
	const [city, setCity] = useState("");

	const [weatherData, setweatherData] = useState(null);

	const urlBase = "https://api.openweathermap.org/data/2.5/weather"; // Base URL for the OpenWeatherMap API
	const API_KEY = "USER_API_KEY"; // Your OpenWeatherMap API key
	const difKelvin = 273.15; // Diference between Kelvin and Celsius

	const fetchWeatherData = async () => {
		try {
			const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
			const data = await response.json();
			setweatherData(data);
		} catch (error) {
			console.error("Error fetching weather data:", error);
		}
	};

	const handleCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchWeatherData();
	};

	return (
		<div className="container">
			<h1>Weather App</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					id="city"
					placeholder="Enter city name"
					value={city}
					onChange={handleCityChange}
				/>
				<button type="submit">Search</button>
			</form>

			{weatherData && (
				<div>
					<h2>
						Weather in {weatherData.name}, {weatherData.sys.country}
					</h2>
					<p>
						Temperature: {(weatherData.main.temp - difKelvin).toFixed(2)} °C
					</p>
					<p>Humidity: {weatherData.main.humidity} %</p>
					<p>Wind Speed: {weatherData.wind.speed} m/s</p>
					<p>Description: {weatherData.weather[0].description}</p>
					<img
						src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
						alt={weatherData.weather[0].description}
					/>
				</div>
			)}
		</div>
	);
};
