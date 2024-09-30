// screens/PantallaAcciones.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import * as FileSystem from 'expo-file-system';

const API_URL_HUGGINGFACE = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";
const HUGGINGFACE_TOKEN = "Bearer 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";
const API_GRADIO_URL = "finegrain/finegrain-object-cutter";

const PantallaAcciones = ({ route, navigation }) => {
  const { selectedImage } = route.params;
  const [loading, setLoading] = useState(false);

  // Función para enviar imagen a la API de Hugging Face
  const sendImageToHuggingFace = async () => {
    try {
      setLoading(true);
  
      // Leer la imagen como base64
      const imageBase64 = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64
      });
  
      const response = await fetch(API_URL_HUGGINGFACE, {
        method: "POST",
        headers: {
          Authorization: HUGGINGFACE_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: imageBase64 })
      });
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        console.log("Error en la API de Hugging Face: ", response.statusText);
        Alert.alert("Error", "Hubo un problema al enviar la imagen a Hugging Face.");
        return null;
      }
  
      const result = await response.json();
      
      // Verificar si la respuesta tiene resultados válidos
      if (result && result.length > 0 && result[0].label) {
        const bestObject = result[0].label; // Obtener el objeto con mayor probabilidad
        return bestObject;
      } else {
        console.log("Respuesta inesperada de Hugging Face: ", result);
        Alert.alert("Error", "No se encontró ningún objeto en la imagen.");
        return null;
      }
    } catch (error) {
      console.error("Error al enviar imagen a Hugging Face:", error);
      Alert.alert("Error", "Hubo un error al procesar la imagen.");
      return null;
    } finally {
      setLoading(false);
    }
  };
  

  // Función para enviar imagen a la API de Gradio para recortar el fondo
  const removeBackgroundWithGradio = async (prompt) => {
    try {
      setLoading(true);
  
      const imageBase64 = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const body = JSON.stringify({
        img: imageBase64,
        prompt: prompt,
      });
  
      // Cambia "localhost" por la IP de tu máquina
      const response = await fetch('http://192.168.1.78:3000/cut-object', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
  
      // Verificar si la respuesta es JSON antes de intentar parsearla
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        if (result) {
          console.log('Recorte de fondo exitoso:', result);
          Alert.alert('Éxito', 'El fondo ha sido eliminado correctamente.');
        } else {
          Alert.alert('Error', 'No se pudo procesar el recorte de fondo.');
        }
      } else {
        const responseText = await response.text();  // Capturar el texto de la respuesta si no es JSON
        console.error('Respuesta no válida (no es JSON): ', responseText);
        Alert.alert('Error', 'El servidor devolvió un error inesperado.');
      }
    } catch (error) {
      console.error('Error al enviar imagen a Gradio:', error);
      Alert.alert('Error', 'Hubo un error al recortar el fondo.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBackground = async () => {
    const objectDetected = await sendImageToHuggingFace();
    if (objectDetected) {
      console.log("Objeto detectado:", objectDetected);
      await removeBackgroundWithGradio(objectDetected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto Guardada</Text>
      <Image source={{ uri: selectedImage }} style={styles.savedImage} />
      {loading ? (
        <ActivityIndicator size="large" color="#349890" />
      ) : (
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
          onPress={handleRemoveBackground}
        >
          <Text style={styles.buttonText}>Quitar fondo</Text>
        </ThemedButton>
      )}
      
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
