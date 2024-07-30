import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import Weather from './components/Weather';
import Gallery from './components/Gallery';

export default function App() {

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Weather />
        <Gallery />
        <StatusBar style="auto" />
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
    marginVertical: 20,
  },
});