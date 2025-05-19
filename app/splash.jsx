import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';  // Using expo-router for navigation

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);  // Initial opacity value for animation

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the Signup page after the timer completes (3 seconds)
      router.replace('/Signup');
    }, 3000);  // 3000ms = 3 seconds

    // Fade in the text animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,  // 2 seconds fade-in duration
      useNativeDriver: true, // This optimizes the animation
    }).start();

    return () => clearTimeout(timer);  // Cleanup the timer on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Welcome to ISMEED RIDE!
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',  // White background for the splash screen
    paddingHorizontal: 20,  // Ensure text has some margin on smaller devices
  },
  text: {
    fontSize: 36,  // Large, bold text
    fontWeight: '700',
    color: '#4facfe',  // Blue color
    textAlign: 'center',
    fontFamily: 'Montserrat',  // Modern and professional font
    letterSpacing: 2,  // Slight space between letters
  },
});

export default SplashScreen;
