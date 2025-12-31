import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { CalendarOff, CheckCircle, FileText, Share2, UserCheck, Users, X } from 'lucide-react-native';
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
const PILL_WIDTH = (SCREEN_WIDTH - (Colors.spacing * 2) - 8) / 2;

const widgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, color: '#EF4444', link: '/approvals' },
  { id: 2, title: 'Team Attendance', icon: Users, color: '#4338CA', link: null },
  { id: 3, title: 'Team Leaves', icon: CalendarOff, color: '#DB2777', link: null },
  { id: 4, title: 'Shared Assets', icon: Share2, color: '#059669', link: null },
  { id: 5, title: 'Team Letters', icon: FileText, color: '#D97706', link: null },
  { id: 6, title: 'Team Directory', icon: UserCheck, color: '#0891B2', link: null },
];

export default function TeamSection() {
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

  const sheetHeight = SCREEN_HEIGHT * 0.55;

  const renderPill = (widget: typeof widgets[0]) => {
    const content = (
      <>
        <LinearGradient
          colors={[widget.color + '20', widget.color + '10']}
          style={styles.pillIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <widget.icon size={16} color={widget.color} strokeWidth={2.5} />
        </LinearGradient>
        <Text style={styles.pillText} numberOfLines={2}>{widget.title}</Text>
      </>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        <TouchableOpacity style={styles.pill} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      </Link>
    ) : (
      <TouchableOpacity key={widget.id} style={styles.pill} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Team" 
        icon={Users}
        iconColor="#4338CA"
        showSeeAll
        onSeeAll={() => setModalVisible(true)}
      />
      
      {/* Pills Grid - Wrapping Layout */}
      <View style={styles.pillsContainer}>
        {widgets.slice(0, 6).map((widget) => renderPill(widget))}
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
                <Text style={styles.sheetTitle}>My Team</Text>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                  <X size={20} color={Colors.secondaryText} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <ScrollView 
                contentContainerStyle={styles.sheetGrid}
                showsVerticalScrollIndicator={false}
              >
                {widgets.map((widget) => (
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
