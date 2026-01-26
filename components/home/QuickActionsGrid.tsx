import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
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

// Soft gradient backgrounds for each app
const appGradients: { [key: string]: [string, string] } = {
  'Oracle EBS': ['#DBEAFE', '#EFF6FF'],
  'HCM': ['#FEE2E2', '#FEF2F2'],
  'SCM': ['#D1FAE5', '#ECFDF5'],
  'CareerOrbit': ['#CFFAFE', '#ECFEFF'],
  'TalentNext': ['#EDE9FE', '#F5F3FF'],
  'Ease+': ['#FEF3C7', '#FFFBEB'],
  'Geek Cloud': ['#FCE7F3', '#FDF2F8'],
  'Accolade': ['#CCFBF1', '#F0FDFA'],
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Opening', `${title} app is opening...`);
  };

  return (
    <View style={styles.container}>
      <SectionHeader title="Quick Links" />
      
      <Animated.View 
        entering={FadeInDown.duration(400).delay(50)}
        style={styles.cardContainer}
      >
        <View style={styles.gridContainer}>
          {quickLinks.map((app) => {
            const gradients = appGradients[app.title] || ['#F1F5F9', '#F8FAFC'];
            
            return (
              <TouchableOpacity 
                key={app.id} 
                style={styles.appItem}
                onPress={() => handlePress(app.title)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={gradients}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconContainer}
                >
                  <Image 
                    source={appIcons[app.image]} 
                    style={styles.appIcon}
                    resizeMode="contain"
                  />
                </LinearGradient>
                <Text style={styles.appTitle} numberOfLines={1}>{app.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 12,
    // Premium soft shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 6,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  appItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  appIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  appTitle: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#334155',
    textAlign: 'center',
  },
});
