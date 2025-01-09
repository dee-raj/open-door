import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  ToastAndroid,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { DefaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.emailAddresses[0]?.emailAddress || '');
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'Unknown';
  const [imageViewVisible, setImageViewVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setEmail(user.emailAddresses[0]?.emailAddress || '');
  }, [user]);

  const onSaveUser = async () => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        Alert.alert('Error', 'First and last name cannot be empty.');
        return;
      }
      await user?.update({ firstName, lastName });
      ToastAndroid.show('Profile changes saved successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setEditable(false);
    }
  };
  const onCancel = () => setEditable(false);

  const handleCaptureImage = async () => {
    setModalVisible(false);
    const reselt = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true
    });
    if (!reselt.canceled) {
      const base64 = `data:image/png;base64,${reselt.assets[0].base64}`;
      user?.setProfileImage({
        file: base64
      })
    }
    ToastAndroid.show('Your Avatar is updated successfully!!', ToastAndroid.SHORT);
  };
  const handleViewImage = () => {
    setModalVisible(false);
    setImageViewVisible(true);
  };

  const handlePickImage = async () => {
    setModalVisible(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true
    });
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      await user?.setProfileImage({ file: base64 });
      ToastAndroid.show('Your Avatar is updated successfully!!', ToastAndroid.SHORT);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert('Success', 'You have been logged out.');
      if (Platform.OS === 'android') {
        ToastAndroid.show(`${firstName} has been logged out.`, ToastAndroid.SHORT);
      }
      router.replace('/(models)/login');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={DefaultStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={`${Colors.light.tint}80`}
        showHideTransition="slide"
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} color={Colors.primary} />
      </View>

      {user && (
        <View style={DefaultStyles.card}>

          {/* Profile Avatar */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={
              user?.imageUrl
                ? { uri: user?.imageUrl }
                : require('@/assets/images/favicon.png')
            }
              style={styles.avatar}
            />
          </TouchableOpacity>

          {/* Modal for Options */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Pressable style={styles.optionButton} onPress={handleViewImage}>
                  <Text style={styles.optionText}>View Profile Image</Text>
                  <Ionicons name='eye' size={26} color={Colors.primary} />
                </Pressable>
                <Pressable style={styles.optionButton} onPress={handlePickImage}>
                  <Text style={styles.optionText}>Select from Gallery</Text>
                  <Ionicons name='flower-outline' size={26} color={Colors.grey} />
                </Pressable>
                <Pressable style={styles.optionButton} onPress={handleCaptureImage}>
                  <Text style={styles.optionText}>Open Camera and Update</Text>
                  <Ionicons name='camera' size={26} color={'#7879FE'} />
                </Pressable>
                <Pressable
                  style={[styles.optionButton, { justifyContent: 'flex-end' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.optionText, { color: Colors.primary }]}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Modal for View Profile Image */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={imageViewVisible}
            onRequestClose={() => setImageViewVisible(false)}
          >
            <View style={styles.imageViewContainer}>
              <View style={styles.imageViewContent}>
                <Image
                  source={
                    user?.imageUrl
                      ? { uri: user.imageUrl }
                      : require('@/assets/images/favicon.png') // Fallback image
                  }
                  style={styles.fullScreenImage}
                  resizeMode="contain"
                />
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setImageViewVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={styles.infoContainer}>
            {editable ? (
              <View style={[styles.editRow, { flexDirection: 'column', height: 200 }]}>
                <TextInput
                  placeholder='First name'
                  value={firstName || ''}
                  onChangeText={(text) => setFirstName(text)}
                  style={[DefaultStyles.inputField, { width: 200, marginVertical: 0 }]}
                />
                <TextInput
                  placeholder='Last name'
                  value={lastName || ''}
                  onChangeText={(text) => setLastName(text)}
                  style={[DefaultStyles.inputField, { width: 200, marginBottom: 0 }]}
                />
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', gap: 5 }}>
                  <TouchableOpacity onPress={onCancel} style={[styles.Button, { backgroundColor: "#ED2364" }]}>
                    <Text style={styles.ButtonText}>Cancel</Text>
                    <Ionicons name='warning' size={24} color={Colors.dark.text} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onSaveUser} style={[styles.Button, { backgroundColor: "#34DE64" }]}>
                    <Text style={styles.ButtonText}>Save</Text>
                    <Ionicons name='shield-checkmark-outline' size={24} color={Colors.dark.text} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={styles.names}>Hey {firstName}; {lastName}</Text>
                <TouchableOpacity onPress={() => setEditable(true)}>
                  <Ionicons name="create" size={24} color={Colors.light.tabIconDefault} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since: {formattedDate}</Text>
        </View>
      )}

      <View style={styles.container}>
        {isSignedIn ? (
          <Pressable onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        ) : (
          <Link href={'/(models)/login'} asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
          </Link>
        )}
      </View>
    </SafeAreaView>
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
  headerContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    fontFamily: 'OutfitSemiBold',
    color: '#E56FA1',
    fontWeight: '900',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#ff634A',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.grey,
  },
  names: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OutfitBlack',
  },
  editRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  Button: {
    backgroundColor: "#34DE64",
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5
  },
  flexCenter: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  imageViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  imageViewContent: {
    width: '90%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  fullScreenImage: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
