import AnnouncementModal from '@/components/AnnouncementModal';
import { BannerCarousel, MeSection, NewsSection, QuickActions, TeamSection, UpcomingSchedule } from '@/components/home';
import { LeaveBalanceSection } from '@/components/leave';
import Drawer from '@/components/navigation/Drawer';
import Colors from '@/constants/Colors';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { AlignLeft, ClipboardCheck, Search } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutAnimation, Platform, RefreshControl, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const HEADER_HEIGHT_EXPANDED = 140; // Base height without Insets
const HEADER_HEIGHT_COLLAPSED = 70; // Base height without Insets

export default function HomeScreen() {
  const scrollRef = useRef<Animated.ScrollView>(null);
  // @ts-ignore
  useScrollToTop(scrollRef);
  const router = useRouter();
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
    return {
      height,
    };
  });

  const searchStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, scrollRange * 0.8], [1, 0], Extrapolate.CLAMP);
    const scale = interpolate(scrollY.value, [0, scrollRange], [1, 0.9], Extrapolate.CLAMP);
    const height = interpolate(scrollY.value, [0, scrollRange], [54, 0], Extrapolate.CLAMP);
    const marginTop = interpolate(scrollY.value, [0, scrollRange], [16, 0], Extrapolate.CLAMP);
    
    return {
       opacity,
       transform: [{ scale }],
       height,
       marginTop,
    };
  });

  // Scroll to top when screen gains focus
  useFocusEffect(
    useCallback(() => {
      // Scroll to top with animation
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      // Also reset the scroll shared value
      scrollY.value = withTiming(0, { duration: 300 });
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnnouncement(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.headerContainer, { height: headerMaxHeight }, headerStyle]}>
        <LinearGradient
            colors={['#1E40AF', '#3B82F6', '#60A5FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { paddingTop: insets.top + 10 }]}
        >
            {/* Top Row: Menu + Profile */}
            <View style={styles.headerTopRow}>
                <View style={styles.leftSection}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => setDrawerVisible(true)}>
                        <AlignLeft size={22} color="#FFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.name}>Nikhil Thomas</Text>
                    </View>
                </View>

                <View style={styles.rightSection}>
                    <Link href="/approvals" asChild>
                        <TouchableOpacity style={styles.iconButton}>
                            <ClipboardCheck size={20} color="#FFF" strokeWidth={2.5} />
                            <View style={styles.badge} />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/profile" asChild>
                        <TouchableOpacity style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>NT</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            {/* Search Bar - Collapsible */}
            <Animated.View style={[styles.searchWrapper, searchStyle]}>
                <Link href="/search" asChild>
                    <TouchableOpacity style={styles.searchBar} activeOpacity={0.9}>
                        <Search size={20} color="#94A3B8" />
                        <Text style={styles.searchText}>Search widgets, actions...</Text>
                    </TouchableOpacity>
                </Link>
            </Animated.View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView 
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
             styles.scrollContent, 
             { paddingTop: headerMaxHeight + 10 } // Start below header
        ]} 
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
        {/* Banner Carousel */}
        <BannerCarousel />
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* My Widgets */}
        <MeSection />
        
        {/* My Team */}
        <TeamSection />
        
        {/* Upcoming Schedule */}
        <UpcomingSchedule />

        {/* Leave Balance */}
        <LeaveBalanceSection />
        
        {/* News Section */}
        <NewsSection />
      </Animated.ScrollView>
      
      <AnnouncementModal 
        visible={showAnnouncement} 
        onClose={() => setShowAnnouncement(false)}
        title="Welcome to Employee Portal"
        description="Experience the new modern employee portal with enhanced features and smooth UI."
      />

       <Drawer visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Header Styles
  headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: '#1E40AF',
      overflow: 'hidden',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      elevation: 8,
      shadowColor: '#1E40AF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
  },
  gradient: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
  },
  headerTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  menuButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.25)',
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.35)',
  },
  greeting: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.85)',
      fontWeight: '500',
      marginBottom: 0,
  },
  name: {
      fontSize: 18,
      color: '#FFF',
      fontWeight: '700',
      lineHeight: 22,
  },
  rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  iconButton: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.25)',
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.35)',
      position: 'relative',
  },
  badge: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
      borderWidth: 1.5,
      borderColor: '#FFF',
  },
  avatarContainer: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.25)',
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: 'rgba(255,255,255,0.35)',
  },
  avatarText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#FFF',
  },

  // Search Bar Styles
  searchWrapper: {
      width: '100%',
      marginTop: 16,
      overflow: 'hidden',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
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
    paddingBottom: 100,
  },
});
