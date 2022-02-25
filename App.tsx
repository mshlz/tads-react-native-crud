import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Database } from './src/db/Database';
import { ContactsPage } from './src/pages/Contact/ContactPage';

export default function App() {

  Database.initDb(!true)

  return <View>
    <StatusBar style='inverted' translucent={false}/>
    <ContactsPage />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
