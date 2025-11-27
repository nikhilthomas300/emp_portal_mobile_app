import BannerCarousel from '@/components/BannerCarousel';
import EventsList from '@/components/EventsList';
import Header from '@/components/Header';
import LeaveBalanceSection from '@/components/LeaveBalanceSection';
import MeSection from '@/components/MeSection';
import QuickActions from '@/components/QuickActions';
import SearchModal from '@/components/SearchModal';
import TeamSection from '@/components/TeamSection';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import Colors from '@/constants/Colors';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { LayoutAnimation, Platform, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.primary} 
            colors={[Colors.primary]} // Android
            progressBackgroundColor="#FFF"
          />
        }
      >
        {refreshing && Platform.OS === 'web' && (
          <View style={{ padding: 10, alignItems: 'center' }}>
            <Text style={{ color: Colors.primary, fontWeight: '600' }}>Refreshing...</Text>
          </View>
        )}
        
        <Animated.View entering={FadeInDown.delay(100).duration(500).springify()}>
          {/* Search Bar */}
          <TouchableOpacity 
            style={styles.searchBar}
            activeOpacity={0.8}
            onPress={() => setSearchVisible(true)}
          >
            <Search size={20} color={Colors.secondaryText} />
            <Text style={styles.searchPlaceholder}>Search Widgets...</Text>
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
          <BannerCarousel />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
          <QuickActions />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
          <UpcomingSchedule />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
          <MeSection />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500).springify()}>
          <TeamSection />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(500).springify()}>
          <LeaveBalanceSection />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(500).springify()}>
          <EventsList />
        </Animated.View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
      
      <SearchModal visible={searchVisible} onClose={() => setSearchVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 0, // Removed gap to let components handle their own spacing
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: Colors.spacing,
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
    ...Colors.shadows.small,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.secondaryText,
  },
});
