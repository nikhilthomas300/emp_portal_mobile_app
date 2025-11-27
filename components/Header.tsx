import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { AlignLeft, Bell } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Drawer from './Drawer';

export default function Header() {
  const insets = useSafeAreaInsets();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerVisible(true)}>
            <AlignLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.name}>Nikhil Thomas</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Link href="/approvals" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color={Colors.text} />
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

      <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: Colors.spacing,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuButton: {
    padding: 8,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    ...Colors.shadows.small,
  },
  greeting: {
    fontSize: 14,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  name: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    position: 'relative',
    ...Colors.shadows.small,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
    borderWidth: 1,
    borderColor: Colors.cardBackground,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadows.small,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
