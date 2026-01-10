import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// App icons from assets
const appIcons: { [key: string]: any } = {
  'EASEF': require('@/assets/images/apps/EASEF.png'),
  'EPAY': require('@/assets/images/apps/EPAY.png'),
  'PROVIDENT': require('@/assets/images/apps/PROVIDENT.png'),
  'PS': require('@/assets/images/apps/PS.png'),
  'SSP': require('@/assets/images/apps/SSP.png'),
  'TALENTNEXT': require('@/assets/images/apps/TALENTNEXT.png'),
};

// 8 Quick Links
const quickLinks = [
  { id: 1, title: 'Oracle EBS', image: 'PS' },
  { id: 2, title: 'HCM', image: 'SSP' },
  { id: 3, title: 'SCM', image: 'PROVIDENT' },
  { id: 4, title: 'CareerOrbit', image: 'EPAY' },
  { id: 5, title: 'TalentNext', image: 'TALENTNEXT' },
  { id: 6, title: 'Ease+', image: 'EASEF' },
  { id: 7, title: 'Geek Cloud', image: 'SSP' },
  { id: 8, title: 'Accolade', image: 'PROVIDENT' },
];

export default function QuickActionsGrid() {
  const handlePress = (title: string) => {
    Alert.alert('Opening', `${title} app is opening...`);
  };

  return (
    <View style={styles.container}>
      <SectionHeader title="Quick Links" />
      
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          {quickLinks.map((app) => (
            <TouchableOpacity 
              key={app.id} 
              style={styles.appItem}
              onPress={() => handlePress(app.title)}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrapper}>
                <Image 
                  source={appIcons[app.image]} 
                  style={styles.appIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.appTitle} numberOfLines={1}>{app.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  appItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appIcon: {
    width: 34,
    height: 34,
    borderRadius: 6,
  },
  appTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
});
