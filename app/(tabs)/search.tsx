import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock, FileText, Grid, Home, Search, Users, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - (HORIZONTAL_PADDING * 2) - (GAP * 2)) / 3;

const quickActions = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, route: '/apply-leave' },
  { id: 2, title: 'WFH Request', icon: Home, route: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, route: null },
  { id: 4, title: 'Approvals', icon: Calendar, route: '/approvals' },
  { id: 5, title: 'Directory', icon: Users, route: '/directory' },
  { id: 6, title: 'App Store', icon: Grid, route: '/(tabs)/appstore' },
];

const recentSearches = ['Payslip', 'Holidays', 'Directory', 'Leave'];

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
        style={[styles.gradientHeader, { paddingTop: insets.top + 8 }]}
      >
        <Text style={styles.headerTitle}>Search</Text>
        
        {/* Enhanced Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchIconWrapper}>
            <Search size={16} color="#6366F1" strokeWidth={2.5} />
          </View>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search apps, widgets..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={14} color="#94A3B8" strokeWidth={2.5} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView 
        ref={scrollRef}
        style={styles.content} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Recent Searches */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <View style={styles.recentContainer}>
              {recentSearches.map((term, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.recentPill} 
                  activeOpacity={0.7}
                  onPress={() => setSearchQuery(term)}
                >
                  <Clock size={11} color="#6366F1" strokeWidth={2} />
                  <Text style={styles.recentText}>{term}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Results' : 'Quick Actions'}
          </Text>
          <View style={styles.actionsGrid}>
            {filteredActions.map((action) => (
              <TouchableOpacity 
                key={action.id}
                style={styles.actionCard}
                onPress={() => handlePress(action.route)}
                activeOpacity={0.7}
              >
                <View style={styles.actionIcon}>
                  <action.icon size={22} color={Colors.primary} strokeWidth={1.8} />
                </View>
                <Text style={styles.actionTitle} numberOfLines={2}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredActions.length === 0 && (
            <View style={styles.emptyState}>
              <Search size={36} color="#CBD5E1" />
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  gradientHeader: { 
    paddingHorizontal: HORIZONTAL_PADDING, 
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#FFF', 
    marginBottom: 10,
    letterSpacing: -0.3,
  },

  // Enhanced Search Bar
  searchBarContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingHorizontal: 4, 
    paddingVertical: Platform.OS === 'ios' ? 4 : 2, 
    borderRadius: 10, 
    gap: 0,
    shadowColor: '#1E40AF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: { 
    flex: 1, 
    fontSize: 14, 
    color: '#1E293B', 
    fontWeight: '500',
    letterSpacing: -0.2,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 6,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },

  content: { flex: 1, padding: HORIZONTAL_PADDING },
  
  section: { marginBottom: 20 },
  sectionTitle: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: '#64748B', 
    marginBottom: 10, 
    textTransform: 'uppercase', 
    letterSpacing: 0.8 
  },
  
  recentContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  recentPill: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    backgroundColor: '#EEF2FF', 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: '#C7D2FE',
  },
  recentText: { 
    fontSize: 12, 
    color: '#4338CA', 
    fontWeight: '600',
    letterSpacing: -0.2,
  },

  actionsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: GAP,
  },
  actionCard: { 
    width: CARD_WIDTH, 
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFF', 
    borderRadius: 14, 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#E2E8F0',
  },
  actionIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    backgroundColor: '#EFF6FF',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: '#1E293B', 
    textAlign: 'center',
    lineHeight: 17,
    letterSpacing: -0.2,
    minHeight: 34,
  },

  emptyState: { paddingVertical: 50, alignItems: 'center' },
  emptyText: { 
    fontSize: 14, 
    fontWeight: '500', 
    color: '#94A3B8', 
    marginTop: 12,
    letterSpacing: -0.2,
  },
});
