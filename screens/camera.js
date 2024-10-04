import React, { useState, useRef, useEffect } from "react";
import { MaterialIcons } from '@expo/vector-icons'; 
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/button"; // Asegúrate de que tengas un componente Button en la ruta correcta

import Pantalla2 from "./gallery";

function Pantalla1({ navigation }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: "front",
    flash: "on",
    animateShutter: false,
    enableTorch: false,
  });
  const [image, setImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === "granted"
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    return (
      <View style={styles.container}>
        <Text>
          Necesitamos permisos para la cámara y la galería para continuar.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Conceder Permisos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (err) {
        console.log("Error al tomar la foto:", err);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        // Verificar si los permisos están concedidos antes de guardar la imagen
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status !== 'granted') {
          console.log("Permisos de la galería no concedidos.");
          Alert.alert("Error", "Necesitas conceder permisos para guardar la imagen.");
          return;
        }
  
        const asset = await MediaLibrary.createAssetAsync(image);
        if (asset) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
          Alert.alert(
            "¡Foto guardada!",
            "La imagen ha sido guardada correctamente."
          );
          setImage(null);
          navigation.navigate("PantallaAcciones", { selectedImage: assetInfo.uri });
        } else {
          console.log("Error: el asset es nulo.");
        }
      } catch (err) {
        console.log("Error al guardar la foto:", err);
      }
    }
  };
  

  const getLastSavedImage = async () => {
    if (
      mediaLibraryPermissionResponse &&
      mediaLibraryPermissionResponse.status === "granted"
    ) {
      const dcimAlbum = await MediaLibrary.getAlbumAsync("DCIM");
      if (dcimAlbum) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          album: dcimAlbum,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
          mediaType: MediaLibrary.MediaType.photo,
          first: 1,
        });

        if (assets.length > 0) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
          setPreviousImage(assetInfo.localUri || assetInfo.uri);
        } else {
          setPreviousImage(null);
        }
      } else {
        setPreviousImage(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.space}></View>
          <View style={styles.topControlsContainer}>
            {/* Botón para volver a la pantalla de inicio */}

            <Button
              icon="arrow-back"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
            {/* Botón de flash en la esquina superior derecha */}
            <Button
              icon={cameraProps.enableTorch ? "flash-on" : "flash-off"}
              onPress={() => toggleProperty("enableTorch", true, false)}
              style={styles.flashButton}
            />
          </View>
          <CameraView
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            animateShutter={cameraProps.animateShutter}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
          />
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Pantalla2');
              }}
            >
              <Image
                source={{ uri: previousImage }}
                style={styles.previousImage}
              />
            </TouchableOpacity>

            {/* Botón de captura de foto al estilo iPhone */}
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              <View style={styles.innerCaptureButton} />
            </TouchableOpacity>

            <Button
              icon="flip-camera-ios"
              onPress={() => toggleProperty("facing", "front", "back")}
              size={40}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.maybeee}></View>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={styles.btnico}
            >
              <MaterialIcons
                name="flip-camera-android"
                size={50}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={savePicture} style={styles.btnico}>
              <MaterialIcons name="check" size={50} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

export default Pantalla1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    marginTop: 0,
  },
  topControlsContainer: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  space: {
    backgroundColor: "#1c1c1c",
    width: 6,
    height: "5%",
  },
  backButton: {
    position: "absolute",
    marginTop: 20,
    left: 10,
  },
  flashButton: {
    position: "absolute",
    marginTop: 20,
    right: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  bottomControlsContainer: {
    height: "26%",
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 0,
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  // Estilo del botón de captura similar al iPhone
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff", // Botón blanco
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#5B5B5B",
    borderWidth: 30, // Borde grueso para dar apariencia de botón iPhone
  },
  innerCaptureButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff", // Círculo interior blanco
  },
  maybeee: {
    backgroundColor: "#1c1c1c",
    width: 6,
    height: "13%",
  },
  btnico: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
