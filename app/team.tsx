import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, CalendarOff, CheckCircle, FileText, Share2, UserCheck, Users } from 'lucide-react-native';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - (HORIZONTAL_PADDING * 2) - (GAP * 2)) / 3;

const teamWidgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Team Attendance', icon: Users, link: null },
  { id: 3, title: 'Team Leaves', icon: CalendarOff, link: null },
  { id: 4, title: 'Shared Assets', icon: Share2, link: null },
  { id: 5, title: 'Team Letters', icon: FileText, link: null },
  { id: 6, title: 'Team Directory', icon: UserCheck, link: null },
];

export default function TeamScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderCard = (widget: typeof teamWidgets[0]) => {
    const cardContent = (
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          <widget.icon size={24} color={Colors.primary} strokeWidth={1.8} />
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
      </TouchableOpacity>
    );

    return widget.link ? (
      <Link key={widget.id} href={widget.link as any} asChild>
        {cardContent}
      </Link>
    ) : (
      <View key={widget.id}>{cardContent}</View>
    );
  };

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
          <Text style={styles.headerTitle}>My Team</Text>
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
          {teamWidgets.map((widget) => renderCard(widget))}
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
    padding: HORIZONTAL_PADDING,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    width: CARD_WIDTH,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 17,
    letterSpacing: -0.2,
    minHeight: 34,
  },
});
