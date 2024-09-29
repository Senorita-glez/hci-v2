// screens/PantallaAcciones.js
import React from 'react';
import { View, Image, Button, StyleSheet, Text } from 'react-native';

const PantallaAcciones = ({ route, navigation }) => {
    const { savedImage } = route.params; // Recibimos la imagen pasada por la navegación

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Foto Guardada</Text>
            <Image source={{ uri: savedImage }} style={styles.savedImage} />
            <Button title="Hacer otra acción" onPress={() => alert('Acción realizada!')} />
            <Button title="Volver al inicio" onPress={() => navigation.navigate('Pantalla1')} />
        </View>
    );
};

export default PantallaAcciones;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    savedImage: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
});
