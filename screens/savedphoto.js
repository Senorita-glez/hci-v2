// screens/PantallaAcciones.js
import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

const PantallaAcciones = ({ route, navigation }) => {
  const { selectedImage } = route.params; // Recibimos la imagen pasada por la navegación

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto Guardada</Text>
      <Image source={{ uri: selectedImage }} style={styles.savedImage} />
      
      {/* Botón para quitar el fondo y navegar a la pantalla de quitar fondo */}
      <ThemedButton
        name="rick"
        type="primary"
        activityColor='#349890'
        height={75}
        width={255}
        style={styles.bttn}
        raiseLevel={10}
        borderWidth={5}
        borderColor='#349890'
        backgroundDarker='#67cbc3'
        backgroundColor='#1c1c1c'
        onPress={() => navigation.navigate('PantallaQuitarFondo', { selectedImage })}
      >
        <Text style={styles.buttonText}>Quitar fondo</Text>
      </ThemedButton>
      
      <TouchableOpacity style={styles.btnnobtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnnobtnText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantallaAcciones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    marginBottom: 10,
    color: '#969696',
  },
  savedImage: {
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  btnnobtn: {
    backgroundColor: 'transparent',
    padding: 0,
    marginTop: 25,
    textDecorationLine: 'underline',
  },
  btnnobtnText: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#349890',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});
