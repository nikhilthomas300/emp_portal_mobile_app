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
        <View style={{ height: Colors.spacing }} />
        
        {/* Search Bar */}
        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => setSearchVisible(true)}
        >
          <Search size={20} color={Colors.secondaryText} />
          <Text style={styles.searchPlaceholder}>Search Widgets...</Text>
        </TouchableOpacity>
        
        <BannerCarousel />
        <UpcomingSchedule />
        <QuickActions />
        <MeSection />
        <TeamSection />
        <LeaveBalanceSection />
        <EventsList />
      </ScrollView>
      
      <SearchModal visible={searchVisible} onClose={() => setSearchVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: Colors.spacing,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: Colors.spacing,
    marginTop: 0,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 12,
    ...Colors.shadows.small,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.secondaryText,
  },
});
