import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const API_KEY = 'b06ea8dbdd41987a2bb7ee45aeec8781'; // Replace with your actual API key
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      if (status === 'granted') {
        console.log('Approved');
        let location = await Location.getCurrentPositionAsync({});
        console.log(JSON.stringify(location.coords));
        setLat(location.coords.latitude);
        setLon(location.coords.longitude);
        setLocation(location);
        fetchWeatherData();
        console.log('Weather:', weatherData);
      }
    })();

  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      console.log('Response:', `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  let textLocation = 'Loading....';
  if (errorMsg) {
    textLocation = errorMsg;
  } else if (location) {
    textLocation = `Latitude: ${lat}\n Longitude: ${lon}`;
  }
  return (
    <View style={styles.container}>

      <Text style={styles.text}>{textLocation}</Text>

      {weatherData && (
        <>
          <Text style={styles.text}>
            Weather: {weatherData.weather[0].description}
          </Text>
          <Text style={styles.text}>
            Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
          </Text>
          <Text style={styles.text}>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text style={styles.text}>
            Wind Speed: {weatherData.wind.speed} m/s
          </Text>
          <Text style={styles.text}>
            Pressure: {weatherData.main.pressure} hPa
          </Text>
          <Text style={styles.text}>
            Visibility: {weatherData.visibility / 1000} km
          </Text>
          <Text style={styles.text}>
            Clouds: {weatherData.clouds.all}%
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
