// screens/Pantalla2.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const Pantalla2 = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [permission, setPermission] = useState(null);

  // Solicitar permisos de la galería al cargar la pantalla
  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermission(status === 'granted');
      if (status === 'granted') {
        loadPhotos();
      }
    })();
  }, []);

  // Cargar fotos de la galería
  const loadPhotos = async () => {
    const album = await MediaLibrary.getAlbumAsync('DCIM'); // Obtener álbum DCIM
    const media = await MediaLibrary.getAssetsAsync({
      album,
      mediaType: 'photo',
      first: 50, // Cargar las primeras 50 imágenes
    });
    setPhotos(media.assets); // Guardar las fotos en el estado
  };

  // Renderizar cada imagen en la galería
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('PantallaAcciones', { selectedImage: item.uri })}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Necesitamos acceso a tus fotos para mostrar la galería.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Cargando fotos...</Text>
      )}
    </View>
  );
};

export default Pantalla2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
