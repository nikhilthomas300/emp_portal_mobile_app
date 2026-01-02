import Colors from '@/constants/Colors';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const ShimmerPlaceholder = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={[styles.shimmerBox, style, { opacity }]} />
  );
};

export default function Loader() {
  return (
    <View style={styles.container}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <ShimmerPlaceholder style={styles.avatar} />
        <View style={styles.headerText}>
          <ShimmerPlaceholder style={styles.headerLine1} />
          <ShimmerPlaceholder style={styles.headerLine2} />
        </View>
        <ShimmerPlaceholder style={styles.headerIcon} />
        <ShimmerPlaceholder style={styles.headerAvatar} />
      </View>

      {/* Search Bar Skeleton */}
      <ShimmerPlaceholder style={styles.searchBar} />

      {/* Banner Skeleton */}
      <ShimmerPlaceholder style={styles.banner} />

      {/* Quick Actions Skeleton */}
      <View style={styles.quickActions}>
        <ShimmerPlaceholder style={styles.chip} />
        <ShimmerPlaceholder style={styles.chip} />
        <ShimmerPlaceholder style={styles.chip} />
        <ShimmerPlaceholder style={styles.chipSmall} />
      </View>

      {/* Card Skeleton */}
      <ShimmerPlaceholder style={styles.meetingCard} />

      {/* Widgets Skeleton */}
      <View style={styles.sectionHeader}>
        <ShimmerPlaceholder style={styles.sectionTitle} />
        <ShimmerPlaceholder style={styles.seeAllBtn} />
      </View>
      <View style={styles.widgets}>
        <ShimmerPlaceholder style={styles.widget} />
        <ShimmerPlaceholder style={styles.widget} />
        <ShimmerPlaceholder style={styles.widget} />
      </View>

      {/* List Skeleton */}
      <View style={styles.sectionHeader}>
        <ShimmerPlaceholder style={styles.sectionTitle} />
        <ShimmerPlaceholder style={styles.seeAllBtn} />
      </View>
      <ShimmerPlaceholder style={styles.listCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  shimmerBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
    gap: 6,
  },
  headerLine1: {
    width: 90,
    height: 12,
    borderRadius: 6,
  },
  headerLine2: {
    width: 110,
    height: 14,
    borderRadius: 7,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    marginRight: 10,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  searchBar: {
    height: 52,
    borderRadius: 16,
    marginBottom: 20,
  },
  banner: {
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    width: 100,
    height: 44,
    borderRadius: 22,
  },
  chipSmall: {
    width: 70,
    height: 44,
    borderRadius: 22,
  },
  meetingCard: {
    height: 110,
    borderRadius: 18,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    width: 100,
    height: 18,
    borderRadius: 9,
  },
  seeAllBtn: {
    width: 60,
    height: 28,
    borderRadius: 14,
  },
  widgets: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  widget: {
    width: 110,
    height: 90,
    borderRadius: 16,
  },
  listCard: {
    height: 140,
    borderRadius: 18,
  },
});
