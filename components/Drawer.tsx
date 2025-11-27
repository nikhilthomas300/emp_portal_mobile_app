import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Bell, Calendar, Grid, Home, LogOut, MessageSquare, Search, Sparkles, User } from 'lucide-react-native';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 1, title: 'Home', icon: Home, route: '/(tabs)/index', color: Colors.primary },
  { id: 2, title: 'Search', icon: Search, route: '/(tabs)/search', color: Colors.secondary },
  { id: 3, title: 'Chat', icon: MessageSquare, route: '/(tabs)/chat', color: Colors.accent },
  { id: 4, title: 'App Store', icon: Grid, route: '/(tabs)/appstore', color: Colors.success },
  { id: 5, title: 'Calendar', icon: Calendar, route: '/calendar', color: Colors.warning },
  { id: 6, title: 'Directory', icon: User, route: '/directory', color: Colors.secondary },
  { id: 7, title: 'Approvals', icon: Bell, route: '/approvals', color: Colors.accent },
];

export default function Drawer({ visible, onClose }: DrawerProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.drawer, { paddingTop: insets.top + 24 }]}>
          {/* App Branding */}
          <View style={styles.branding}>
            <View style={styles.appIcon}>
              <Sparkles size={24} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <Text style={styles.appName}>Eureka Hub</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Menu */}
          <ScrollView showsVerticalScrollIndicator={false} style={styles.menuScroll}>
            <View style={styles.menu}>
              {menuItems.map((item) => (
                <Link key={item.id} href={item.route as any} asChild>
                  <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                      <item.icon size={20} color={item.color} strokeWidth={2.5} />
                    </View>
                    <Text style={styles.menuText}>{item.title}</Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.logoutButton}>
              <View style={styles.logoutIcon}>
                <LogOut size={18} color={Colors.danger} strokeWidth={2.5} />
              </View>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.backdrop} 
          onPress={onClose} 
          activeOpacity={1} 
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    width: '80%',
    maxWidth: 300,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
  },
  backdrop: {
    flex: 1,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadows.small,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  menuScroll: {
    flex: 1,
  },
  menu: {
    paddingHorizontal: 16,
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.danger + '10',
  },
  logoutIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.danger + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.danger,
  },
});
