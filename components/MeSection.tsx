import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Box, Clock, CreditCard, DollarSign, FileText, Grid3X3, Truck, User, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInUp,
  SlideOutDown
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SectionHeader from './SectionHeader';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const PILL_WIDTH = (SCREEN_WIDTH - (Colors.spacing * 2) - 8) / 2; // 2 per row with gap

const widgets = [
  { id: 1, title: 'My Attendance', icon: Clock, color: '#4338CA' },
  { id: 2, title: 'My Transport', icon: Truck, color: '#DB2777' },
  { id: 3, title: 'Salary Status', icon: DollarSign, color: '#059669' },
  { id: 4, title: 'My Assets', icon: Box, color: '#D97706' },
  { id: 5, title: 'My Letters', icon: FileText, color: '#7C3AED' },
  { id: 6, title: 'My Profile', icon: User, color: '#0891B2' },
  { id: 7, title: 'Flex Benefits', icon: Activity, color: '#EA580C' },
];

const allWidgets = [
  ...widgets,
  { id: 8, title: 'Expenses', icon: CreditCard, color: '#8B5CF6' },
  { id: 9, title: 'Transport', icon: Truck, color: '#EC4899' },
];

export default function MeSection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Hide tab bar when modal is open
  useEffect(() => {
    if (modalVisible) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' }
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: Platform.OS === 'ios' ? 75 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        }
      });
    }
  }, [modalVisible, navigation]);

  useEffect(() => {
    if (modalVisible) {
      setShowContent(true);
    }
  }, [modalVisible]);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => setModalVisible(false), 250);
  };

  const sheetHeight = SCREEN_HEIGHT * 0.70;

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Widgets" 
        icon={Grid3X3}
        iconColor="#7C3AED"
        showSeeAll
        onSeeAll={() => setModalVisible(true)}
      />
      
      {/* Pills Grid - Wrapping Layout */}
      <View style={styles.pillsContainer}>
        {widgets.slice(0, 6).map((widget) => (
          <TouchableOpacity key={widget.id} style={styles.pill} activeOpacity={0.7}>
            <LinearGradient
              colors={[widget.color + '20', widget.color + '10']}
              style={styles.pillIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <widget.icon size={16} color={widget.color} strokeWidth={2.5} />
            </LinearGradient>
            <Text style={styles.pillText} numberOfLines={2}>{widget.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
      >
        {/* Full screen container with overlay color */}
        <View style={styles.modalBackground}>
          {/* Pressable overlay area (top part) */}
          {showContent && (
            <Animated.View 
              entering={FadeIn.duration(250)} 
              exiting={FadeOut.duration(200)}
              style={styles.overlayPressable}
            >
              <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
            </Animated.View>
          )}

          {/* Bottom Sheet */}
          {showContent && (
            <Animated.View 
              entering={SlideInUp.duration(350).easing(Easing.out(Easing.quad))}
              exiting={SlideOutDown.duration(200)}
              style={[styles.bottomSheet, { height: sheetHeight }]}
            >
              {/* Handle Bar */}
              <View style={styles.handleContainer}>
                <View style={styles.handleBar} />
              </View>

              {/* Header */}
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>My Widgets</Text>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <X size={20} color={Colors.secondaryText} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <ScrollView 
                contentContainerStyle={styles.sheetGrid}
                showsVerticalScrollIndicator={false}
              >
                {allWidgets.map((widget) => (
                  <TouchableOpacity key={widget.id} style={styles.sheetCard} activeOpacity={0.7}>
                    <LinearGradient
                      colors={[widget.color + '15', widget.color + '05']}
                      style={styles.sheetIconBg}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <widget.icon size={24} color={widget.color} strokeWidth={1.8} />
                    </LinearGradient>
                    <Text style={styles.sheetCardTitle} numberOfLines={2}>{widget.title}</Text>
                  </TouchableOpacity>
                ))}
                {/* Scroll padding */}
                <View style={{ height: 40 }} />
              </ScrollView>
              
              {/* ABSOLUTE FOOTER - Forces white background at the very bottom */}
              <View style={{ 
                position: 'absolute', 
                bottom: -200, 
                left: 0, 
                right: 0, 
                height: 200 + (insets.bottom || 24), 
                backgroundColor: '#FFFFFF',
                zIndex: -1 
              }} />
            </Animated.View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  // Pills Grid Layout - 2 per row
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Colors.spacing,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 10,
    width: PILL_WIDTH,
    // Polished Look
    ...Colors.shadows.small,
    borderWidth: 1,
    borderColor: '#F3F4F6', // Subtle border
  },
  pillIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontSize: 13, // Slightly larger for readability
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    lineHeight: 18, // Clean line height
  },
  // Modal Styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Removed overflow: hidden to allow the footer to extend outside if needed, 
    // but we are positioning it inside.
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handleBar: {
    width: 36,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  sheetCard: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    margin: '1.16%',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
  },
  sheetIconBg: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sheetCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 17,
  },
});
