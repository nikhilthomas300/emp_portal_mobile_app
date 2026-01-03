import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, CalendarOff, CheckCircle, FileText, Share2, UserCheck, Users } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const teamWidgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Team Attendance Status', icon: Users, link: null },
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
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View key={widget.id} style={styles.cardWrapper}>
        {widget.link ? (
          <Link href={widget.link as any} asChild>
            {cardContent}
          </Link>
        ) : (
          cardContent
        )}
      </View>
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
