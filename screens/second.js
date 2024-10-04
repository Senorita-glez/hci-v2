import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons from react-native-vector-icons

const FAQSection = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const faqData = [
    {
      id: '1',
      question: 'What is React Native?',
      answer: 'React Native is a framework for building mobile apps using React and JavaScript.'
    },
    {
      id: '2',
      question: 'How does React Native work?',
      answer: 'React Native uses native components to render mobile UI and logic.'
    },
    {
      id: '3',
      question: 'Is React Native cross-platform?',
      answer: 'Yes, you can build both iOS and Android apps with React Native.'
    },
  ];

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.cardHeader}>
        <Text style={styles.question}>{item.question}</Text>
        <Icon 
          name={expandedItem === item.id ? 'chevron-up-outline' : 'chevron-down-outline'} 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>
      {expandedItem === item.id && (
        <View style={styles.answerContainer}>
          <Text style={styles.answer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <FlatList
        data={faqData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answerContainer: {
    marginTop: 10,
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
  separator: {
    height: 10,
  },
});

export default FAQSection;
