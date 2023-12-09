import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const WeatherScreen = ({ route }) => {
  const { locationName, latitude, longitude } = route.params || {};
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  const [fadeAnimation] = useState(new Animated.Value(0));
  const [positionAnimation] = useState(new Animated.Value(100));

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!latitude || !longitude) {
          console.error('Latitude or longitude is missing.');
          return;
        }

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,snowfall,cloud_cover&timezone=auto&forecast_days=1`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data', error);
      } finally {
        setLoading(false);
        startAnimations();
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  const startAnimations = () => {
    const fadeIn = Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const moveUp = Animated.timing(positionAnimation, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.parallel([fadeIn, moveUp]).start();
  };

  const renderWeatherDetails = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={isDarkMode ? '#FFF' : '#333'} />;
    }

    if (!weatherData) {
      return <Text>Loading weather data...</Text>;
    }

    return (
      <Animated.View style={[styles.weatherContainer, { opacity: fadeAnimation, transform: [{ translateY: positionAnimation }] }]}>
        <Text style={[styles.heading, { color: isDarkMode ? '#FFF' : '#333', textAlign: 'center' }]}>
          Current Weather Conditions for: {locationName || 'Unknown Location'}
        </Text>
        <View style={{ height: 40}} />
        <View style={styles.detailsContainer}>
          <View style={styles.labelContainer}>
            <Text style={[styles.subHeading, { color: isDarkMode ? '#FFF' : '#333' }]}>Temperature:</Text>
            <Text style={[styles.subHeading, { color: isDarkMode ? '#FFF' : '#333' }]}>Feels Like:</Text>
            <Text style={[styles.subHeading, { color: isDarkMode ? '#FFF' : '#333' }]}>Cloud Cover</Text>
            <Text style={[styles.subHeading, { color: isDarkMode ? '#FFF' : '#333' }]}>Precipitation %:</Text>
            <Text style={[styles.subHeading, { color: isDarkMode ? '#FFF' : '#333' }]}>Snowfall (cm):</Text>
          </View>
          <View style={styles.conditionContainer}>
            <Text style={[styles.detailText, { color: isDarkMode ? '#FFF' : '#333' }]}>{weatherData.hourly.temperature_2m[0]}°C</Text>
            <Text style={[styles.detailText, { color: isDarkMode ? '#FFF' : '#333' }]}>{weatherData.hourly.apparent_temperature[0]}°C</Text>
            <Text style={[styles.detailText, { color: isDarkMode ? '#FFF' : '#333' }]}>{weatherData.hourly.cloud_cover[0]}%</Text>
            <Text style={[styles.detailText, { color: isDarkMode ? '#FFF' : '#333' }]}>{weatherData.hourly.precipitation_probability[0]}%</Text>
            <Text style={[styles.detailText, { color: isDarkMode ? '#FFF' : '#333' }]}>{weatherData.hourly.snowfall[0]}cm</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#FFF', justifyContent: 'center', alignItems: 'center' }]}>
      {renderWeatherDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  conditionContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  detailText: {
    textAlign: 'center',
    margin: 5,
  },
});

export default WeatherScreen;
