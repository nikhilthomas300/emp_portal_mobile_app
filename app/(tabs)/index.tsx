import AnnouncementModal from '@/components/AnnouncementModal';
import { ActionBanner, BannerCarousel, MeSection, QuickActionsGrid, TeamSection, UpcomingSchedule } from '@/components/home';
import { LeaveBalanceSection } from '@/components/leave';
import { QRCodeModal } from '@/components/navigation';
import Drawer from '@/components/navigation/Drawer';
import { HomeShimmer } from '@/components/ShimmerLoader';
import Colors from '@/constants/Colors';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Bell, Briefcase, Calendar, FileText, Home, Menu, Search } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Platform, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Quick actions for header - ID Card logic mapped here
const QUICK_ACTIONS = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, link: '/apply-leave' },
  { id: 2, title: 'Apply WFH', icon: Home, link: '/apply-wfh' },
  { id: 3, title: 'Digital Identity', icon: FileText, action: 'qr' }, // Mapped to QR action
  { id: 4, title: 'Holidays', icon: Calendar, link: '/holidays' },
];

const HEADER_EXPANDED = 220;
const HEADER_COLLAPSED = 120;

export default function HomeScreen() {
  const scrollRef = useRef<Animated.ScrollView>(null);
  // @ts-ignore
  useScrollToTop(scrollRef);
  const insets = useSafeAreaInsets();
  
  const headerMax = HEADER_EXPANDED + insets.top;
  const headerMin = HEADER_COLLAPSED + insets.top;
  const scrollRange = headerMax - headerMin;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, scrollRange], [headerMax, headerMin], Extrapolate.CLAMP);
    return { height };
  });

  const quickActionsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, scrollRange * 0.5], [1, 0], Extrapolate.CLAMP);
    const height = interpolate(scrollY.value, [0, scrollRange], [80, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, scrollRange], [0, -16], Extrapolate.CLAMP);
    return { opacity, height, transform: [{ translateY }], overflow: 'hidden' as const };
  });

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      scrollY.value = withTiming(0, { duration: 300 });
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  // Shimmer for 3 seconds, then show content and popup
  useEffect(() => {
    const shimmerTimer = setTimeout(() => {
      setIsLoading(false);
      // Show announcement popup 500ms after shimmer ends
      setTimeout(() => setShowAnnouncement(true), 500);
    }, 3000);
    return () => clearTimeout(shimmerTimer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleQuickAction = (action: any) => {
    if (action.action === 'qr') {
      setQrModalVisible(true);
    }
  };

  // Show shimmer loader while loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <HomeShimmer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Premium Header */}
      <Animated.View style={[styles.headerContainer, { height: headerMax }, headerStyle]}>
        <LinearGradient
          colors={['#0B1E42', '#153E75', '#2563EB']} // Rich Deep Enterprise Blue
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, { paddingTop: insets.top + 4 }]}
        >
          {/* Top Bar */}
          <View style={styles.headerTopRow}>
            <View style={styles.leftSection}>
              <TouchableOpacity 
                style={styles.menuButton} 
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setDrawerVisible(true);
                }}
                activeOpacity={0.8}
              >
                <Menu size={22} color="#FFF" strokeWidth={2} />
              </TouchableOpacity>
              <View style={styles.userInfo}>
                <Text style={styles.greeting}>{getGreeting()} 👋</Text>
                {/* Handled long names with ellipsis */}
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                  Pavan Goyal
                </Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              <Link href="/approvals" asChild>
                <TouchableOpacity style={styles.notifButton} activeOpacity={0.8}>
                  <Bell size={20} color="#FFF" strokeWidth={2} />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>3</Text>
                  </View>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Search Bar - Sleek & Modern */}
          <Link href="/search" asChild>
            <TouchableOpacity style={styles.searchBar} activeOpacity={0.95}>
              <Search size={20} color="#64748B" strokeWidth={2} />
              <Text style={styles.searchText}>Search apps, widgets, people...</Text>
            </TouchableOpacity>
          </Link>

          {/* Quick Actions Row */}
          <Animated.View style={[styles.quickActionsRow, quickActionsStyle]}>
            {QUICK_ACTIONS.map((action) => {
              const IconComponent = action.icon;
              
              if (action.link) {
                return (
                  <Link key={action.id} href={action.link as any} asChild>
                    <TouchableOpacity style={styles.quickActionBtn} activeOpacity={0.8}>
                      <View style={styles.quickActionIcon}>
                        <IconComponent size={18} color="#FFFFFF" strokeWidth={2} />
                      </View>
                      <Text style={styles.quickActionText}>{action.title}</Text>
                    </TouchableOpacity>
                  </Link>
                );
              }

              return (
                <TouchableOpacity 
                  key={action.id} 
                  style={styles.quickActionBtn} 
                  activeOpacity={0.8}
                  onPress={() => handleQuickAction(action)}
                >
                  <View style={styles.quickActionIcon}>
                    <IconComponent size={18} color="#FFFFFF" strokeWidth={2} />
                  </View>
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView 
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingTop: headerMax + 14 }]} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.primary} 
            colors={[Colors.primary]}
            progressBackgroundColor="#FFF"
            progressViewOffset={headerMax}
          />
        }
      >
        {/* Action Banner (Approvals) */}
        <ActionBanner 
          type="approval"
          title="Pending Approvals"
          subtitle="3 requests awaiting your review"
          count={3}
          href="/approvals"
        />
        
        {/* Quick Links */}
        <QuickActionsGrid />
        
        {/* Banner Carousel */}
        <BannerCarousel />
        
        {/* My Widgets */}
        <MeSection />
        
        {/* My Team */}
        <TeamSection />

        {/* Leave Balance */}
        <LeaveBalanceSection />
        
        {/* Upcoming Meeting */}
        <UpcomingSchedule />
        
        <View style={{ height: 30 }} />
      </Animated.ScrollView>
      
      <AnnouncementModal 
        visible={showAnnouncement} 
        onClose={() => setShowAnnouncement(false)}
        badge="NEW UPDATE"
        badgeColor="#2563EB"
        title="Welcome to the New Employee Portal"
        description="Experience a modern, intuitive design with quick access to all your essential work tools and information."
        buttonText="Let's Explore"
        buttonColor="#2563EB"
      />

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
      <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    overflow: 'hidden',
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
    backgroundColor: '#0D3C75',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 22,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
    marginRight: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginBottom: 1,
    letterSpacing: 0.3,
  },
  name: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0D3C75',
  },
  badgeText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  searchText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: '#94A3B8',
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
    marginBottom: 4,
  },
  quickActionBtn: {
    alignItems: 'center',
    gap: 8,
    width: '25%',
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 110,
  },
});
