import AnnouncementModal from '@/components/AnnouncementModal';
import { BannerCarousel, MeSection, PendingApprovalsCard, QuickActionsGrid, TeamSection, UpcomingSchedule } from '@/components/home';
import { LeaveBalanceSection } from '@/components/leave';
import { QRCodeModal } from '@/components/navigation';
import Drawer from '@/components/navigation/Drawer';
import Colors from '@/constants/Colors';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { ClipboardCheck, Menu, QrCode, Search } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
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

const HEADER_HEIGHT_EXPANDED = 116;
const HEADER_HEIGHT_COLLAPSED = 52;

export default function HomeScreen() {
  const scrollRef = useRef<Animated.ScrollView>(null);
  // @ts-ignore
  useScrollToTop(scrollRef);
  const insets = useSafeAreaInsets();
  
  const headerMaxHeight = HEADER_HEIGHT_EXPANDED + insets.top;
  const headerMinHeight = HEADER_HEIGHT_COLLAPSED + insets.top;
  const scrollRange = headerMaxHeight - headerMinHeight;

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, scrollRange], [headerMaxHeight, headerMinHeight], Extrapolate.CLAMP);
    return { height };
  });

  const searchStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, scrollRange * 0.8], [1, 0], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, scrollRange], [1, 0.9], Extrapolate.CLAMP);
    const height = interpolate(scrollY.value, [0, scrollRange], [52, 0], Extrapolate.CLAMP);
    const marginTop = interpolate(scrollY.value, [0, scrollRange], [14, 0], Extrapolate.CLAMP);
    const marginBottom = interpolate(scrollY.value, [0, scrollRange], [8, 0], Extrapolate.CLAMP);
    
    return { opacity, transform: [{ scale }], height, marginTop, marginBottom };
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnnouncement(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Blue Gradient Header */}
      <Animated.View style={[styles.headerContainer, { height: headerMaxHeight }, headerStyle]}>
        <LinearGradient
            colors={['#1E40AF', '#3B82F6', '#60A5FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { paddingTop: insets.top + 6 }]}
        >
            {/* Top Row */}
            <View style={styles.headerTopRow}>
                <View style={styles.leftSection}>
                    <TouchableOpacity 
                      style={styles.menuButton} 
                      onPress={() => setDrawerVisible(true)}
                      activeOpacity={0.7}
                    >
                        <Menu size={22} color="#FFF" strokeWidth={2} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.name}>Pavan Goyal</Text>
                    </View>
                </View>

                <View style={styles.rightSection}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setQrModalVisible(true)}>
                        <QrCode size={20} color="#FFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Link href="/approvals" asChild>
                        <TouchableOpacity style={styles.iconButton}>
                            <ClipboardCheck size={20} color="#FFF" strokeWidth={2.5} />
                            <View style={styles.badge} />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            {/* Search Bar */}
            <Animated.View style={[styles.searchWrapper, searchStyle]}>
                <Link href="/search" asChild>
                    <TouchableOpacity style={styles.searchBar} activeOpacity={0.9}>
                        <Search size={20} color="#94A3B8" />
                        <Text style={styles.searchText}>Search anything...</Text>
                    </TouchableOpacity>
                </Link>
            </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView 
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingTop: headerMaxHeight + 16 }]} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.primary} 
            colors={[Colors.primary]}
            progressBackgroundColor="#FFF"
            progressViewOffset={headerMaxHeight}
          />
        }
      >
        {/* Pending Approvals Alert */}
        <PendingApprovalsCard count={3} />
        
        {/* Quick Actions - Primary shortcuts */}
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
      </Animated.ScrollView>
      
      <AnnouncementModal 
        visible={showAnnouncement} 
        onClose={() => setShowAnnouncement(false)}
        title="Welcome to Employee Portal"
        description="Experience the new modern employee portal with enhanced features and smooth UI."
      />

      <QRCodeModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} />
      <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: '#1E40AF',
      overflow: 'hidden',
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      elevation: 12,
      shadowColor: '#1E40AF',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
  },
  gradient: {
      flex: 1,
      paddingHorizontal: 18,
      paddingBottom: 12,
  },
  headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  greeting: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.85)',
      fontWeight: '500',
      letterSpacing: 0.2,
  },
  name: {
      fontSize: 17,
      color: '#FFF',
      fontWeight: '700',
      letterSpacing: -0.3,
      marginTop: 1,
  },
  leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  menuButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: 'rgba(255,255,255,0.15)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  iconButton: {
      width: 38,
      height: 38,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
      position: 'relative',
  },
  badge: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
      borderWidth: 2,
      borderColor: '#FFF',
  },
  avatarContainer: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 22,
  },
  avatarText: {
      fontSize: 15,
      fontWeight: '800',
      color: Colors.primary,
  },
  searchWrapper: {
      width: '100%',
      marginTop: 10,
      overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  searchText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 120,
  },
});
