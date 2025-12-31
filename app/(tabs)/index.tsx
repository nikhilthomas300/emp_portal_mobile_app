import BannerCarousel from '@/components/BannerCarousel';
import Header from '@/components/Header';
import LeaveBalanceSection from '@/components/LeaveBalanceSection';
import Loader from '@/components/Loader';
import MeSection from '@/components/MeSection';
import QuickActions from '@/components/QuickActions';
import SearchModal from '@/components/SearchModal';
import TeamSection from '@/components/TeamSection';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import Colors from '@/constants/Colors';
import { useFocusEffect, useNavigation, useScrollToTop } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
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

  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (loading) {
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
          paddingBottom: 20, // Reduced padding
          paddingTop: 8,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        }
      });
    }
  }, [loading, navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

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
          {/* Enhanced Search Bar */}
          <View style={styles.searchContainer}>
            <LinearGradient
              colors={['#4338CA', '#7C3AED', '#DB2777']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.searchGradientBorder}
            >
              <TouchableOpacity 
                style={styles.searchBar}
                activeOpacity={0.8}
                onPress={() => setSearchVisible(true)}
              >
                <View style={styles.searchIconContainer}>
                  <Search size={18} color={Colors.primary} strokeWidth={2.5} />
                </View>
                <Text style={styles.searchPlaceholder}>Search widgets, actions...</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
    gap: 0,
  },
  searchContainer: {
    paddingHorizontal: Colors.spacing,
    marginBottom: 20,
  },
  searchGradientBorder: {
    borderRadius: 14,
    padding: 1.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
});

