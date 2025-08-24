# GeoLocation Weather App

This project is a simple React Native application that displays the user's current location and weather information using the OpenWeatherMap API.

## Features

- Requests location permission and fetches the user's current latitude and longitude.
- Displays weather details including description, temperature, humidity, wind speed, pressure, visibility, and cloud coverage.
- Uses [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) for geolocation and [OpenWeatherMap](https://openweathermap.org/) for weather data.

## Setup

1. **Clone the repository**  
   ```
   git clone <your-repo-url>
   cd geoLocation1
   ```

2. **Install dependencies**  
   ```
   npm install
   ```

3. **Set your OpenWeatherMap API key**  
   Replace the value of `API_KEY` in [`App.js`](App.js) with your own API key from [OpenWeatherMap](https://openweathermap.org/api).

4. **Run the app**  
   ```
   npx expo start
   ```
   Follow the instructions to run on your device or emulator.

## Usage

- On launch, the app will request permission to access your location.
- If granted, it will display your latitude and longitude, along with current weather details.

## Dependencies

- react-native
- expo-location

## License

This project is for educational purposes.
