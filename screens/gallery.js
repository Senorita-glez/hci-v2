// screens/Pantalla2.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Pantalla2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Esta es la Pantalla 2</Text>
    </View>
  );
};

export default Pantalla2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  pageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
