import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock, FileText, Grid, Home, Search, Sparkles, TrendingUp, Users, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const quickActions = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, route: '/apply-leave' },
  { id: 2, title: 'WFH Request', icon: Home, route: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, route: '' }, // Empty route for now
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
      // scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const handleActionPress = (route: string, title: string) => {
    if (!route) {
      Alert.alert('Coming Soon', `${title} module is coming soon.`);
      return;
    }
    router.push(route as any);
  };

  const clearSearch = () => {
    setSearchQuery('');
    // Keep focus or dismiss keyboard? Usually keep focus for new search
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
        style={[styles.gradientHeader, { paddingTop: insets.top + 16 }]}
      >
        <Text style={styles.headerTitle}>Search</Text>
        <Text style={styles.headerSubtitle}>Find apps, widgets and services</Text>
        
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Search size={20} color="#64748B" strokeWidth={2} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search anything..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X size={16} color="#64748B" strokeWidth={2.5} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView 
        ref={scrollRef}
        style={styles.content} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* Recent & Trending Searches (Only when text is empty) */}
        {searchQuery.length === 0 && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={14} color="#64748B" strokeWidth={2.5} />
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
                <TrendingUp size={14} color="#F59E0B" strokeWidth={2.5} />
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
                    <Sparkles size={12} color="#D97706" strokeWidth={2} />
                    <Text style={[styles.pillText, styles.trendingText]}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Grid size={14} color="#64748B" strokeWidth={2.5} />
            <Text style={styles.sectionTitle}>
              {searchQuery ? 'Search Results' : 'Quick Actions'}
            </Text>
          </View>
          
          <View style={styles.gridContainer}>
            {filteredActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.gridItem}
                onPress={() => handleActionPress(action.route, action.title)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
                  <action.icon size={24} color={Colors.primary} strokeWidth={1.8} />
                </View>
                <Text style={styles.gridLabel} numberOfLines={2}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredActions.length === 0 && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconBg}>
                <Search size={32} color="#CBD5E1" strokeWidth={2} />
              </View>
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyText}>We couldn't find anything matching "{searchQuery}"</Text>
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
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#FFF', 
    letterSpacing: -0.5,
  },
  headerSubtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.9)', 
    marginTop: 4,
    marginBottom: 20,
    fontWeight: '500',
  },

  searchBarContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingHorizontal: 16, 
    height: 52,
    borderRadius: 16, 
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: '#1E293B', 
    fontWeight: '600',
    height: '100%',
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: { flex: 1 },
  scrollContent: { paddingTop: 24 },
  
  section: { marginBottom: 32, paddingHorizontal: 20 },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 16 
  },
  sectionTitle: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#94A3B8', 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trendingPill: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
  },
  pillText: { 
    fontSize: 13, 
    color: '#475569', 
    fontWeight: '600',
  },
  trendingText: {
    color: '#B45309',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  gridItem: {
    width: '33.33%',
    padding: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 2,
  },

  emptyState: { paddingVertical: 40, alignItems: 'center' },
  emptyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginBottom: 8,
  },
  emptyText: { 
    fontSize: 14, 
    color: '#64748B', 
    textAlign: 'center',
    maxWidth: '80%',
  },
});
