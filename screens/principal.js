import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemedButton } from 'react-native-really-awesome-button';
import Pantalla1 from './camera'; // Pantalla de cámara
import Pantalla2 from './gallery'; // Pantalla de galería
import PantallaAcciones from './savedphoto'; // Pantalla de acciones con la foto guardada
import PantallaQuitarFondo from './result'; // Pantalla de quitar fondo
import MyCarussel from '../components/carussel';
import ProfileDetail from '../components/about';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Asegúrate de importar correctamente

// Pantalla Home con los botones estilizados
function HomeScreen({ navigation }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const faqData = [
    {
      id: '1',
      question: '¿Porqué la app no detecta mi objeto?',
      answer: 'Nuestro sistema cuenta con una detección de una cantidad de objetos, el que no se reconozca se puede deber a que no se ve claramente el objeto o no esta en nuestra bd. Intenta tomar una foto nuevamente del producto',
    },
    {
      id: '2',
      question: '¿Como puedo utilizar la imagen sin fondo?',
      answer: 'Después de quitar el fondo de la imagen, puedes guardarla en tu galería para compartirla en redes sociales o bien, crear agregarla a uno de tus diseños',
    },
    {
      id: '3',
      question: '¿Qué pasa si algo falla en la app?',
      answer: 'Si algo falla, puedes contactar a soporte técnico para obtener ayuda. Solo escribenos un email y lo resolveremos lo más pronto posible.',
    },
  ];

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.cardHeader}>
        <Text style={styles.question}>{item.question}</Text>
        <Ionicons
          name={expandedItem === item.id ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {expandedItem === item.id && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.extraspace}></View>
      <Text style={styles.mainTitle}>Bienvenido 👋</Text>
      <Text style={styles.subtitle}>Comienza a crear...</Text>
      <MyCarussel />
      
      {/* Sección de Preguntas Frecuentes */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
        {faqData.map((item) => renderItem({ item }))}
      </View>

      {/* Sección "About Us" */}
      <Text style={styles.faqTitle}>About us</Text>
      
      {/* Aquí es donde modificamos la tarjeta de About Us */}
      <View style={styles.aboutCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>HCI</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Miguel, Daphne y Alejandro</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>upiit@ipn.mx</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoText}>Tlaxcala, México</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Bio:</Text>
          <Text style={styles.infoText}>Estudiantes de Ing. en IA de la UPIIT</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Pantalla de Cámara
function CameraScreen({ navigation }) {
  useEffect(() => {
    // Oculta el tab bar cuando se está en Pantalla1
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } });

    // Cuando se sale de la pantalla, vuelve a mostrar el tab bar
    return () =>
      navigation.getParent().setOptions({ tabBarStyle: { display: 'flex' } });
  }, [navigation]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.mainTitle}>Cámara</Text>
    </View>
  );
}

// Crear el Stack Navigator
const Stack = createStackNavigator();

function Principal() {
  return (
    <Stack.Navigator initialRouteName="Homie">
      {/* Pantalla de Inicio */}
      <Stack.Screen
        name="Homie"
        component={HomeScreen}
        options={{ headerShown: false }} // Ocultar la barra de título en la pantalla de inicio
      />

      {/* Pantalla de Cámara */}
      <Stack.Screen
        name="Pantalla1"
        component={CameraScreen}
        options={{ headerShown: false }} // Ocultar encabezado en esta pantalla
      />

      {/* Pantalla de Galería */}
      <Stack.Screen
        name="Pantalla2"
        component={Pantalla2}
        options={{ headerShown: true }} // Mostrar encabezado en esta pantalla
      />

      {/* Pantalla de Acciones después de guardar la foto */}
      <Stack.Screen
        name="PantallaAcciones"
        component={PantallaAcciones}
        options={{ headerShown: false }} // Ocultar encabezado en esta pantalla
      />

      {/* Pantalla para quitar el fondo de una imagen */}
      <Stack.Screen
        name="PantallaQuitarFondo"
        component={PantallaQuitarFondo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Principal;

// Estilos minimalistas
const styles = StyleSheet.create({
  extraspace: {
    height: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
    backgroundColor: '#1c1c1c',
    alignItems: 'center', // Centering the card horizontally in the screen
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  mainTitle: {
    fontSize: 33,
    fontWeight: '600',
    marginBottom: 10,
    color: '#969696',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 30,
    color: '#969696',
    textAlign: 'center',
  },
  faqContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1c',
  },
  faqTitle: {
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#969696',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answerContainer: {
    marginTop: 10,
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
  aboutCard: {
    backgroundColor: '#fff',
    borderRadius: 15, // Rounded corners for the About Us card
    padding: 20, // Padding inside the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    width: '80%', // Reduce the width to 80% for a card-like appearance
    alignItems: 'center', // Centering content inside the card
    marginVertical: 20, // Add some space between cards
  },
  avatarContainer: {
    width: 100, // Reduce avatar size
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 48, // Smaller font for avatar initials
    fontWeight: '700',
  },
  nameContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
});
