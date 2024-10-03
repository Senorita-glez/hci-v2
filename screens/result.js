// screens/PantallaQuitarFondo.js
import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener esta biblioteca instalada
import * as Clipboard from 'expo-clipboard'; // Importar Clipboard desde expo

const PantallaQuitarFondo = ({ route, navigation }) => {
  const { selectedImage } = route.params; // Recibimos la imagen de PantallaAcciones
  const textoParaCopiar = "Este es un texto que se puede copiar"; // El texto que se copiará

  // Función para copiar el texto al portapapeles
  const copiarTexto = () => {
    Clipboard.setString(textoParaCopiar);
    Alert.alert("Texto copiado", "El texto ha sido copiado al portapapeles.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto resultante</Text>
      <Image source={{ uri: selectedImage }} style={styles.image} />
      <TouchableOpacity onPress={copiarTexto} style={styles.copyButton}>
        <MaterialIcons name="content-copy" size={24} color="#349890" />
        <Text style={styles.copyButtonText}>Dale vida a tus espacios con este bello</Text>
      </TouchableOpacity>
      <ThemedButton
        name="rick"
        type="primary"
        activityColor='#349890'
        height={75}
        width={200}
        style={styles.bttn}
        raiseLevel={10}
        borderWidth={5}
        borderColor='#349890'
        backgroundDarker='#67cbc3'
        backgroundColor='#1c1c1c'
        onPress={() => navigation.navigate('PantallaQuitarFondo', { selectedImage })}
      >
        <Text style={styles.buttonText}>Guardar Foto</Text>
      </ThemedButton>

      {/* Botón para copiar el texto con el icono de copiar */}
      

      <TouchableOpacity style={styles.btnnobtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnnobtnText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantallaQuitarFondo;

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
    marginTop: 5,
    color: '#969696',
  },
  image: {
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#349890',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'uppercase',
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
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#349890',
    borderWidth: 1,
    width: 300,
  },
  copyButtonText: {
    color: '#349890',
    fontSize: 18,
    marginLeft: 10, // Espacio entre el icono y el texto
  },
});
