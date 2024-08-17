import React, {useEffect, useRef} from 'react';
import {View, Dimensions, Animated, Text} from 'react-native';

const {height, width} = Dimensions.get('window');

interface Props {
  navigation: any;
}

const Splash: React.FC<Props> = ({navigation}) => {
  const slideAnimation = useRef(new Animated.Value(-height / 2)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const slideInAnimation = Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });

    const rotateInAnimation = Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const scaleInAnimation = Animated.timing(scaleAnimation, {
      toValue: 0.9,
      duration: 1000,
      useNativeDriver: true,
    });

    const scaleOutAnimation = Animated.timing(scaleAnimation, {
      toValue: 1.8,
      duration: 1000,
      useNativeDriver: true,
    });

    Animated.parallel([
      rotateInAnimation,
      slideInAnimation,
      scaleInAnimation,
    ]).start(() => {
      setTimeout(() => {
        scaleOutAnimation.start(() => {
          navigation.navigate('Login');
        });
      }, 1000); // Navigate after the animation completes
    });
  }, [navigation, slideAnimation, rotateAnimation, scaleAnimation]);

  const rotateValue = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDE8E5',
      }}>
      <Animated.Image
        source={require('../Images/logoTodo.png')}
        style={[
          {
            height: '18%',
            width: '25%',
            transform: [{scale: scaleAnimation}],
          },
        ]}
      />
    </View>
  );
};

export default Splash;
