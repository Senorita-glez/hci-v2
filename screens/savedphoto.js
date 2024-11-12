// screens/PantallaAcciones.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert, ActivityIndicator, Clipboard } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import * as FileSystem from 'expo-file-system';
import { HfInference } from "@huggingface/inference"

const API_URL_HUGGINGFACE = "https://api-inference.huggingface.co/models/WinKawaks/vit-tiny-patch16-224";
const HUGGINGFACE_TOKEN = "Bearer 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";

const PantallaAcciones = ({ route, navigation }) => {
  const { selectedImage } = route.params;
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState(""); // Estado para guardar el texto generado

  // Función para enviar imagen a la API de Hugging Face
  const sendImageToHuggingFace = async () => {
    try {
      setLoading(true);
  
      // Leer la imagen como base64
      const imageBlob = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64
      });

      const response = await fetch(API_URL_HUGGINGFACE, {
        method: "POST",
        headers: {
          Authorization: HUGGINGFACE_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: imageBlob })
      });
  
      if (!response.ok) {
        console.log("Error en la API de Hugging Face: ", response.statusText);
        Alert.alert("Error", "Hubo un problema al enviar la imagen a Hugging Face.");
        return null;
      }
  
      const result = await response.json();
      
      if (result && result.length > 0 && result[0].label) {
        const bestObject = result[0].label;
        console.log("Objeto detectado:", bestObject); // Registro del objeto detectado
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

  // Función para generar texto con la API de Hugging Face Inference usando fetch
  const generateMarketingText = async (objectDetected) => {
    try {
      setLoading(true);
      const promptText = `Me puedes ayudar a crear un texto de marketing que me ayude a vender el siguiente producto: ${objectDetected}`;
      console.log("Generando texto con prompt:", promptText);
  
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct", {
        method: "POST",
        headers: {
          "Authorization": HUGGINGFACE_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: promptText,
          parameters: { max_tokens: 100 }
        })
      });
  
      console.log("Estado de la respuesta:", response.status);
      console.log("Texto de la respuesta:", response.statusText);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Detalles del error:", errorText);
        throw new Error("Error al generar el texto: " + errorText);
      }
  
      const result = await response.json();
      console.log("Respuesta de la API:", result);
  
      // Accede correctamente al texto generado y elimina el prompt
      let generatedText = result[0]?.generated_text || "No se generó texto.";
      generatedText = generatedText.replace(promptText, "").trim(); // Elimina el prompt del texto
  
      if (generatedText.includes(".")) {
        generatedText = generatedText.split(".")[0] + ".";
      }
  
      setGeneratedText(generatedText); // Guarda el texto generado en el estado para mostrarlo en la aplicación
      console.log("Texto final generado:", generatedText);
    } catch (error) {
      console.error("Error al generar texto:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  


  // Función para copiar el texto al portapapeles
  const copyToClipboard = () => {
    Clipboard.setString(generatedText);
    Alert.alert("Texto copiado", "El texto ha sido copiado al portapapeles.");
  };

  // Maneja la acción de "Generar Texto de Marketing"
  const handleGenerateMarketingText = async () => {
    const objectDetected = await sendImageToHuggingFace();
    if (objectDetected) {
      await generateMarketingText(objectDetected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto Guardada</Text>
      <Image source={{ uri: selectedImage }} style={styles.savedImage} />
      {loading ? (
        <Text style={styles.loadingText}>Generando texto, por favor espera...</Text>
      ) : (
        <>
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
            onPress={handleGenerateMarketingText}
          >
            <Text style={styles.buttonText}>Generar Texto de Marketing</Text>
          </ThemedButton>
          {generatedText ? (
            <>
              <Text style={styles.generatedText}>{generatedText}</Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Text style={styles.buttonText}>Copiar al Portapapeles</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </>
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
  loadingText: {
    fontSize: 18,
    color: '#ffffff',
    margin: 20,
    textAlign: 'center',
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
  generatedText: {
    fontSize: 18,
    color: '#ffffff',
    margin: 20,
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: '#349890',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
