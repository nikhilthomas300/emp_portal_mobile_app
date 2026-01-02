import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Briefcase, FileText, Home, QrCode, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QRCodeModal } from '../navigation';
import SectionHeader from './SectionHeader';

const actions = [
  { id: 0, title: 'Digital Identity', icon: QrCode, color: Colors.primary, action: 'qr' },
  { id: 1, title: 'Apply Leave', icon: Briefcase, color: Colors.accent, link: '/apply-leave' },
  { id: 2, title: 'Apply Work From Home', icon: Home, color: Colors.primary, link: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, color: Colors.warning, link: '/(tabs)/index' },
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
      <>
        <LinearGradient
          colors={[action.color + '20', action.color + '10']}
          style={styles.iconCircle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <action.icon size={14} color={action.color} strokeWidth={2.5} />
        </LinearGradient>
        <Text style={styles.itemText}>{action.title}</Text>
      </>
    );

    return action.link ? (
      <Link key={action.id} href={action.link as any} asChild>
        <TouchableOpacity style={styles.chip} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity 
        key={action.id} 
        style={styles.chip}
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
      
      <View style={styles.chipsContainer}>
        {actions.map((action) => renderItem(action))}
      </View>

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginTop: -8,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Colors.spacing,
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 6,
    paddingLeft: 4,
    paddingRight: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignSelf: 'flex-start',
    ...Colors.shadows.small,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
});


