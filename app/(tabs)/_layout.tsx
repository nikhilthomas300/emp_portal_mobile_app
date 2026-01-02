import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { Bot, Grid, Home, Newspaper, Search } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 8,
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
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerButtonWrapper}>
              <LinearGradient
                colors={['#4338CA', '#6366F1', '#818CF8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.centerButton}
              >
                <Bot size={24} color="#FFFFFF" strokeWidth={2.5} />
              </LinearGradient>
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
            marginTop: 4,
            color: Colors.primary,
          },
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
    position: 'relative',
    top: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
