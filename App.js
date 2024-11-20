import React, { useState, useEffect } from 'react'; // Importamos React y hooks
import AsyncStorage from '@react-native-async-storage/async-storage'; // Almacenamiento local
import "global.css"; // Archivo global
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider"; // Proveedor de UI
import { View, Text } from 'react-native'; // Componentes básicos
import { NavigationContainer } from '@react-navigation/native'; // Navegación
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; // Navegación de pestañas
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Iconos

// Importamos las pantallas y el slider
import WelcomeSlider from './components/WelcomeSlider';
import Principal from './screens/principal';
import second from './screens/second';
import UserProfile from './screens/third';
import TaskList from './screens/fourth';
import Pantalla1 from './screens/camera';

const Tab = createMaterialBottomTabNavigator(); // Configuración de las pestañas

export default function App() {
  const [showWelcome, setShowWelcome] = useState(null); // Estado para manejar el slider de bienvenida

  // Hook useEffect para verificar si es la primera vez que se abre la app
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched'); // Verificar si ya se inició
        if (hasLaunched === null) {
          setShowWelcome(true); // Mostrar slider si es la primera vez
          await AsyncStorage.setItem('hasLaunched', 'true'); // Guardar estado
        } else {
          setShowWelcome(false); // Continuar con la navegación principal
        }
      } catch (error) {
        console.error('Error verificando el estado de la app:', error);
        setShowWelcome(false); // Fallback: Continuar con la navegación aunque falle
      }
    };

    checkFirstLaunch(); // Ejecutar la función al montar el componente
  }, []);

  // Mostrar un indicador de carga mientras se verifica el estado de `AsyncStorage`
  if (showWelcome === null) {
    return (
      <GluestackUIProvider mode="dark">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Cargando...</Text>
        </View>
      </GluestackUIProvider>
    );
  }

  // Mostrar el slider de bienvenida si es la primera vez
  if (showWelcome) {
    return (
      <GluestackUIProvider mode="dark">
        <WelcomeSlider onFinish={() => setShowWelcome(false)} />
      </GluestackUIProvider>
    );
  }

  // Navegación principal de la app
  return (
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#369c94"
          inactiveColor="#23635e"
          barStyle={{ backgroundColor: '#67cbc3' }}
        >
          <Tab.Screen
            name="Home"
            component={Principal}
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Cam"
            component={Pantalla1}
            options={{
              tabBarLabel: null,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="camera" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
