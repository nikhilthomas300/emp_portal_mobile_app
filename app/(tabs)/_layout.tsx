import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, usePathname } from 'expo-router';
import { Grid, Home, Newspaper, Search } from 'lucide-react-native';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Newton icon
const newtonIcon = require('@/assets/images/others/newton.png');

function CenterButton({ focused }: { focused: boolean }) {
  const breatheScale = useSharedValue(1);

  React.useEffect(() => {
    if (focused) {
      breatheScale.value = withRepeat(
        withTiming(1.05, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      breatheScale.value = withTiming(1);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breatheScale.value }],
  }));

  return (
    <View style={styles.centerButtonWrapper}>
      <Animated.View style={[styles.centerButtonOuter, animatedStyle]}>
        <LinearGradient
          colors={focused ? ['#1E40AF', '#3B82F6'] : ['#EFF6FF', '#DBEAFE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.centerButton}
        >
          <Image 
            source={newtonIcon} 
            style={[styles.newtonIcon, { tintColor: focused ? '#FFFFFF' : '#3B82F6' }]}
            resizeMode="contain"
          />
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

export default function TabLayout() {
  const pathname = usePathname();
  const isChatScreen = pathname === '/chat';
  const insets = useSafeAreaInsets();
  
  // Calculate proper bottom padding for Android with navigation buttons
  const androidBottomPadding = Math.max(insets.bottom, 12);
  const tabBarHeight = Platform.OS === 'ios' ? 80 : (56 + androidBottomPadding);
  const bottomPadding = Platform.OS === 'ios' ? 0 : androidBottomPadding;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: isChatScreen ? { display: 'none' } : {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          height: tabBarHeight,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          paddingHorizontal: 8,
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: '#0F172A',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 24,
        },
        tabBarItemStyle: {
          paddingTop: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <Newspaper size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Newton',
          tabBarIcon: ({ focused }) => (
            <CenterButton focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="appstore"
        options={{
          title: 'Apps',
          tabBarIcon: ({ color, focused }) => (
            <Grid size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Search size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28,
  },
  centerButtonOuter: {
    borderRadius: 18,
    padding: 3,
    backgroundColor: '#FFFFFF',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
  },
  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newtonIcon: {
    width: 26,
    height: 26,
  },
});

