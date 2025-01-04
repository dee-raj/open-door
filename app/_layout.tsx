import * as SecureStore from 'expo-secure-store';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
if (!publishableKey) {
  console.warn('Publishable Key is missing. Authentication may not work.');
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito: require('../assets/fonts/Nunito-Regular.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
    NunitoLight: require('../assets/fonts/Nunito-Light.ttf'),
    NunitoItalic: require('../assets/fonts/Nunito-Italic.ttf'),
    OutfitSemiBold: require('../assets/fonts/Outfit-SemiBold.ttf'),
    OutfitBlack: require('../assets/fonts/Outfit-Black.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      router.replace(isSignedIn ? '/(tabs)' : '/(models)/login');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(models)/login"
        options={{
          title: "Login or SignUp",
          headerTitleStyle: {
            fontFamily: 'NunitoBold',
          },
          presentation: "modal",
          animation: 'slide_from_bottom',
          animationDuration: 500,
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitle: "Listing Details",
          headerTitleStyle: {
            fontFamily: 'NunitoBold',
          },
        }}
      />
      <Stack.Screen
        name="(models)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTitle: "Booking Details",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
});
