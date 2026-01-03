import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import {
    Bell,
    Briefcase,
    Calendar,
    ChevronRight,
    FileText,
    Grid,
    Home,
    LogOut,
    MessageSquare,
    Newspaper,
    QrCode,
    Settings,
    Sparkles,
    Users,
    X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCodeModal from './QRCodeModal';

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
}

const quickLinks = [
  { id: 1, title: 'Digital ID', icon: QrCode, color: '#6366F1', action: 'qr' },
  { id: 2, title: 'Leave', icon: Briefcase, color: '#6366F1', route: '/apply-leave' },
  { id: 3, title: 'WFH', icon: Home, color: '#6366F1', route: '/apply-wfh' },
  { id: 4, title: 'Letters', icon: FileText, color: '#6366F1', route: '/(tabs)/index' },
];

const menuItems = [
  { id: 1, title: 'Home', icon: Home, route: '/(tabs)/index', color: '#6366F1' },
  { id: 2, title: 'News', icon: Newspaper, route: '/(tabs)/news', color: '#6366F1' },
  { id: 3, title: 'App Store', icon: Grid, route: '/(tabs)/appstore', color: '#6366F1' },
  { id: 4, title: 'Ask Newton', icon: MessageSquare, route: '/(tabs)/chat', color: '#6366F1' },
  { id: 5, title: 'Approvals', icon: Bell, route: '/approvals', color: '#6366F1' },
  { id: 6, title: 'Calendar', icon: Calendar, route: '/holidays', color: '#6366F1' },
  { id: 7, title: 'Directory', icon: Users, route: '/directory', color: '#6366F1' },
  { id: 8, title: 'Settings', icon: Settings, route: '/(tabs)/index', color: '#6366F1' },
];

export default function Drawer({ visible, onClose }: DrawerProps) {
  const insets = useSafeAreaInsets();
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const handleQuickLinkPress = (item: typeof quickLinks[0]) => {
    if (item.action === 'qr') {
      setQrModalVisible(true);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose} statusBarTranslucent={true}>
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            {/* Blue Gradient Header with Close Button */}
            <LinearGradient
              colors={['#1E40AF', '#3B82F6', '#60A5FA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.header, { paddingTop: insets.top + 12 }]}
            >
              <View style={styles.headerTop}>
                <View style={styles.headerInfo}>
                  <View style={styles.logoIcon}>
                    <Sparkles size={22} color="#FFF" strokeWidth={2} />
                  </View>
                  <View>
                    <Text style={styles.appName}>Company Hub</Text>
                    <Text style={styles.tagline}>Enterprise Portal</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={20} color="#FFF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Quick Links */}
            <View style={styles.quickSection}>
              {quickLinks.map((item) => (
                item.route ? (
                  <Link key={item.id} href={item.route as any} asChild>
                    <TouchableOpacity style={styles.quickItem} onPress={onClose}>
                      <View style={styles.quickIcon}>
                        <item.icon size={20} color={item.color} strokeWidth={1.8} />
                      </View>
                      <Text style={styles.quickText}>{item.title}</Text>
                    </TouchableOpacity>
                  </Link>
                ) : (
                  <TouchableOpacity key={item.id} style={styles.quickItem} onPress={() => handleQuickLinkPress(item)}>
                    <View style={styles.quickIcon}>
                      <item.icon size={20} color={item.color} strokeWidth={1.8} />
                    </View>
                    <Text style={styles.quickText}>{item.title}</Text>
                  </TouchableOpacity>
                )
              ))}
            </View>

            {/* Menu */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.menuScroll} contentContainerStyle={styles.menuContent}>
              {menuItems.map((item) => (
                <Link key={item.id} href={item.route as any} asChild>
                  <TouchableOpacity style={styles.menuItem} onPress={onClose} activeOpacity={0.7}>
                    <View style={styles.menuIconBg}>
                      <item.icon size={18} color={item.color} strokeWidth={1.8} />
                    </View>
                    <Text style={styles.menuText}>{item.title}</Text>
                    <ChevronRight size={16} color="#CBD5E1" />
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
              <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                <LogOut size={18} color="#EF4444" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        </View>
      </Modal>

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  drawer: { width: '82%', maxWidth: 320, backgroundColor: '#FFFFFF' },
  backdrop: { flex: 1 },
  
  header: { 
    paddingHorizontal: 16, 
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  appName: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  tagline: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  quickSection: { 
    flexDirection: 'row', 
    paddingHorizontal: 12, 
    paddingVertical: 14, 
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E8F0',
  },
  quickItem: { flex: 1, alignItems: 'center', gap: 6 },
  quickIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  quickText: { fontSize: 11, fontWeight: '600', color: '#374151' },

  menuScroll: { flex: 1 },
  menuContent: { paddingHorizontal: 12, paddingVertical: 8 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    borderRadius: 10,
  },
  menuIconBg: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#374151' },

  footer: { 
    paddingHorizontal: 16, 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#E2E8F0',
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    paddingVertical: 12, 
    borderRadius: 10, 
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
});
