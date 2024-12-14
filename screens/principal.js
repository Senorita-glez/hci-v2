import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pantalla1 from './camera';
import Pantalla2 from './gallery';
import PantallaAcciones from './savedphoto';
import PantallaQuitarFondo from './result';
import MyCarussel from '../components/carussel';

function HomeScreen({ navigation }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const faqData = [
    {
      id: '1',
      question: '¿Por qué la app no detecta mi objeto?',
      answer: 'Nuestro sistema cuenta con una detección limitada. Si no se reconoce, intenta tomar otra foto o verifica que el objeto sea visible claramente.',
    },
    {
      id: '2',
      question: '¿Cómo puedo utilizar la imagen sin fondo?',
      answer: 'Después de quitar el fondo, puedes guardarla en tu galería o usarla directamente en tus diseños.',
    },
    {
      id: '3',
      question: '¿Qué pasa si algo falla en la app?',
      answer: 'Si algo falla, contacta a soporte técnico enviándonos un email.',
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
          color="#4CAF50"
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
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Bienvenido 👋</Text>
        <Text style={styles.subtitle}>Comienza a crear...</Text>
      </View>
      <View style={styles.carouselContainer}>
        <MyCarussel />
      </View>

      {/* Sección de Preguntas Frecuentes */}
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Preguntas Frecuentes</Text>
        {faqData.map((item) => renderItem({ item }))}
      </View>

      {/* Sección "About Us" */}
      <Text style={styles.faqTitle}>About us</Text>

      {/* Aquí es donde modificamos la tarjeta de About Us */}
      <View style={styles.aboutCard}>
        <View style={styles.avatarContainerBlue}>
          <Text style={styles.avatar}>HCI</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Miguel, Daphne y Alejandro</Text>
        </View>
        <View style={styles.infoContainerCentered}>
          <Text style={styles.infoLabelBlue}>Email:</Text>
          <Text style={styles.infoText}>upiit@ipn.mx</Text>
        </View>
        <View style={styles.infoContainerCentered}>
          <Text style={styles.infoLabelBlue}>Location:</Text>
          <Text style={styles.infoText}>Tlaxcala, México</Text>
        </View>
        <View style={styles.infoContainerCentered}>
          <Text style={styles.infoLabelBlue}>Bio:</Text>
          <Text style={styles.infoText}>Estudiantes de Ing. en IA de la UPIIT</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const Stack = createStackNavigator();

function Principal() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pantalla2"
        component={Pantalla2}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PantallaAcciones"
        component={PantallaAcciones}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PantallaQuitarFondo"
        component={PantallaQuitarFondo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Principal;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  carouselContainer: {
    marginVertical: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#67cbc3',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#A5A5A5',
    marginBottom: 20,
  },
  faqContainer: {
    width: '90%',
    marginTop: 20,
  },
  faqTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#67cbc3',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  answerContainer: {
    marginTop: 10,
  },
  answer: {
    fontSize: 14,
    color: '#A5A5A5',
  },
  aboutCard: {
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
  },
  avatarContainerBlue: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#67cbc3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
  },
  nameContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  infoContainerCentered: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoLabelBlue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#67cbc3',
  },
  infoText: {
    fontSize: 14,
    color: '#FFF',
  },
});
