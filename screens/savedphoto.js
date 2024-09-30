// screens/PantallaAcciones.js
import React from 'react';
import { View, Image, Button, StyleSheet, Text } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

const PantallaAcciones = ({ route, navigation }) => {
    const { savedImage } = route.params; // Recibimos la imagen pasada por la navegación

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Foto Guardada</Text>
            <Image source={{ uri: savedImage }} style={styles.savedImage} />
            <ThemedButton
        name="rick" type="primary" activityColor='#349890' height={70} width={250} style={styles.bttn} raiseLevel={10} borderWidth={5} borderColor='#349890' backgroundDarker ='#67cbc3' backgroundColor='#1c1c1c'
        onPress={() => alert('Acción realizada!')}
      >
        <Text style={styles.buttonText}>Quitar fondo</Text>
      </ThemedButton> 
            <Button style={styles.btnnobtn} title="Volver al inicio" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

export default PantallaAcciones;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
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
    btnnobtn:{
        backgroundColor: '#fff',
    }, 
    buttonText: {
        color: '#349890', // Color de texto gris oscuro
        fontSize: 19,
        fontWeight: '900', // Peso de texto moderado // Texto en mayúsculas para un estilo moderno
        marginTop: 10,
        marginBottom: 10,
    
      },
      title: {
        fontSize: 27, // Tamaño más grande para el título
        fontWeight: '600', // Peso mediano para una tipografía moderna
        marginBottom: 4,
        color: '#969696', // Texto gris oscuro para mayor suavidad
      },
});
