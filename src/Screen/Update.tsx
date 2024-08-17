import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Alert} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/NavStack';
import {updateTask} from '../services/taskService';
import axios from 'axios';
import ButtonComponent from '../Component/ButtonComponent';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Update'>;

type Props = {
  route: DetailsScreenRouteProp;
};

//This is Update Component
const Update: React.FC<Props> = ({route}) => {
  const {itemId, taskName, taskDescription, tags} = route.params;

  const [taskDetails, setTaskDetails] = useState({
    itemId: itemId,
    taskName: taskName,
    taskDescription: taskDescription,
    dueDate: new Date().toISOString(),
    createdOn: new Date().toISOString(),
    isCompleted: true,
    tags: tags,
    completedOn: new Date().toISOString(),
  });

  const handleInputChange = (value: string, field: string) => {
    setTaskDetails({...taskDetails, [field]: value});
  };

  const updateData = async (itemId: number) => {
    try {
      const updatedTask = await updateTask(taskDetails);
      console.log(updatedTask);
      Alert.alert('Task updated successfully');
    } catch (error) {
      Alert.alert('Error updating task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Update your Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        placeholderTextColor="#fff"
        value={taskDetails.taskName}
        onChangeText={(txt: string) => handleInputChange(txt, 'taskName')}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        placeholderTextColor="#fff"
        value={taskDetails.taskDescription}
        onChangeText={(txt: string) =>
          handleInputChange(txt, 'taskDescription')
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Tags"
        placeholderTextColor="#fff"
        value={taskDetails.tags}
        onChangeText={(txt: string) => handleInputChange(txt, 'tags')}
      />

      <ButtonComponent title="Update task" onPress={() => updateData(itemId)} />
    </View>
  );
};

export default Update;

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
});
