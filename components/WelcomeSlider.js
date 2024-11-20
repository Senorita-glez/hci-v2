import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Biblioteca de iconos

const WelcomeSlider = ({ onFinish }) => {
  const slides = [
    {
      key: 'screen1',
      title: 'Bienvenido a HCI',
      text: 'Explora nuestra plataforma y descubre nuevas herramientas.',
      icon: 'home-outline', // Icono que representa "Inicio"
    },
    {
      key: 'screen2',
      title: 'Generación de Texto',
      text: 'Añade prompts para la generación de texto basado en IA.',
      icon: 'text-box-outline', // Icono para generación de texto
    },
    {
      key: 'screen3',
      title: 'Captura tus Momentos',
      text: 'Utiliza nuestra cámara para capturar imágenes y explorar funciones creativas.',
      icon: 'camera-outline', // Icono de cámara
    },
  ];

  // Renderizado de cada slide
  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <MaterialCommunityIcons
        name={item.icon}
        size={120} // Tamaño del icono
        color="#369c94" // Color del icono
        style={styles.icon}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  // Botón personalizado de "Listo"
  const renderDoneButton = () => (
    <TouchableOpacity style={styles.doneButton} onPress={onFinish}>
      <Text style={styles.doneButtonText}>Listo</Text>
    </TouchableOpacity>
  );

  return (
    <AppIntroSlider
      renderItem={renderSlide}
      data={slides}
      onDone={onFinish}
      renderDoneButton={renderDoneButton}
      showSkipButton
      onSkip={onFinish}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  icon: {
    marginBottom: 40, // Espacio debajo del icono
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  doneButton: {
    backgroundColor: '#369c94',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WelcomeSlider;
