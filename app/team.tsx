import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { ArrowLeft, CalendarOff, CheckCircle, FileText, Share2, UserCheck, Users } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const teamWidgets = [
  { id: 1, title: 'My Approvals', icon: CheckCircle, link: '/approvals' },
  { id: 2, title: 'Team Attendance', icon: Users, link: null },
  { id: 3, title: 'Team Leaves', icon: CalendarOff, link: null },
  { id: 4, title: 'Shared Assets', icon: Share2, link: null },
  { id: 5, title: 'Team Letters', icon: FileText, link: null },
  { id: 6, title: 'Directory', icon: UserCheck, link: null },
];

export default function TeamScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderCard = (widget: typeof teamWidgets[0]) => {
    const cardContent = (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <widget.icon size={26} color={Colors.primary} strokeWidth={1.8} />
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{widget.title}</Text>
      </View>
    );

    return (
      <View key={widget.id} style={styles.cardWrapper}>
        {widget.link ? (
          <Link href={widget.link as any} asChild>
            <TouchableOpacity activeOpacity={0.7}>
              {cardContent}
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity activeOpacity={0.7}>
            {cardContent}
          </TouchableOpacity>
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
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
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
        <View style={styles.cardContainer}>
          <View style={styles.grid}>
            {teamWidgets.map((widget) => renderCard(widget))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
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
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 16,
    minHeight: 32,
  },
});
