// App.js
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa las pantallas desde archivos separados
import Pantalla1 from './screens/camera';
import Pantalla2 from './screens/gallery';

// Pantalla Home con los botones estilizados
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pantalla1')}
      >
        <Text style={styles.buttonText}>Ir a Pantalla 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pantalla2')}
      >
        <Text style={styles.buttonText}>Ir a Pantalla 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Oculta la barra de título en la pantalla de inicio
        />
        <Stack.Screen name="Pantalla1" component={Pantalla1} />
        <Stack.Screen name="Pantalla2" component={Pantalla2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Estilos personalizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
