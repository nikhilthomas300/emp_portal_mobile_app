import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock, FileText, Grid, Home, Search, Sparkles, TrendingUp, Users, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const quickActions = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, route: '/apply-leave' },
  { id: 2, title: 'WFH Request', icon: Home, route: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, route: null },
  { id: 4, title: 'Approvals', icon: Calendar, route: '/approvals' },
  { id: 5, title: 'Directory', icon: Users, route: '/directory' },
  { id: 6, title: 'App Store', icon: Grid, route: '/(tabs)/appstore' },
];

const recentSearches = ['Oracle HCM', 'Payroll', 'CareerOrbit', 'Leave'];
const trendingSearches = ['Wellness', 'Training', 'Benefits'];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  const handlePress = (route: string | null) => {
    if (route) {
      // @ts-ignore
      router.push(route);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const filteredActions = quickActions.filter(w => 
    w.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Blue Gradient Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#60A5FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientHeader, { paddingTop: insets.top + 12 }]}
      >
        <Text style={styles.headerTitle}>Search</Text>
        <Text style={styles.headerSubtitle}>Find apps, widgets and more</Text>
        
        {/* Enhanced Search Bar */}
        <View style={styles.searchBarContainer}>
          <Search size={20} color="#64748B" strokeWidth={2} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search anything..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={16} color="#64748B" strokeWidth={2.5} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView 
        ref={scrollRef}
        style={styles.content} 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Recent & Trending Searches */}
        {searchQuery.length === 0 && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={14} color="#64748B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Recent</Text>
              </View>
              <View style={styles.pillsContainer}>
                {recentSearches.map((term, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.pill} 
                    activeOpacity={0.7}
                    onPress={() => setSearchQuery(term)}
                  >
                    <Text style={styles.pillText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={14} color="#64748B" strokeWidth={2} />
                <Text style={styles.sectionTitle}>Trending</Text>
              </View>
              <View style={styles.pillsContainer}>
                {trendingSearches.map((term, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.pill, styles.trendingPill]} 
                    activeOpacity={0.7}
                    onPress={() => setSearchQuery(term)}
                  >
                    <Sparkles size={10} color="#F59E0B" strokeWidth={2} />
                    <Text style={[styles.pillText, styles.trendingText]}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Grid size={14} color="#64748B" strokeWidth={2} />
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Results' : 'Quick Actions'}
            </Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <View style={styles.actionsGrid}>
              {filteredActions.map((action) => (
                <TouchableOpacity 
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => handlePress(action.route)}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionIcon}>
                    <action.icon size={22} color={Colors.primary} strokeWidth={1.6} />
                  </View>
                  <Text style={styles.actionTitle} numberOfLines={2}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {filteredActions.length === 0 && (
            <View style={styles.emptyState}>
              <Search size={40} color="#CBD5E1" strokeWidth={1.5} />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyText}>Try a different search term</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  
  gradientHeader: { 
    paddingHorizontal: 20, 
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  headerTitle: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#FFF', 
    letterSpacing: -0.5,
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.8)', 
    marginTop: 2,
    marginBottom: 16,
  },

  searchBarContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingHorizontal: 16, 
    paddingVertical: Platform.OS === 'ios' ? 14 : 10, 
    borderRadius: 16, 
    gap: 12,
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: '#1E293B', 
    fontWeight: '500',
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: { flex: 1, paddingTop: 20 },
  
  section: { marginBottom: 24, paddingHorizontal: 20 },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginBottom: 12 
  },
  sectionTitle: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#64748B', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    backgroundColor: '#F1F5F9', 
    borderRadius: 20, 
  },
  trendingPill: {
    backgroundColor: '#FEF3C7',
  },
  pillText: { 
    fontSize: 13, 
    color: '#374151', 
    fontWeight: '600',
  },
  trendingText: {
    color: '#92400E',
  },

  actionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  actionsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
  },
  actionCard: { 
    width: '33.33%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIcon: { 
    width: 52, 
    height: 52, 
    borderRadius: 16, 
    backgroundColor: '#DBEAFE',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: { 
    fontSize: 11, 
    fontWeight: '600', 
    color: '#334155', 
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 4,
  },

  emptyState: { paddingVertical: 50, alignItems: 'center' },
  emptyTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginTop: 16,
  },
  emptyText: { 
    fontSize: 13, 
    color: '#94A3B8', 
    marginTop: 4,
  },
});
