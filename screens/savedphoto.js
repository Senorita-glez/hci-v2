import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Clipboard,
  ScrollView,
} from 'react-native';
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
  const [generatedText, setGeneratedText] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false); // Estado para controlar si la imagen ha sido procesada

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
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct", {
        method: "POST",
        headers: {
          Authorization: HUGGINGFACE_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: promptText, parameters: { max_tokens: 100 } }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el texto.");
      }

      const result = await response.json();
      let text = result[0]?.generated_text || "No se generó texto.";
      text = text.replace(promptText, "").trim();
      if (text.includes(".")) text = text.split(".")[0] + ".";
      setGeneratedText(text);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const cropImage = async (objectDetected) => {
    try {
      setLoading(true);
      const imageBase64 = await FileSystem.readAsStringAsync(selectedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img_base64: imageBase64, prompt: objectDetected }),
      });

      if (!response.ok) {
        throw new Error("Error al recortar la imagen.");
      }

      const result = await response.json();
      setCroppedImage(result.cropped_image_url);
      setIsProcessed(true); // Marca la imagen como procesada
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCropImage = async () => {
    const objectDetected = await sendImageToHuggingFace();
    if (objectDetected) {
      await cropImage(objectDetected);
      await generateMarketingText(objectDetected);
    }
  };

  const handleDownloadImage = async () => {
    try {
      if (!croppedImage) {
        throw new Error("No hay imagen recortada para descargar.");
      }

      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        throw new Error("Permiso denegado para guardar en la carpeta de Descargas.");
      }

      const fileUri = `${FileSystem.cacheDirectory}${Date.now()}_cropped.png`;
      const result = await FileSystem.downloadAsync(croppedImage, fileUri);

      const asset = await MediaLibrary.createAssetAsync(result.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (!album) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Descarga exitosa", "Imagen guardada en la carpeta de Descargas.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            {!isProcessed && ( // Oculta el botón después de que la imagen ha sido procesada
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
            )}
            {croppedImage && (
              <>
                <TouchableOpacity onPress={handleDownloadImage} style={styles.downloadButton}>
                  <Ionicons name="download" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.generatedText}>{generatedText}</Text>
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
        <TouchableOpacity
          style={styles.btnnobtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.btnnobtnText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PantallaAcciones;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 60,
    backgroundColor: "#1c1c1c",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "600",
    marginBottom: 10,
    color: "#969696",
    textAlign: "center",
  },
  savedImage: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#ffffff",
    margin: 20,
    textAlign: "center",
  },
  bttn: {
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
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
  copyButton: {
    backgroundColor: "#349890",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  btnnobtn: {
    marginTop: 25,
  },
  btnnobtnText: {
    color: "#424242",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
