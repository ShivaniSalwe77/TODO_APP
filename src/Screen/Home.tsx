import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/NavStack';
import {getAllTasks, deleteTask} from '../services/taskService';
import ButtonComponent from '../Component/ButtonComponent';

interface Data {
  itemId: number;
  taskName: string;
  taskDescription: string;
  tags: string;
  createdOn: string;
}

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeNavigationProp;
};

//This is Home Component
const Home: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<null | string>(null);

  //For Fetch Data
  const fetchData = async () => {
    try {
      const tasks = await getAllTasks();
      setData(tasks);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //For delete Task
  const handleDelete = async (itemId: number) => {
    try {
      const success = await deleteTask(itemId);
      if (success) {
        Alert.alert('Data deleted');
        fetchData();
      } else {
        Alert.alert('Failed to delete data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      Alert.alert('An error occurred while deleting data');
    }
  };

  // For Alter to ask Confirmation for Delete Task
  const confirmDelete = (itemId: number) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDelete(itemId),
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}: {item: Data}) => (
    <View key={item.itemId} style={styles.item}>
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.taskName}>{item.taskName}</Text>
          <Text style={styles.textitem}>
            {new Date(item.createdOn).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => {
              console.log('Navigating with item:', item);
              navigation.navigate('Update', item);
            }}>
            <Text style={styles.btntext1}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn1}
            onPress={() => confirmDelete(item.itemId)}>
            <Text style={styles.btntext1}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My List</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.itemId.toString()}
        onRefresh={() => {
          setRefreshing(true);
          fetchData();
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading) {
            fetchData();
          }
        }}
      />
      <ButtonComponent
        title="Create new task"
        onPress={() => navigation.navigate('Edit')}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BED7DC',
    padding: 15,
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemContent: {
    flexDirection: 'column',
  },
  itemHeader: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  textitem: {
    fontSize: 13,
    color: '#000',
  },

  btn1: {
    backgroundColor: '#4D869C',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  btntext1: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
});
