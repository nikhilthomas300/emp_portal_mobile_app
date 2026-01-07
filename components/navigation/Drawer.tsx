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
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 320);

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
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose} statusBarTranslucent={true}>
        <View style={styles.container}>
          {/* Backdrop */}
          <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

          {/* Drawer Content */}
          <View style={[styles.drawer, { width: DRAWER_WIDTH }]}>
            {/* Blue Gradient Header */}
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
                  <X size={18} color="#FFF" strokeWidth={2.5} />
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
                        <item.icon size={20} color="#3B82F6" strokeWidth={1.8} />
                      </View>
                      <Text style={styles.quickText}>{item.title}</Text>
                    </TouchableOpacity>
                  </Link>
                ) : (
                  <TouchableOpacity key={item.id} style={styles.quickItem} onPress={() => handleQuickLinkPress(item)}>
                    <View style={styles.quickIcon}>
                      <item.icon size={20} color="#3B82F6" strokeWidth={1.8} />
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
                      <item.icon size={18} color="#3B82F6" strokeWidth={1.8} />
                    </View>
                    <Text style={styles.menuText}>{item.title}</Text>
                    <ChevronRight size={16} color="#CBD5E1" strokeWidth={2} />
                  </TouchableOpacity>
                </Link>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
              <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                <LogOut size={18} color="#EF4444" strokeWidth={2} />
                <Text style={styles.logoutText}>Sign Out</Text>
              </TouchableOpacity>
              <Text style={styles.versionText}>App Version 1.0.0</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  },
  logoIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  appName: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  tagline: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 1 },

  quickSection: { 
    flexDirection: 'row', 
    paddingHorizontal: 12, 
    paddingVertical: 16, 
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E8F0',
  },
  quickItem: { flex: 1, alignItems: 'center', gap: 8 },
  quickIcon: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  quickText: { fontSize: 11, fontWeight: '600', color: '#374151' },

  menuScroll: { flex: 1 },
  menuContent: { paddingHorizontal: 12, paddingVertical: 12 },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 14, 
    paddingVertical: 12, 
    paddingHorizontal: 12, 
    borderRadius: 12,
    marginBottom: 2,
  },
  menuIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#334155' },

  footer: { 
    paddingHorizontal: 16, 
    paddingTop: 16, 
    borderTopWidth: 1, 
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    paddingVertical: 14, 
    borderRadius: 12, 
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    width: '100%',
  },
  logoutText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
  versionText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 12,
    fontWeight: '500',
  }
});
