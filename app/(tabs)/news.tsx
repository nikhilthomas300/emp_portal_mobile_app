import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark, ChevronRight, Clock, RefreshCw } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  isHighlight?: boolean;
}

const allNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Q4 Town Hall Meeting - Join us on Jan 15th',
    description: 'Join our quarterly town hall to hear updates from leadership on company performance and upcoming initiatives.',
    category: 'Events',
    date: '2 hours ago',
    readTime: '3 min read',
    isHighlight: true,
  },
  {
    id: '2',
    title: 'New Employee Wellness Program Launched',
    description: 'Introducing comprehensive wellness benefits including mental health support, gym memberships, and more.',
    category: 'HR',
    date: '1 day ago',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Annual Performance Review Cycle Begins',
    description: 'The annual review cycle starts this month. Please complete your self-assessments by the end of January.',
    category: 'Announcements',
    date: '2 days ago',
    readTime: '2 min read',
  },
  {
    id: '4',
    title: 'IT Security Awareness Training - Mandatory',
    description: 'Complete the mandatory security awareness training by Jan 31st to maintain compliance.',
    category: 'Technology',
    date: '3 days ago',
    readTime: '5 min read',
  },
  {
    id: '5',
    title: 'Office Renovation Updates - Building A',
    description: 'Building A renovations are on schedule. Expect completion by February end.',
    category: 'Facilities',
    date: '4 days ago',
    readTime: '2 min read',
  },
];

const categories = ['All', 'Events', 'HR', 'Announcements', 'Technology', 'Facilities'];

const HEADER_HEIGHT = 80;

export default function NewsTab() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  const filteredNews = allNewsData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Events': return '#F59E0B';
      case 'HR': return '#8B5CF6';
      case 'Announcements': return '#3B82F6';
      case 'Technology': return '#10B981';
      case 'Facilities': return '#EC4899';
      default: return Colors.primary;
    }
  };

  const toggleSave = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const highlightNews = filteredNews.find((item) => item.isHighlight);
  const regularNews = filteredNews.filter((item) => !item.isHighlight);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerContainer, { height: HEADER_HEIGHT + insets.top }]}>
        <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradient, { paddingTop: insets.top + 10 }]}
        >
              <View style={styles.headerTop}>
              <View>
                <Text style={styles.headerTitle}>Company News</Text>
                <Text style={styles.headerSubtitle}>Stay updated with latest updates</Text>
              </View>
              <TouchableOpacity style={styles.refreshIcon} activeOpacity={0.7}>
                <RefreshCw size={18} color="#FFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
        </LinearGradient>
      </View>

      {/* Sticky Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryPill, selectedCategory === category && styles.categoryPillActive]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryPillText, selectedCategory === category && styles.categoryPillTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* News List */}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Highlight Card */}
        {highlightNews && (
          <TouchableOpacity style={styles.highlightCard} activeOpacity={0.9}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']} // Updated to Blue Theme
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.highlightGradient}
            >
              <View style={styles.highlightBadge}>
                <Text style={styles.highlightBadgeText}>Featured</Text>
              </View>
              <Text style={styles.highlightTitle}>{highlightNews.title}</Text>
              <Text style={styles.highlightDesc} numberOfLines={2}>{highlightNews.description}</Text>
              <View style={styles.highlightMeta}>
                <Clock size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.highlightDate}>{highlightNews.date}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Regular News */}
        {regularNews.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsCard} activeOpacity={0.8}>
            <View style={styles.newsCardContent}>
              <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) + '15' }]}>
                <Text style={[styles.categoryTagText, { color: getCategoryColor(item.category) }]}>
                  {item.category}
                </Text>
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.newsDesc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.newsFooter}>
                <View style={styles.newsMeta}>
                  <Clock size={12} color="#94A3B8" />
                  <Text style={styles.newsDate}>{item.date}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.readTime}>{item.readTime}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleSave(item.id)} style={styles.saveButton}>
                  <Bookmark 
                    size={18} 
                    color={savedItems.includes(item.id) ? '#3B82F6' : '#CBD5E1'} 
                    fill={savedItems.includes(item.id) ? '#3B82F6' : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ChevronRight size={20} color="#CBD5E1" />
          </TouchableOpacity>
        ))}

        {filteredNews.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No news found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  headerContainer: {
    backgroundColor: Colors.gradientStart,
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: Colors.gradientStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 10,
  },
  gradient: { 
    flex: 1,
    paddingHorizontal: 18, 
    paddingBottom: 12,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FFF' },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  refreshIcon: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    backgroundColor: 'rgba(255,255,255,0.12)', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)', 
  },
  


  categoriesContainer: { 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E8F0',
    zIndex: 9,
  },
  categoryScroll: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  categoryPill: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  categoryPillActive: { backgroundColor: '#2563EB' },
  categoryPillText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  categoryPillTextActive: { color: '#FFF' },

  scrollContent: { padding: 16, paddingBottom: 100 },

  highlightCard: { marginBottom: 16, borderRadius: 20, overflow: 'hidden' },
  highlightGradient: { padding: 20 },
  highlightBadge: { 
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8, 
    marginBottom: 12 
  },
  highlightBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFF' },
  highlightTitle: { fontSize: 18, fontWeight: '700', color: '#FFF', marginBottom: 8 },
  highlightDesc: { fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 20, marginBottom: 12 },
  highlightMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  highlightDate: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },

  newsCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  newsCardContent: { flex: 1 },
  categoryTag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  categoryTagText: { fontSize: 10, fontWeight: '700' },
  newsTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 6, lineHeight: 21 },
  newsDesc: { fontSize: 13, color: '#64748B', lineHeight: 18, marginBottom: 10 },
  newsFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  newsMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  newsDate: { fontSize: 11, color: '#94A3B8' },
  dot: { color: '#CBD5E1' },
  readTime: { fontSize: 11, color: '#94A3B8' },
  saveButton: { padding: 4 },

  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyText: { fontSize: 15, color: '#94A3B8' },
});
