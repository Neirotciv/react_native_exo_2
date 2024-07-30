import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Location from 'expo-location';
import { OW_API_KEY } from '@env';
import Loading from './Loading';

export default function Weather() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location != null) {
      (async () => {
        try {
          const longitude = location.coords.longitude;
          const latitude = location.coords.latitude;
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OW_API_KEY}&units=metric`);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('ow', error);
        }
      })();
    }
  }, [location]);

  if (!location || !weatherData) {
    <Loading />
  }

  return (
    <>
      {weatherData ? (
        <View style={styles.card}>
          <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          <View style={styles.weatherContainer}>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
              style={{ width: 50, height: 50 }} />
            <Text style={styles.weather}>{weatherData.weather[0].description}</Text>
          </View>
          <Text style={styles.location}>{weatherData.name}</Text>
        </View>
      ) : (
        <Loading />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    width: '100%',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000'
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  weather: {
    fontSize: 24,
    color: '#000000'
  },
  location: {
    fontSize: 16,
    color: '#888888',
    marginTop: 10
  }
});