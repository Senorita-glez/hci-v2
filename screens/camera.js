import React, { useState, useRef, useEffect } from "react";
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
        const asset = await MediaLibrary.createAssetAsync(image);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        Alert.alert(
          "¡Foto guardada!",
          "La imagen ha sido guardada correctamente."
        );
        setImage(null);
        navigation.navigate("PantallaAcciones", { savedImage: assetInfo.uri });
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
              icon="arrow-back" // Icono de flecha a la izquierda
              onPress={() => navigation.goBack()} // Función de navegación para volver
              style={styles.backButton} // Estilos para la esquina superior izquierda
            />
            {/* Botón de flash en la esquina superior derecha */}
            <Button
              icon={cameraProps.enableTorch ? "flash-on" : "flash-off"} // Cambiamos el icono mostrado
              onPress={() => toggleProperty("enableTorch", true, false)}
              style={styles.flashButton} // Mantiene la función de la linterna
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
              onPress={() => previousImage && setImage(previousImage)}
            >
              <Image
                source={{ uri: previousImage }}
                style={styles.previousImage}
              />
            </TouchableOpacity>
            <Button
              icon="camera"
              size={60}
              style={{ height: 60 }}
              onPress={takePicture}
            />
            <Button
              icon="flip-camera-ios"
              onPress={() => toggleProperty("facing", "front", "back")}
              size={40}
            />
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.camera} />
          <View style={styles.bottomControlsContainer}>
            <Button icon="flip-camera-android" onPress={() => setImage(null)} />
            <Button icon="check" onPress={savePicture} />
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
    height: '10%',
    flexDirection: "row",
    justifyContent: "space-between", // Para que los botones estén en las esquinas
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  space: {
    backgroundColor: "#1c1c1c",
    width:6,
    height: '5%',
  },
  backButton: {
    position: "absolute",
    marginTop: 20, // Ajustar margen superior para el botón de volver
    left: 10, // Colocar en la esquina superior izquierda
  },
  flashButton: {
    position: "absolute",
    marginTop: 20, // Ajustar margen superior para el botón de flash
    right: 10, // Colocar en la esquina superior derecha
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
    height: "30%",
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 50,
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
