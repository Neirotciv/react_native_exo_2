import { Text, View, StyleSheet, Image } from 'react-native';

export default function City({ city }) {
  return (
    <View View style={styles.card} >
      {console.log(city.weather)}
      <Text style={styles.location}>{city.name}</Text>
      <Text style={styles.temperature}>{city.weather.main.temp}°C</Text>
      <Image source={{ uri: `https://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png` }}
        style={{ width: 50, height: 50 }} />
      <Text style={styles.weather}>{city.weather.description}</Text>
    </View >
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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