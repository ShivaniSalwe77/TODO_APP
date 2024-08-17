import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomAlert from '../Component/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

const Signup: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState(false);

  // Function to handle Signup
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      // Store user data in AsyncStorage
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);

      Alert.alert('Success', 'Sign up successful');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to save user data to AsyncStorage', error);
      Alert.alert('Error', 'Failed to sign up');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Images/signup.png')}
        style={{height: '30%', width: '96%', borderRadius: 10, top: 0}}
      />
      <View style={styles.bgBox}>
        <Text style={styles.text1}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <FontAwesome name="user" color={'black'} size={15} />
          </View>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
          onPress={() => handleSignUp()}
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
              <Text style={styles.submitText}>Sign Up</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.submitText, {top: 180}]}>New User? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={[{top: 180}]}>
            <Text style={styles.submitText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

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
    width: '94%',
    height: '50%',
    borderRadius: 10,
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
