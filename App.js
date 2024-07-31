import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CitiesWeatherScreen from './screens/CitiesWeatherScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Weather from './components/Weather';
import Gallery from './components/Gallery';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Weather />
      <Gallery />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootSiblingParent>
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Météo par villes" component={CitiesWeatherScreen} />
          <Tab.Screen name="Favoris" component={FavoritesScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </RootSiblingParent>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
  },
  Text: {
    marginVertical: 20,
  },
});