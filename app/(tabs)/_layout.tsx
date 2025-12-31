import Colors from '@/constants/Colors';
import { Tabs } from 'expo-router';
import { Bot, Grid, Home, Search } from 'lucide-react-native';
import React from 'react';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // @ts-ignore
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: Platform.OS === 'ios' ? 75 : 70,
          paddingBottom: 20, // Reduced padding
          paddingTop: 8,
          elevation: 0, 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#64748B', 
        tabBarLabelStyle: {
          fontSize: 12, 
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search size={24} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Ask Newton',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
               backgroundColor: focused ? '#EEF2FF' : 'transparent',
               paddingHorizontal: 16,
               paddingVertical: 6,
               borderRadius: 20,
               alignItems: 'center',
               justifyContent: 'center',
               marginBottom: 4, // Lift the icon
            }}>
              <Bot size={24} color={color} strokeWidth={2.5} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="appstore"
        options={{
          title: 'App Store',
          tabBarIcon: ({ color }) => <Grid size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="directory"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}
