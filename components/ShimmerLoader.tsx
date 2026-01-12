import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface ShimmerProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

// Single shimmer bar component with soft animation
function ShimmerBar({ width: barWidth = '100%', height = 12, borderRadius = 6, style }: ShimmerProps) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.8, width * 0.8],
  });

  return (
    <View 
      style={[
        styles.shimmerBar, 
        { 
          width: barWidth, 
          height, 
          borderRadius,
        },
        style
      ]}
    >
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.15)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
}

// Home screen shimmer layout - cleaner and more elegant
export function HomeShimmer() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      {/* Header shimmer */}
      <LinearGradient
        colors={['#0D3C75', '#165BAA', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerShimmer, { paddingTop: insets.top + 8 }]}
      >
        <View style={styles.headerTop}>
          <ShimmerBar width={40} height={40} borderRadius={12} />
          <View style={styles.headerText}>
            <ShimmerBar width={80} height={10} borderRadius={5} />
            <ShimmerBar width={120} height={14} borderRadius={7} style={{ marginTop: 4 }} />
          </View>
          <ShimmerBar width={40} height={40} borderRadius={12} />
        </View>
        <ShimmerBar height={44} borderRadius={12} style={{ marginTop: 14 }} />
        <View style={styles.quickActionsShimmer}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.quickActionItem}>
              <ShimmerBar width={36} height={36} borderRadius={10} />
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Content shimmer */}
      <View style={styles.contentShimmer}>
        {/* Action Banner */}
        <ShimmerBar width={100} height={14} borderRadius={7} style={{ marginBottom: 10, marginLeft: 2 }} />
        <View style={styles.bannerCard}>
          <View style={styles.bannerContent}>
            <ShimmerBar width={36} height={36} borderRadius={10} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <ShimmerBar width="60%" height={12} borderRadius={6} />
              <ShimmerBar width="40%" height={10} borderRadius={5} style={{ marginTop: 6 }} />
            </View>
            <ShimmerBar width={60} height={28} borderRadius={8} />
          </View>
        </View>

        {/* Quick Links */}
        <ShimmerBar width={90} height={14} borderRadius={7} style={{ marginTop: 16, marginBottom: 12, marginLeft: 2 }} />
        <View style={styles.quickLinksCard}>
          <View style={styles.quickLinksGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <View key={i} style={styles.quickLinkItem}>
                <ShimmerBar width={48} height={48} borderRadius={14} />
                <ShimmerBar width={40} height={8} borderRadius={4} style={{ marginTop: 6 }} />
              </View>
            ))}
          </View>
        </View>

        {/* Banner Carousel */}
        <View style={styles.carouselCard}>
          <ShimmerBar width="100%" height={90} borderRadius={14} />
        </View>

        {/* Widgets */}
        <ShimmerBar width={80} height={14} borderRadius={7} style={{ marginTop: 12, marginBottom: 10, marginLeft: 2 }} />
        <View style={styles.widgetsRow}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.widgetCard}>
              <ShimmerBar width={40} height={40} borderRadius={12} />
              <ShimmerBar width={50} height={8} borderRadius={4} style={{ marginTop: 8 }} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  shimmerBar: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    width: width * 1.5,
  },
  
  // Header styles
  headerShimmer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  quickActionsShimmer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  quickActionItem: {
    alignItems: 'center',
  },

  // Content styles
  contentShimmer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickLinksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickLinkItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  carouselCard: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  widgetsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  widgetCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
});

export default HomeShimmer;
