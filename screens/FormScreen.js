import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Linking, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const FormScreen = ({ navigation }) => {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = () => {
    if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
      Alert.alert('Invalid Input', 'Please enter valid latitude and longitude as numbers.');
      return;
    }

    Alert.alert(
      'Location Confirmation',
      `Location: ${locationName}\nLatitude: ${latitude}\nLongitude: ${longitude}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Weather', { locationName, latitude, longitude });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleFindCoordinates = () => {
    Linking.openURL('https://www.latlong.net');
  };

  const isValidLatitude = (lat) => {
    const num = parseFloat(lat);
    return !isNaN(num) && isFinite(num);
  };

  const isValidLongitude = (long) => {
    const num = parseFloat(long);
    return !isNaN(num) && isFinite(num);
  };

  const placeholderTextColor = isDarkMode ? '#888' : '#555';

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#333' : '#FFF' }}>
        <Text style={{ color: isDarkMode ? '#FFF' : '#333', fontSize: 20 }}>Enter Location Details</Text>
        <TextInput
          placeholder="Location Name"
          value={locationName}
          onChangeText={(text) => setLocationName(text)}
          placeholderTextColor={placeholderTextColor}
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            color: isDarkMode ? '#FFF' : '#333',
            borderColor: isDarkMode ? '#888' : '#555',
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Latitude"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
          placeholderTextColor={placeholderTextColor}
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            color: isDarkMode ? '#FFF' : '#333',
            borderColor: isDarkMode ? '#888' : '#555',
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Longitude"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
          placeholderTextColor={placeholderTextColor}
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 10,
            color: isDarkMode ? '#FFF' : '#333',
            borderColor: isDarkMode ? '#888' : '#555',
            borderRadius: 8,
          }}
        />
        <Button title="Submit" onPress={handleSubmit} />

        <Button title="Find Your Coordinates" onPress={handleFindCoordinates} style={{ marginTop: 20 }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FormScreen;
