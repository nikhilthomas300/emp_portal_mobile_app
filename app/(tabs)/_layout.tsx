import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, usePathname } from 'expo-router';
import { Grid, Home, Newspaper, Search } from 'lucide-react-native';
import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Dexter icon (animated gif)
const newtonGif = require('@/assets/images/others/newton.gif');

// Sophisticated center button with animated gif
function CenterButton({ focused }: { focused: boolean }) {
  return (
    <View style={styles.centerButtonWrapper}>
      <View style={[styles.centerButtonOuter, focused && styles.centerButtonOuterActive]}>
        <LinearGradient
          colors={focused ? ['#2563EB', '#1D4ED8'] : ['#FFFFFF', '#F8FAFC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.centerButton}
        >
          <Image 
            source={newtonGif} 
            style={styles.newtonIcon}
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
    </View>
  );
}

export default function TabLayout() {
  const pathname = usePathname();
  const isChatScreen = pathname === '/chat';
  const insets = useSafeAreaInsets();
  
  const bottomPadding = Platform.select({
    ios: Math.max(insets.bottom - 12, 4),
    android: 6,
    default: 6,
  });
  
  const tabBarHeight = 62 + bottomPadding;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0F172A',
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
          borderTopWidth: 0,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          // Premium deep shadow
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 20,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
          letterSpacing: 0.2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeWrapper]}>
              <Home size={24} color={focused ? '#2563EB' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: 'News',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeWrapper]}>
              <Newspaper size={24} color={focused ? '#2563EB' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <CenterButton focused={focused} />,
          tabBarLabel: () => <Text style={styles.centerLabel}>Dexter</Text>,
        }}
      />
      <Tabs.Screen
        name="appstore"
        options={{
          title: 'Apps',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeWrapper]}>
              <Grid size={24} color={focused ? '#2563EB' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.activeWrapper]}>
              <Search size={24} color={focused ? '#2563EB' : color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 44,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 2,
  },
  activeWrapper: {
    backgroundColor: '#EFF6FF', // Subtle blue tint for active state
  },
  centerButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -24,
  },
  centerButtonOuter: {
    padding: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  centerButtonOuterActive: {
    shadowColor: '#2563EB',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newtonIcon: {
    width: 50,
    height: 50,
  },
  centerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 4,
  },
});
