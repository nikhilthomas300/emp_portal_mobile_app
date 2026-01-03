import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Bot, Grid, Home, Newspaper, Search } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

function BreathingButton({ focused }: { focused: boolean }) {
  const scale = useSharedValue(1);
  const ringScale = useSharedValue(1);
  const breatheScale = useSharedValue(1);

  React.useEffect(() => {
    // Always animate breathing when not focused
    if (!focused) {
      breatheScale.value = withRepeat(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      breatheScale.value = withTiming(1);
    }
    
    if (focused) {
      scale.value = withRepeat(
        withTiming(1.08, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      ringScale.value = withRepeat(
        withTiming(1.4, { duration: 1500, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    } else {
      scale.value = withTiming(1);
      ringScale.value = withTiming(1);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: focused ? scale.value : breatheScale.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: interpolate(ringScale.value, [1, 1.4], [0.4, 0]),
  }));

  return (
    <View style={styles.centerButtonWrapper}>
      {focused && (
        <Animated.View
            style={[
              {
                position: 'absolute',
                top: -18,
                width: 50,
                height: 50,
                borderRadius: 16,
                backgroundColor: '#3B82F6',
                zIndex: -1,
              },
              ringStyle,
            ]}
        />
      )}
      <Animated.View style={[animatedStyle, { position: 'absolute', top: -18 }]}>
        <LinearGradient
            colors={focused ? ['#1E40AF', '#3B82F6', '#60A5FA'] : ['#EFF6FF', '#DBEAFE', '#E0E7FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.centerButton, !focused && styles.centerButtonInactive]}
        >
            <Bot size={24} color={focused ? "#FFFFFF" : '#6366F1'} strokeWidth={2} />
        </LinearGradient>
      </Animated.View>
      <Text style={[styles.centerButtonLabel, { color: focused ? Colors.primary : '#6366F1' }]} numberOfLines={1}>Ask Newton</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 75 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
          elevation: 12,
          shadowColor: '#6366F1',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Home size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <Newspaper size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Ask Newton',
          tabBarLabel: () => null, // Hide default label to control alignment manually
          tabBarIcon: ({ focused }) => (
            <BreathingButton focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="appstore"
        options={{
          title: 'Apps',
          tabBarIcon: ({ color, focused }) => (
            <Grid size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Search size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
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
    width: 70,
    height: 50,
  },
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  centerButtonInactive: {
      borderWidth: 1.5,
      borderColor: '#C7D2FE',
      shadowOpacity: 0.15,
      elevation: 3,
  },
  centerButtonLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 40,
    textAlign: 'center',
  },
});
