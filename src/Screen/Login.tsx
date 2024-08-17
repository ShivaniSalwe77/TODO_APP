import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomAlert from '../Component/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState(false);

  //  Function to handle confirmation in CustomAlert
  const handleModalOk = async () => {
    const storedEmail = await AsyncStorage.getItem('userEmail');
    const storedPassword = await AsyncStorage.getItem('userPassword');
    setModalVisible(false);
    if (userName === storedEmail && password === storedPassword) {
      navigation.navigate('Home');
    }
  };

  // function to handle login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (userName === storedEmail && password === storedPassword) {
        setModalMessage('Login Successfully..!!');
        setModalVisible(true);
      } else {
        setModalMessage('Login Failed ! Please Check Email and Password');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Failed to retrieve user data from AsyncStorage', error);
      setModalMessage('Login Failed ! Please Try Again');
      setModalVisible(true);
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/Master-Task-List.png')}
        style={{
          height: '30%',
          width: '96%',
          top: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View style={styles.bgBox}>
        <Text style={styles.text1}>Login</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <FontAwesome name="user" color={'black'} size={15} />
          </View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="#4D869C"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <FontAwesome name="lock" color={'black'} size={15} />
          </View>
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#4D869C"
            secureTextEntry={!showPassword}
          />
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off'}
            size={15}
            style={{color: 'black', marginTop: 62, marginLeft: -20}}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleLogin()}
          style={[
            styles.submitButton,
            {backgroundColor: isPressed ? '#9ABFCD' : '#4D869C'},
            {top: 50},
          ]}
          disabled={loading}>
          <View style={{flexDirection: 'row', gap: 1}}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.submitText}>Sign In</Text>
            )}
          </View>
        </TouchableOpacity>

        <CustomAlert
          visible={modalVisible}
          title="Login"
          message={modalMessage}
          onConfirm={() => handleModalOk()}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.submitText, {top: 180}]}>New User? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={[{top: 180}]}>
            <Text style={styles.submitText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4D869C',
  },
  bgBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '96%',
    height: '50%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#CDE8E5',
    shadowColor: 'gray',
    shadowOpacity: 2,
    elevation: 10,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 40,
    borderRadius: 5,
  },
  submitTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
  },
  text1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 40,
    color: 'black',
    fontWeight: '900',
    top: 20,
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputIcon: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '8%',
    backgroundColor: '#4D869C',
    height: 40,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    top: 50,
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 20,
    width: '60%',
    height: 40, // Ensure this is 100% of the input container height
    paddingHorizontal: 10,
    color: 'black', // Set text color to black
    top: 50,
  },
});
