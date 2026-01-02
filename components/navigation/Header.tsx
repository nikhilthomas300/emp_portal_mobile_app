import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { AlignLeft, ClipboardCheck, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Drawer from './Drawer';

export default function Header() {
  const insets = useSafeAreaInsets();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#60A5FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { paddingTop: insets.top + 10 }]}
      >
        {/* Header Row */}
        <View style={styles.headerContent}>
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerVisible(true)}>
              <AlignLeft size={22} color="#FFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.name}>Nikhil Thomas</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <Link href="/approvals" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <ClipboardCheck size={22} color="#FFF" />
                <View style={styles.badge} />
              </TouchableOpacity>
            </Link>
            <Link href="/profile" asChild>
              <TouchableOpacity style={styles.avatarContainer}>
                <Text style={styles.avatarText}>NT</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Search Bar */}
        <Link href="/search" asChild>
          <TouchableOpacity style={styles.searchBar} activeOpacity={0.9}>
             <Search size={20} color="#94A3B8" />
             <Text style={styles.searchText}>Search widgets, actions...</Text>
          </TouchableOpacity>
        </Link>
      </LinearGradient>

      <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },
  greeting: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  name: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
