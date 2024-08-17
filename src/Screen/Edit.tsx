import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createNewTask} from '../services/taskService';

// This is Create New Task Component
const Edit: React.FC = () => {
  const [taskDetails, setTaskDetails] = useState({
    itemId: 0,
    taskName: '',
    taskDescription: '',
    dueDate: new Date().toISOString(),
    createdOn: new Date().toISOString(),
    isCompleted: false,
    tags: '',
    completedOn: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({
    taskName: '',
    taskDescription: '',
    tags: '',
  });

  // For Validation
  const validateInputs = () => {
    let valid = true;
    const newErrors = {taskName: '', taskDescription: '', tags: ''};

    if (!taskDetails.taskName) {
      newErrors.taskName = 'Task Name is required';
      valid = false;
    }
    if (!taskDetails.taskDescription) {
      newErrors.taskDescription = 'Task Description is required';
      valid = false;
    }
    if (!taskDetails.tags) {
      newErrors.tags = 'Tags are required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Function for Save Data
  const saveData = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const result = await createNewTask(taskDetails);
      Alert.alert('Success', 'Data added successfully!');
    } catch (error) {
      Alert.alert('Error', 'An error occurred while adding data');
    }
  };

  const handleInputChange = (value: string, field: string) => {
    setTaskDetails({...taskDetails, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Name"
        placeholderTextColor="#fff"
        value={taskDetails.taskName}
        onChangeText={val => handleInputChange(val, 'taskName')}
      />
      {errors.taskName ? (
        <Text style={styles.errorText}>{errors.taskName}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        placeholderTextColor="#fff"
        value={taskDetails.taskDescription}
        onChangeText={val => handleInputChange(val, 'taskDescription')}
      />
      {errors.taskDescription ? (
        <Text style={styles.errorText}>{errors.taskDescription}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Enter Tags"
        placeholderTextColor="#fff"
        value={taskDetails.tags}
        onChangeText={val => handleInputChange(val, 'tags')}
      />
      {errors.tags ? <Text style={styles.errorText}>{errors.tags}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={saveData}>
        <Text style={styles.btnText}>Create new task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Edit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BED7DC',
    padding: 15,
  },
  text: {
    fontSize: 30,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: 50,
  },
  input: {
    width: '90%',
    backgroundColor: '#4D869C',
    height: 40,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: '#fff',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 1,
    left: 20,
  },
  btn: {
    backgroundColor: '#4D869C',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    margin: 5,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '900',
  },
});
