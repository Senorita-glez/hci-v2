import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';

const TaskList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { task, key: tasks.length.toString() }]);
      setTask('');
    }
  };

  const removeTask = (key) => {
    setTasks(tasks.filter((t) => t.key !== key));
  };

  const handleGenerate = () => {
    // Aquí puedes manejar la acción que ocurre cuando presionas "Generar"
    alert('Generando texto a partir de los prompts.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generación de Texto</Text>
      <Text style={styles.subtitle}>Añade prompts para la generación de texto aquí:</Text>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Escribe un prompt"
        placeholderTextColor="#888"
      />

<ThemedButton
        name="rick"
        type="primary"
        activityColor='#349890'
        height={60}
        width={320}
        style={styles.bttn}
        raiseLevel={7}
        borderWidth={5}
        borderColor='#349890'
        backgroundDarker='#67cbc3'
        backgroundColor='#fafafa'
        onPress={addTask}
      >
        <Text style={styles.buttonText}>Añadir</Text>
      </ThemedButton>

      <FlatList
        style={styles.list}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.task}</Text>
            <TouchableOpacity onPress={() => removeTask(item.key)}>
              <Text style={styles.removeText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* El botón "Generar" solo aparece si hay al menos un prompt en la lista */}
      {tasks.length > 0 && (
        <ThemedButton
        name="rick"
        type="primary"
        activityColor='#349890'
        height={60}
        width={110}
        style={styles.generateButton}
        raiseLevel={7}
        borderWidth={5}
        borderColor='#349890'
        backgroundDarker='#67cbc3'
        backgroundColor='#349890'
        onPress={handleGenerate}
      >
        <Text style={styles.generateButtonText}>Generar</Text>
      </ThemedButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#f1f8ff',
    textAlign: 'left',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#f1f8ff',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    height: 50,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#349890',
    borderRadius: 25,
    backgroundColor: '#424242',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  removeText: {
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
  generateButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: 100,
    marginLeft: 210
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  bttn: {
    marginBottom: 6,
  },
  buttonText: {
    color: '#349890',
    fontSize: 19,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText2: {
    color: '#fafafa',
    fontSize: 19,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default TaskList;
