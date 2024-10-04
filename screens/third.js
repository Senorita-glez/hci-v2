import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';

// Aquí importamos el componente Store
import Store from '../components/grid';

const ProfileScreen = () => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false); // Estado para controlar si el cuadro está expandido o contraído

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://static.eldiario.es/clip/ab74aa95-3656-424c-8ca1-dce590aabb97_16-9-discover-aspect-ratio_default_0.jpg' }} // Reemplaza con la URL real de la imagen
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Christian Lugo</Text>
        <Text style={styles.profileAge}>20-30 Years Old</Text>
        <TouchableOpacity style={styles.matchButton}>
          <Text style={styles.matchButtonText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.infoTitleContainer}
        onPress={() => setIsInfoExpanded(!isInfoExpanded)}
      >
        <Text style={styles.infoTitle}>User info</Text>
        <Text style={styles.toggleText}>{isInfoExpanded ? '-' : '+'}</Text>
      </TouchableOpacity>

      {isInfoExpanded && (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bio</Text>
            <Text style={styles.infoValue}>Hey there, I'm on Atlatik</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>20-30 Years Old</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>Male</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles.infoValue}>March 04, 2023</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>Alger, Canada</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reviews</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Text key={index} style={styles.star}>
                  {index < 3 ? '★' : '☆'}
                </Text>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.friendButton}>
            <Text style={styles.friendButtonText}>Edit info</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Store />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1c1c1c',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerButton: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#969696'
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#969696'
  },
  profileAge: {
    fontSize: 16,
    marginBottom: 20,
    color: '#969696'
  },
  friendButton: {
    backgroundColor: '#E5FFE5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  friendButtonText: {
    color: '#2ECC71',
    fontSize: 16,
  },
  matchButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  matchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  infoTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ECC71',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
  },
  storeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
