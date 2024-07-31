import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { OW_API_KEY } from '@env';
import City from '../components/City';

export default function CityWeatherScreen() {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    if (city !== '') {
      getCityPosition(city)
        .then((position) => {
          getWeatherData(position.latitude, position.longitude)
            .then((data) => {
              console.log(data)
              const newCity = {
                name: data.name,
                weather: data,
              };
              setCities([...cities, newCity]);
            });
        });
    }
  }, [city]);

  const getCityPosition = async (city) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${OW_API_KEY}`);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      return {
        latitude: data[0].lat,
        longitude: data[0].lon,
      };
    } catch (error) {
      console.error('ow', error);
    }
  }

  const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OW_API_KEY}&units=metric`);

      if (!response.ok) {
        throw new Error('Weather data not found');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ow', error);
    }
  }

  const handleAddCity = () => {
    const isCityExist = cities.some(c => c.name === cityInput);
    if (isCityExist) {
      setCityInput('');
      return;
    }

    setCity(cityInput);
    setCityInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cities.length !== 0 && cities.map((city, index) => (
          <City key={index} city={city} />
        ))}
      </ScrollView>
      <View style={styles.horizontalWrapper}>
        <TextInput
          onChangeText={text => setCityInput(text)}
          value={cityInput}
          style={styles.textInput}
          placeholder='Ajouter une ville'
        />
        <Pressable
          onPress={handleAddCity}
          title="Ajouter"
          color="#841584"
          style={styles.button}
        >
          <Text style={styles.text}>Ajouter</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  horizontalWrapper: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});