import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const PageOne = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Page One</Text>
    </View>
  );
}

const PageTwo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Page One</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootSiblingParent>
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Page 1" component={PageOne} />
          <Tab.Screen name="Page 2" component={PageTwo} />
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
    alignItems: 'center'
  },
  Text: {
    marginVertical: 20,
  },
});