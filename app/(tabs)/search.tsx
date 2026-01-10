import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock, CreditCard, Home, Layers, Search, Sparkles, TrendingUp } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Quick Links - 4 items with proper routes
const quickLinks = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, route: '/apply-leave' },
  { id: 2, title: 'Apply WFH', icon: Home, route: '/apply-wfh' },
  { id: 3, title: 'Digital Identity', icon: CreditCard, route: '/digital-identity' },
  { id: 4, title: 'Holidays', icon: Calendar, route: '/holidays' },
];

const recentSearches = ['Oracle HCM', 'Payroll', 'CareerOrbit'];
const trendingSearches = ['Wellness', 'Training', 'Benefits'];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {}, [])
  );

  const handleLinkPress = (route: string) => {
    router.push(route as any);
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const filteredLinks = quickLinks.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientHeader, { paddingTop: insets.top + 12 }]}
      >
        <Text style={styles.headerTitle}>Search</Text>
        <Text style={styles.headerSubtitle}>Find apps, widgets & services</Text>
        
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Search size={18} color="#64748B" strokeWidth={2} />
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
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={styles.clearText}>✕</Text>
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
        {/* Recent & Trending */}
        {searchQuery.length === 0 && (
          <View style={styles.suggestionsCard}>
            {/* Recent */}
            <View style={styles.suggestionSection}>
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

            <View style={styles.divider} />

            {/* Trending */}
            <View style={styles.suggestionSection}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={14} color="#F59E0B" strokeWidth={2} />
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
          </View>
        )}

        {/* Quick Links */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Layers size={14} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.sectionTitleText}>
              {searchQuery ? 'Search Results' : 'Quick Links'}
            </Text>
          </View>
          
          <View style={styles.linksCard}>
            <View style={styles.gridContainer}>
              {filteredLinks.map((link) => (
                <TouchableOpacity 
                  key={link.id}
                  style={styles.gridItem}
                  onPress={() => handleLinkPress(link.route)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconBox}>
                    <link.icon size={24} color={Colors.primary} strokeWidth={1.8} />
                  </View>
                  <Text style={styles.gridLabel} numberOfLines={2}>{link.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {filteredLinks.length === 0 && searchQuery && (
              <View style={styles.emptyState}>
                <Search size={28} color="#CBD5E1" strokeWidth={2} />
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptyText}>Try a different search term</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  gradientHeader: { 
    paddingHorizontal: 20, 
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#FFF', 
  },
  headerSubtitle: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.85)', 
    marginTop: 4,
    marginBottom: 16,
  },

  searchBarContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingHorizontal: 14, 
    height: 48,
    borderRadius: 14, 
    gap: 10,
  },
  searchInput: { 
    flex: 1, 
    fontSize: 15, 
    color: '#1E293B', 
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 12,
    color: '#64748B',
  },

  content: { flex: 1 },
  scrollContent: { paddingTop: 20, paddingHorizontal: 16 },
  
  suggestionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  suggestionSection: {},
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginBottom: 10,
  },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#64748B', 
    textTransform: 'uppercase', 
  },
  
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 8, 
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trendingPill: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  pillText: { 
    fontSize: 13, 
    color: '#475569', 
    fontWeight: '500',
  },
  trendingText: {
    color: '#B45309',
  },

  section: { marginBottom: 20 },
  sectionTitleRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginBottom: 12,
  },
  sectionTitleText: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#64748B', 
    textTransform: 'uppercase', 
  },

  linksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 14,
  },

  emptyState: { paddingVertical: 30, alignItems: 'center' },
  emptyTitle: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#64748B', 
    marginTop: 10,
  },
  emptyText: { 
    fontSize: 13, 
    color: '#94A3B8', 
    marginTop: 4,
  },
});
