import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock, FileText, Grid, Home, Search, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const quickActions = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, color: '#6366F1', route: '/apply-leave' },
  { id: 2, title: 'WFH Request', icon: Home, color: '#10B981', route: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, color: '#F59E0B', route: null },
  { id: 4, title: 'Approvals', icon: Calendar, color: '#EC4899', route: '/approvals' },
  { id: 5, title: 'Directory', icon: Users, color: '#0EA5E9', route: '/directory' },
  { id: 6, title: 'App Store', icon: Grid, color: '#8B5CF6', route: '/(tabs)/appstore' },
];

const recentSearches = ['Payslip November', 'Holiday Calendar', 'Team Directory', 'Leave Balance'];

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress = (route: string | null) => {
    if (route) {
      // @ts-ignore
      router.push(route);
    }
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
        <Text style={styles.headerSubtitle}>Find apps, widgets & more</Text>
        
        {/* Search Bar inside gradient */}
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Apps and Widgets..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={false}
          />
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Recent Searches */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.recentContainer}>
              {recentSearches.map((term, index) => (
                <TouchableOpacity key={index} style={styles.recentPill} activeOpacity={0.7}>
                  <Clock size={14} color="#64748B" />
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
                <LinearGradient
                  colors={[action.color + '20', action.color + '10']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionIcon}
                >
                  <action.icon size={22} color={action.color} strokeWidth={2} />
                </LinearGradient>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredActions.length === 0 && (
            <View style={styles.emptyState}>
              <Search size={40} color="#CBD5E1" />
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
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
    paddingHorizontal: 16, 
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },

  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingHorizontal: 16, 
    paddingVertical: Platform.OS === 'ios' ? 14 : 12, 
    borderRadius: 14, 
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#1E293B', fontWeight: '500' },

  content: { flex: 1, padding: 16 },
  
  section: { marginBottom: 24 },
  sectionTitle: { 
    fontSize: 13, 
    fontWeight: '700', 
    color: '#64748B', 
    marginBottom: 12, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  
  recentContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  recentPill: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  recentText: { fontSize: 13, color: '#374151', fontWeight: '500' },

  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { 
    width: '48%', 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16,
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: { 
    width: 52, 
    height: 52, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: { fontSize: 14, fontWeight: '600', color: '#1E293B', textAlign: 'center' },

  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#94A3B8', marginTop: 16 },
  emptySubtext: { fontSize: 13, color: '#CBD5E1', marginTop: 4 },
});
