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

function Pantalla1() {
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

  // Cargar la última imagen guardada cuando cambian los permisos
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
    // Si los permisos están cargando.
    return <View />;
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== "granted"
  ) {
    // Si los permisos no han sido concedidos.
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

  // Función para alternar las propiedades de la cámara
  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  // Función para tomar una foto y mostrarla sin guardarla
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

  // Función para guardar la imagen usando MediaLibrary
  const savePicture = async (navigation) => {
    if (image) {
      try {
        // Guardar la imagen en la galería
        const asset = await MediaLibrary.createAssetAsync(image);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);

        // Alerta confirmando que la foto fue guardada (opcional)
        Alert.alert(
          "¡Foto guardada!",
          "La imagen ha sido guardada correctamente."
        );

        // Limpiar la imagen actual
        setImage(null);

        // Navegar a la pantalla de acciones con la URI de la imagen guardada
        navigation.navigate("PantallaAcciones", { savedImage: assetInfo.uri });
      } catch (err) {
        console.log("Error al guardar la foto:", err);
      }
    }
  };

  // Función para obtener la última imagen guardada del álbum "DCIM"
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
          <View style={styles.topControlsContainer}>
            <Button
              icon={cameraProps.flash === "on" ? "flash-on" : "flash-off"}
              onPress={() => toggleProperty("flash", "on", "off")}
            />
            <Button
              icon="animation"
              color={cameraProps.animateShutter ? "white" : "#404040"}
              onPress={() => toggleProperty("animateShutter", true, false)}
            />
            <Button
              icon={
                cameraProps.enableTorch ? "flashlight-on" : "flashlight-off"
              }
              onPress={() => toggleProperty("enableTorch", true, false)}
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
            <Button
              icon="check"
              onPress={() => savePicture(navigation)} // Pasamos el objeto de navegación
            />
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
    backgroundColor: "#fff",
    marginTop: 0,
  },
  topControlsContainer: {
    height: 60,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: "row",
  },
  bottomControlsContainer: {
    height: "30% ",
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  previousImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
