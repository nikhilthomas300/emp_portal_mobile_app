import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, Text, TextInput } from 'react-native';
import 'react-native-reanimated';

export {
    ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

// Apply Inter font globally to all Text components
const oldTextRender = (Text as any).render;
(Text as any).render = function (...args: any[]) {
  const origin = oldTextRender.call(this, ...args);
  return {
    ...origin,
    props: {
      ...origin.props,
      style: [{ fontFamily: 'Inter_400Regular' }, origin.props.style],
    },
  };
};

// Apply Inter font globally to all TextInput components
const oldTextInputRender = (TextInput as any).render;
(TextInput as any).render = function (...args: any[]) {
  const origin = oldTextInputRender.call(this, ...args);
  return {
    ...origin,
    props: {
      ...origin.props,
      style: [{ fontFamily: 'Inter_400Regular' }, origin.props.style],
    },
  };
};

// Custom light theme with premium app colors
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#2563EB',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // Uniform smooth transition for all screens
  const screenOptions = {
    headerShown: false,
    animation: 'slide_from_right' as const,
    animationDuration: 250,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
    // Smooth iOS-like animation config
    ...(Platform.OS === 'android' && {
      animation: 'fade_from_bottom' as const,
      animationDuration: 200,
    }),
  };

  return (
    <ThemeProvider value={AppTheme}>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false, 
            animation: 'none' 
          }} 
        />
        <Stack.Screen name="apply-leave" />
        <Stack.Screen name="apply-wfh" />
        <Stack.Screen name="approvals" />
        <Stack.Screen name="holidays" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="widgets" />
        <Stack.Screen name="team" />
        <Stack.Screen name="meetings" />
        <Stack.Screen name="my-letters" />
        <Stack.Screen name="team-letters" />
      </Stack>
    </ThemeProvider>
  );
}
