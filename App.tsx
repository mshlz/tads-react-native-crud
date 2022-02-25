import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ContactsPage } from './src/pages/Contact/ContactPage';

export default function App() {
  return <View>
    <StatusBar style='inverted' translucent={false}/>
    <ContactsPage />
  </View>
}
