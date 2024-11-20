import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert, Clipboard} from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const BACKEND_URL = "http://192.168.1.86:5000/process_image";
const API_URL_HUGGINGFACE = "https://api-inference.huggingface.co/models/WinKawaks/vit-tiny-patch16-224";
const HUGGINGFACE_TOKEN = "Bearer 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";

const PantallaAcciones = ({ route, navigation }) => {
  const { selectedImage } = route.params;
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState(""); // Estado para guardar el texto generado
  const [croppedImage, setCroppedImage] = useState(null); // Estado para guardar la URL de la imagen recortada

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
        console.log("Respuesta inesperada de Hugging Face:", result);
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
  
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Detalles del error:", errorText);
        throw new Error("Error al generar el texto: " + errorText);
      }
  
      const result = await response.json();
  
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

  // Función para recortar la imagen usando el backend
  const cropImage = async (objectDetected) => {
    try {
      setLoading(true);
      console.log("Convirtiendo la imagen seleccionada a Base64...");

      // Leer la imagen seleccionada como Base64
      const imageBase64 = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64
      });

      console.log("Enviando la imagen al backend para recorte...");

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img_base64: imageBase64, // Imagen codificada en Base64
          prompt: objectDetected, // Objeto detectado
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Detalles del error del backend:", errorText);
        throw new Error("Error al recortar la imagen: " + errorText);
      }

      const result = await response.json();
      console.log("Respuesta del backend:", result);

      // Extrae la URL de la imagen recortada
      const croppedImageUrl = result.cropped_image_url;
      setCroppedImage(croppedImageUrl); // Actualiza el estado con la imagen recortada
      console.log("URL de la imagen recortada:", croppedImageUrl);
    } catch (error) {
      console.error("Error al recortar la imagen:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCropImage = async () => {
    const objectDetected = await sendImageToHuggingFace();
    if (objectDetected) {
      await cropImage(objectDetected);
      await generateMarketingText(objectDetected); // Asegura que se genere el texto
    }
  };

  // Descarga la imagen recortada y guárdala en la carpeta de Descargas
  const handleDownloadImage = async () => {
    try {
      if (!croppedImage) {
        Alert.alert("Error", "No hay imagen recortada para descargar.");
        return;
      }

      // Solicita permisos para acceder al almacenamiento
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permiso denegado", "Se necesitan permisos para guardar en la carpeta de Descargas.");
        return;
      }

      const fileUri = `${FileSystem.cacheDirectory}${Date.now()}_cropped.png`;
      const result = await FileSystem.downloadAsync(croppedImage, fileUri);

      // Guarda el archivo en la carpeta de Descargas
      const asset = await MediaLibrary.createAssetAsync(result.uri);
      const album = await MediaLibrary.getAlbumAsync('Download');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Descarga exitosa", "Imagen guardada en la carpeta de Descargas.");
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
      Alert.alert("Error", "No se pudo descargar la imagen.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto Guardada</Text>
      <Image
        source={{ uri: croppedImage || selectedImage }}
        style={styles.savedImage}
        resizeMode="contain"
      />
      {loading ? (
        <Text style={styles.loadingText}>Procesando, por favor espera...</Text>
      ) : (
        <>
          <ThemedButton
            name="rick"
            type="primary"
            activityColor="#349890"
            height={50}
            width={200}
            style={styles.bttn}
            raiseLevel={10}
            borderWidth={5}
            borderColor="#349890"
            backgroundDarker="#67cbc3"
            backgroundColor="#1c1c1c"
            onPress={handleCropImage}
          >
            <Text style={styles.buttonText}>Recortar Imagen</Text>
          </ThemedButton>
          {croppedImage && (
            <>
              <TouchableOpacity onPress={handleDownloadImage} style={styles.downloadButton}>
                <Ionicons name="download" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.generatedText}>{generatedText || "Generando texto..."}</Text>
              <TouchableOpacity
                onPress={() => Clipboard.setString(generatedText)}
                style={styles.copyButton}
              >
                <Text style={styles.buttonText}>Copiar Texto</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
      <TouchableOpacity style={styles.btnnobtn} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.btnnobtnText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PantallaAcciones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  title: {
    fontSize: 27,
    fontWeight: "600",
    marginBottom: 10,
    color: "#969696",
  },
  savedImage: {
    width: "90%",
    height: "50%",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#ffffff",
    margin: 20,
    textAlign: "center",
  },
  btnnobtn: {
    backgroundColor: "transparent",
    padding: 0,
    marginTop: 25,
    textDecorationLine: "underline",
  },
  btnnobtnText: {
    color: "#424242",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  copyButton: {
    backgroundColor: "#349890",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: "#349890",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  generatedText: {
    fontSize: 18,
    color: "#ffffff",
    margin: 20,
    textAlign: "center",
  },
});
