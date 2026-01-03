import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Briefcase, FileText, Home, QrCode, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QRCodeModal } from '../navigation';
import SectionHeader from './SectionHeader';

const actions = [
  { id: 0, title: 'Digital ID', icon: QrCode, action: 'qr' },
  { id: 1, title: 'Apply Leave', icon: Briefcase, link: '/apply-leave' },
  { id: 2, title: 'WFH', icon: Home, link: '/apply-wfh' },
  { id: 3, title: 'Letters', icon: FileText, link: '/(tabs)/index' },
];

export default function QuickActions() {
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const handleActionPress = (action: any) => {
    if (action.action === 'qr') {
      setQrModalVisible(true);
    }
  };

  const renderItem = (action: typeof actions[0]) => {
    const content = (
      <View style={styles.pill}>
        <View style={styles.iconWrapper}>
          <action.icon size={14} color={Colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.pillText}>{action.title}</Text>
      </View>
    );

    return action.link ? (
      <Link key={action.id} href={action.link as any} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity 
        key={action.id} 
        onPress={() => handleActionPress(action)}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Quick Actions" 
        icon={Zap}
        iconColor="#F59E0B"
      />
      
      <View style={styles.pillsRow}>
        {actions.map((action) => renderItem(action))}
      </View>

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginTop: -8,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Colors.spacing,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingLeft: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  iconWrapper: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
});
