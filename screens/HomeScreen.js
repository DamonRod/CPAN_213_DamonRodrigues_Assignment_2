import React, { useState, useEffect } from 'react';
import { View, Text, Button, Animated, Easing, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const [fadeAnimation] = useState(new Animated.Value(1));
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleThemeChange = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      toggleTheme();

      const newTheme = isDarkMode ? 'Light' : 'Dark';

      Alert.alert('Theme Changed', `Switched to ${newTheme} Mode`);

      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatedStyle = {
    opacity: fadeAnimation,
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDarkMode ? '#333' : '#FFF',
        ...animatedStyle,
      }}
    >
      <Text style={{ color: isDarkMode ? '#FFF' : '#333', fontSize: 20, marginBottom: 20 }}>
        Welcome to Damon's Weather App
      </Text>

      <Text style={{ color: isDarkMode ? '#FFF' : '#333', fontSize: 18, marginBottom: 10 }}>
        Current Time: {currentTime}
      </Text>

      <TouchableOpacity onPress={handleThemeChange}>
        <View style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Change Theme</Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: 20 }} />
      <Button
        title="Enter Location Details"
        onPress={() => navigation.navigate('Form')}
        style={{ marginTop: 20 }}
      />
    </Animated.View>
  );
};

export default HomeScreen;
