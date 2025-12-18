import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Briefcase, FileText, Home, MoreHorizontal, QrCode } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCodeModal from './QRCodeModal';

const actions = [
  { id: 0, title: 'Digital Identity', icon: QrCode, color: Colors.primary, action: 'qr' },
  { id: 1, title: 'Apply Leave', icon: Briefcase, color: Colors.accent, link: '/apply-leave' },
  { id: 2, title: 'Apply WFH', icon: Home, color: Colors.primary, link: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, color: Colors.warning, link: '/(tabs)/index' },
  { id: 4, title: 'More', icon: MoreHorizontal, color: Colors.secondary, link: '/(tabs)/index' },
];

export default function QuickActions() {
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const handleActionPress = (action: any) => {
    if (action.action === 'qr') {
      setQrModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action) => (
          action.link ? (
            <Link key={action.id} href={action.link as any} asChild>
              <TouchableOpacity style={styles.chip}>
                <View style={[styles.iconBox, { backgroundColor: action.color + '15' }]}>
                  <action.icon size={20} color={action.color} />
                </View>
                <Text style={styles.chipText}>{action.title}</Text>
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity 
              key={action.id} 
              style={styles.chip}
              onPress={() => handleActionPress(action)}
            >
              <View style={[styles.iconBox, { backgroundColor: action.color + '15' }]}>
                <action.icon size={20} color={action.color} />
              </View>
              <Text style={styles.chipText}>{action.title}</Text>
            </TouchableOpacity>
          )
        ))}
      </ScrollView>

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: Colors.spacing,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: Colors.spacing,
    gap: 12,
    paddingBottom: 5
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    gap: 10,
    ...Colors.shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 4,
    ...Colors.shadows.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
});
