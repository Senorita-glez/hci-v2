import React from 'react';
import {
  StyleSheet, View, Image, Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: require('../assets/recorta2/1.png'), // Asegúrate que la ruta es correcta
    cornerLabelColor: '#FFD300',
    cornerLabelText: 'GOTY',
  },
  {
    coverImageUri: require('../assets/recorta2/2.png'), // Asegúrate que la ruta es correcta
    cornerLabelColor: '#0080ff',
    cornerLabelText: 'NEW',
  },
  {
    coverImageUri: require('../assets/recorta2/3.png'),
    cornerLabelColor: '#2ECC40',
    cornerLabelText: '-75%',
  },
  {
    coverImageUri: require('../assets/recorta2/4.png'),
    cornerLabelColor: '#2ECC40',
    cornerLabelText: '-20%',
  },
];

const MyCarussel = () => {
  const renderItem = (data) => (
    <View
      key={data.coverImageUri.toString()} // Convertimos a string para la key si es un require()
      style={styles.cardContainer}
    >
      <View style={styles.cardWrapper}>
        <Image
          style={styles.card}
          source={data.coverImageUri} // Utilizamos require directamente
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={DATA}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.90,
    height: width * 0.5,
  },
});

export default MyCarussel;
