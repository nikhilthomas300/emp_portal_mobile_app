import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, Bell, Briefcase, Calendar, Clock, DollarSign, FileText, Grid, Home, MessageSquare, Search, Settings, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Widget = {
  id: number;
  title: string;
  icon: any;
  color: string;
};

const widgetsByCategory: Record<string, Widget[]> = {
  'HR & Leave': [
    { id: 1, title: 'Self Service Portal', icon: Briefcase, color: '#EC4899' },
    { id: 2, title: 'Human Capital Management (HCM)', icon: Home, color: '#4E5FBF' },
    { id: 3, title: 'Timesheet Management System', icon: Clock, color: '#8B5CF6' },
    {id: 4, title: 'Accolade', icon: Clock, color: '#8B5CF6' },
  ],
  'Learning': [
    { id: 5, title: 'Flex', icon: Calendar, color: '#10B981' },
    { id: 6, title: 'Knowledge Hub', icon: Users, color: '#A78BFA' },
    { id: 7, title: 'TalentNxt', icon: MessageSquare, color: '#3B82F6' },
    { id: 8, title: 'CLAP', icon: Bell, color: '#F59E0B' },
  ],
  'Collaboration': [
    { id: 9, title: 'Engage', icon: FileText, color: '#F59E0B' },
    { id: 10, title: 'HR-Survey', icon: DollarSign, color: '#10B981' },
  ],
  'Payroll': [
    { id: 11, title: 'E-Payroll-India', icon: BarChart, color: '#F59E0B' },
    { id: 12, title: 'Payroll', icon: Settings, color: '#6B7280' },
  ],
};

export default function AppStoreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Object.keys(widgetsByCategory)];

  const getFilteredWidgets = () => {
    if (searchQuery) {
      const allWidgets = Object.values(widgetsByCategory).flat();
      return allWidgets.filter(widget =>
        widget.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return null;
  };

  const filteredWidgets = getFilteredWidgets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Grid size={24} color="#FFF" strokeWidth={2.5} />
            </View>
            <View>
              <Text style={styles.titleLabel}>Discover</Text>
              <Text style={styles.title}>App Store</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar - Outside gradient */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Search size={20} color={Colors.secondaryText} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search apps..."
              placeholderTextColor={Colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories - Horizontal Scroll */}
        {!searchQuery && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Widgets by Category or Search Results */}
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {searchQuery ? (
            // Search Results
            <>
              <Text style={styles.sectionTitle}>Found {filteredWidgets?.length || 0} apps</Text>
              <View style={styles.widgetsGrid}>
                {filteredWidgets?.map((widget) => (
                  <TouchableOpacity key={widget.id} style={styles.widgetCard}>
                    <View style={[styles.widgetIcon, { backgroundColor: `${widget.color}20` }]}>
                      <widget.icon size={22} color={widget.color} />
                    </View>
                    <Text style={styles.widgetTitle}>{widget.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            // Category View
            <>
              {(selectedCategory === 'All' 
                ? Object.entries(widgetsByCategory) 
                : [[selectedCategory, widgetsByCategory[selectedCategory]]] as [string, Widget[]][]
              ).map(([category, widgets]) => (
                <View key={category} style={styles.categorySection}>
                  <Text style={styles.categoryHeading}>{category}</Text>
                  <View style={styles.widgetsGrid}>
                    {widgets.map((widget) => (
                      <TouchableOpacity key={widget.id} style={styles.widgetCard}>
                        <View style={[styles.widgetIcon, { backgroundColor: `${widget.color}20` }]}>
                          <widget.icon size={22} color={widget.color} />
                        </View>
                        <Text style={styles.widgetTitle}>{widget.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Colors.spacing,
    paddingTop: 20,
    paddingBottom: 24,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  searchWrapper: {
    paddingHorizontal: Colors.spacing,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 12,
    ...Colors.shadows.small,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  categoriesScroll: {
    backgroundColor: '#FFF',
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: Colors.spacing,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  categoryTextActive: {
    color: '#FFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Colors.spacing,
    gap: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  categorySection: {
    gap: 12,
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  widgetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  widgetCard: {
    width: '30%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    ...Colors.shadows.small,
  },
  widgetIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
