// App.js
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importa las pantallas desde archivos separados
import Pantalla1 from './screens/camera'; // Pantalla de cámara
import Pantalla2 from './screens/gallery'; // Pantalla de galería
import PantallaAcciones from './screens/savedphoto'; // Pantalla de acciones con la foto guardada

// Pantalla Home con los botones estilizados
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pantalla1')}
      >
        <Text style={styles.buttonText}>Ir a Pantalla de Cámara</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pantalla2')}
      >
        <Text style={styles.buttonText}>Ir a Galería</Text>
      </TouchableOpacity>
    </View>
  );
}

// Crear el Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pantalla de Inicio */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Ocultar la barra de título en la pantalla de inicio
        />
        {/* Pantalla de Cámara */}
        <Stack.Screen 
          name="Pantalla1" 
          component={Pantalla1} 
          options={{ title: 'Cámara' }} // Título en la barra superior para Pantalla1
        />
        {/* Pantalla de Galería */}
        <Stack.Screen 
          name="Pantalla2" 
          component={Pantalla2} 
          options={{ title: 'Galería' }} // Título en la barra superior para Pantalla2
        />
        {/* Pantalla de Acciones después de guardar la foto */}
        <Stack.Screen 
          name="PantallaAcciones" 
          component={PantallaAcciones} 
          options={{ title: 'Acciones con la Foto Guardada' }} // Título en la barra superior para PantallaAcciones
        />
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
