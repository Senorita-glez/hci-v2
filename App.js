import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemedButton } from 'react-native-really-awesome-button';
// Importa las pantallas desde archivos separados
import Pantalla1 from './screens/camera'; // Pantalla de cámara
import Pantalla2 from './screens/gallery'; // Pantalla de galería
import PantallaAcciones from './screens/savedphoto'; // Pantalla de acciones con la foto guardada

// Pantalla Home con los botones estilizados
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido 👋</Text>
      <Text style={styles.subtitle}>comienza a crear...</Text>
      {/* Botón para ir a la pantalla de cámara */}
      <ThemedButton
        name="rick" type="primary" activityColor='#349890' height={130} width={300} style={styles.bttn} raiseLevel={17} borderWidth={5} borderColor='#349890' backgroundDarker ='#67cbc3' backgroundColor='#fafafa'
        onPress={() => navigation.navigate('Pantalla1')}
      >
        <Text style={styles.buttonText}>Cámara</Text>
      </ThemedButton>
      
      {/* Botón para ir a la pantalla de galería */}
      <ThemedButton
        name="rick" type="primary" activityColor='#349890' height={130} width={300} style={styles.bttn} raiseLevel={17} borderWidth={5} borderColor='#349890' backgroundDarker ='#67cbc3' backgroundColor='#fafafa'
        onPress={() => navigation.navigate('Pantalla2')}
      >
        <Text style={styles.buttonText}>Galería</Text>
      </ThemedButton>
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
          options={{ headerShown: false }} // Título en la barra superior para Pantalla1
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
          options={{ headerShown: false }} // Título en la barra superior para PantallaAcciones
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Estilos minimalistas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c', // Fondo blanco para un look minimalista
  },
  subtitle: {
    fontSize: 25, // Tamaño más grande para el título
    fontWeight: '600', // Peso mediano para una tipografía moderna
    marginBottom: 70,
    color: '#969696', // Texto gris oscuro para mayor suavidad
    fontFamily: '',
  },
  title: {
    fontSize: 33, // Tamaño más grande para el título
    fontWeight: '600', // Peso mediano para una tipografía moderna
    marginBottom: 4,
    color: '#969696', // Texto gris oscuro para mayor suavidad
  },
  bttn: {
    marginBottom: 40,
  },
  button: {
    marginVertical: 10, // Color de fondo del botón
    shadowColor: '#000', // Sombra sutil para botones

    shadowOffset: { width: 20, height: 40 },
    shadowOpacity: 0.1,
    shadowRadius: 50,
  },
  buttonText: {
    color: '#349890', // Color de texto gris oscuro
    fontSize: 19,
    fontWeight: '900', // Peso de texto moderado
    textTransform: 'uppercase', // Texto en mayúsculas para un estilo moderno
    marginTop: 10,
    marginBottom: 10,

  },
});

