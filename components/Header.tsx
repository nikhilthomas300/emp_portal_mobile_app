import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Bell, QrCode } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCodeModal from './QRCodeModal';
import SearchModal from './SearchModal';

export default function Header() {
  const insets = useSafeAreaInsets();
  const [qrVisible, setQrVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        <View style={styles.row}>
          {/* Left: Avatar & Name */}
          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.leftSection}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>PV</Text>
              </View>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Hello, Good Afternoon</Text>
                <Text style={styles.name}>Pavan !</Text>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Right: Actions */}
          <View style={styles.rightSection}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setQrVisible(true)}
            >
              <QrCode size={22} color={Colors.text} />
            </TouchableOpacity>
            
            <Link href="/approvals" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Bell size={22} color={Colors.text} />
                <View style={styles.badge} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      <QRCodeModal visible={qrVisible} onClose={() => setQrVisible(false)} />
      <SearchModal visible={searchVisible} onClose={() => setSearchVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: Colors.spacing,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  greetingContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  rightSection: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadows.small,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },
});
