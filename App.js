import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { CameraType, FlashMode } from "expo-camera/legacy";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraComp() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setType((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerCamera}>
      <CameraView style={styles.camera} facing={type}>
        <View style={styles.buttonContainer}>
          {/* Botón de capturar */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>📸</Text>
          </TouchableOpacity>
          {/* Botón de flip camera */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>🔄</Text>
          </TouchableOpacity>

          {/* Botón de modo nocturno */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>🌙</Text>
          </TouchableOpacity>

          {/* Botón de HDR */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>HDR</Text>
          </TouchableOpacity>

          {/* Botón de configuración */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
        
      </CameraView>
      </View>
      <View style={styles.captureButtonContainer}>
          <TouchableOpacity style={styles.captureButton}>
            <View style={styles.innerCircle} />
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "relative",
    backgroundColor: '#25292e',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    right: 20,
    top: "5%",
    justifyContent: "space-between",
    height: "50%",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    marginLeft: -50, // Para centrar horizontalmente
  },
  captureButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  containerCamera: {
    flex: 1,
    marginTop:"25%", 
    marginBottom:"50%",
  },
});
