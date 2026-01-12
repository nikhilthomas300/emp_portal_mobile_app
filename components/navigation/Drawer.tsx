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
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QRCodeModal from './QRCodeModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 340);

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
}

const quickLinks = [
  { id: 1, title: 'Digital ID', icon: QrCode, action: 'qr' },
  { id: 2, title: 'Leave', icon: Briefcase, route: '/apply-leave' },
  { id: 3, title: 'WFH', icon: Home, route: '/apply-wfh' },
  { id: 4, title: 'Letters', icon: FileText, route: '/(tabs)/index' },
];

const menuItems = [
  { id: 1, title: 'My Meetings', icon: Users, route: '/meetings' },
  { id: 2, title: 'Company News', icon: Newspaper, route: '/(tabs)/news' },
  { id: 3, title: 'App Store', icon: Grid, route: '/(tabs)/appstore' },
  { id: 4, title: 'Ask Newton', icon: MessageSquare, route: '/(tabs)/chat' },
  { id: 5, title: 'My Approvals', icon: Bell, route: '/approvals' },
  { id: 6, title: 'Holiday Calendar', icon: Calendar, route: '/holidays' },
  { id: 7, title: 'My Profile', icon: User, route: '/profile' },
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
      <Modal 
        animationType="fade" 
        transparent={true} 
        visible={visible} 
        onRequestClose={onClose} 
        statusBarTranslucent={true}
      >
        <View style={styles.container}>
          {/* Backdrop */}
          <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

          {/* Drawer Content */}
          <View style={[styles.drawer, { width: DRAWER_WIDTH }]}>
            {/* Header - matching app header theme */}
            <LinearGradient
              colors={['#0D3C75', '#165BAA', '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.header, { paddingTop: insets.top + 12 }]}
            >
              <View style={styles.headerTop}>
                <View style={styles.headerInfo}>
                  <View style={styles.logoIcon}>
                    <Sparkles size={24} color="#FFD700" strokeWidth={2} />
                  </View>
                  <View>
                    <Text style={styles.appName}>Employee Portal</Text>
                    <Text style={styles.tagline}>Enterprise Hub</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <X size={20} color="#FFF" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Menu */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.menuScroll} contentContainerStyle={styles.menuContent}>
              {menuItems.map((item, index) => (
                <Link key={item.id} href={item.route as any} asChild>
                  <TouchableOpacity style={styles.menuItem} onPress={onClose} activeOpacity={0.7}>
                    <View style={styles.menuIconBg}>
                      <item.icon size={20} color="#0066FF" strokeWidth={2} />
                    </View>
                    <Text style={styles.menuText}>{item.title}</Text>
                    <ChevronRight size={18} color="#CBD5E1" strokeWidth={2} />
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
              <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                <LogOut size={20} color="#FF4757" strokeWidth={2} />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
              <Text style={styles.versionText}>Version 1.0.0</Text>
            </View>
          </View>
        </View>
      </Modal>

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 22, 40, 0.6)',
  },
  backdrop: { 
    flex: 1,
  },
  drawer: { 
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  
  header: { 
    paddingHorizontal: 18, 
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    backgroundColor: 'rgba(255,255,255,0.12)', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  appName: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  tagline: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },

  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    padding: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066FF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },

  quickSection: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 18, 
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E8F0',
    gap: 10,
  },
  quickItem: { flex: 1, alignItems: 'center', gap: 8 },
  quickIcon: { 
    width: 52, 
    height: 52, 
    borderRadius: 16, 
    backgroundColor: '#E6F0FF',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  quickText: { fontSize: 12, fontWeight: '600', color: '#1E293B' },

  menuScroll: { flex: 1, backgroundColor: '#F8FAFC' },
  menuContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E293B' },

  footer: { 
    paddingHorizontal: 20, 
    paddingTop: 16, 
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 10, 
    paddingVertical: 14, 
    borderRadius: 14, 
    backgroundColor: '#FFF1F2',
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    width: '100%',
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#E11D48' },
  versionText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 12,
    fontWeight: '500',
  }
});
