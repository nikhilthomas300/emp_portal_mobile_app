import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Activity, ArrowLeft, Box, Clock, CreditCard, DollarSign, FileText, Truck, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const allWidgets = [
  { id: 1, title: 'My Attendance', icon: Clock },
  { id: 2, title: 'My Transport', icon: Truck },
  { id: 3, title: 'Salary Payment Status', icon: DollarSign },
  { id: 4, title: 'My Assets', icon: Box },
  { id: 5, title: 'My Letters', icon: FileText },
  { id: 6, title: 'My Profile', icon: User },
  { id: 7, title: 'Flex', icon: Activity },
  { id: 8, title: 'My Facility Access', icon: CreditCard },
  { id: 9, title: 'PerformanceNext - Check In', icon: Truck },
  { id: 10, title: 'My Visitors', icon: Truck },
  { id: 11, title: 'Meal Card', icon: Truck },
];

export default function WidgetsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Blue Gradient Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#60A5FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Widgets</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {allWidgets.map((widget) => (
            <View key={widget.id} style={styles.cardWrapper}>
              <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                <View style={styles.iconContainer}>
                  <widget.icon size={24} color={Colors.primary} strokeWidth={1.8} />
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  cardWrapper: {
    width: '33.33%',
    padding: 4,
  },
  card: {
    height: 110,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: 34,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: -0.2,
  },
});
