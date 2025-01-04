import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert("Success", "You have been logged out.");
      router.replace('/(models)/login'); 
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <Pressable onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </Pressable>
      ) : (
        <Link href="/(models)/login" style={styles.link}>
          <Text style={styles.linkText}>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 16,
  },
});