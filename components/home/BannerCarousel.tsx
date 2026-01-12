import Colors from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const banners = [
  { id: 1, image: require('../../assets/images/banner1.jpg') },
  { id: 2, image: require('../../assets/images/banner2.jpg') },
];

export default function BannerCarousel() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % banners.length;
        scrollViewRef.current?.scrollTo({
          x: next * width,
          animated: true,
        });
        return next;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          decelerationRate="fast"
          bounces={false}
        >
          {banners.map((banner) => (
            <View key={banner.id} style={styles.slide}>
              <View style={styles.bannerContainer}>
                <Image source={banner.image} style={styles.banner} resizeMode="cover" />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  carouselWrapper: {
    overflow: 'hidden',
  },
  slide: {
    width: width,
    paddingHorizontal: Colors.spacing,
  },
  bannerContainer: {
    width: width - (Colors.spacing * 2),
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    ...Colors.shadows.medium,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
});
