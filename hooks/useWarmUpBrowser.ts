import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Warm up the browser only on native platforms (iOS, Android)
      void WebBrowser.warmUpAsync();
    }

    // Clean up and cool down the browser only on native platforms (iOS, Android)
    return () => {
      if (Platform.OS !== 'web') {
        void WebBrowser.coolDownAsync();
      }
    };
  }, []);
};
