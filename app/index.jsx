import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/splash');  // Navigate to the dashboard after a short delay
    }, 3000);  // 3 seconds to let the splash screen appear before navigating

    return () => clearTimeout(timer);  // Cleanup the timer on component unmount
  }, []);  // Empty dependency array ensures this effect runs only once

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading App...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set background color to white
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
