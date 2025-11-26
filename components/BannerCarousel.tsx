import Colors from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - (Colors.spacing * 2);

const banners = [
  { 
    id: 1, 
    image: require('../assets/images/banner1.png'),
  },
  { 
    id: 2, 
    image: require('../assets/images/banner2.png'),
  },
  { 
    id: 3, 
    image: require('../assets/images/banner3.png'),
  },
];

export default function BannerCarousel() {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      
      scrollRef.current?.scrollTo({
        x: nextIndex * (BANNER_WIDTH + 16), // 16 is marginRight
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 10000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (BANNER_WIDTH + 16));
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner) => (
          <View key={banner.id} style={styles.bannerContainer}>
            <Image
              source={banner.image}
              style={styles.banner}
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>
      
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              currentIndex === index && styles.activeDot
            ]} 
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: Colors.spacing,
  },
  bannerContainer: {
    marginRight: 16,
    borderRadius: Colors.radius,
    overflow: 'hidden',
    ...Colors.shadows.medium,
  },
  banner: {
    width: BANNER_WIDTH,
    height: 140,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
});
