import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ChevronRight, Clock, Newspaper } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
}

const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Q4 Town Hall Meeting - Join us on Jan 15th',
    category: 'Events',
    date: '2 hours ago',
  },
  {
    id: '2',
    title: 'New Employee Wellness Program Launched',
    category: 'HR',
    date: '1 day ago',
  },
  {
    id: '3',
    title: 'Annual Performance Review Cycle Begins',
    category: 'Announcements',
    date: '2 days ago',
  },
];

export default function NewsSection() {
  const router = useRouter();

  const handleViewAll = () => {
    router.push('/news');
  };

  const handleNewsPress = (newsId: string) => {
    router.push(`/news?highlight=${newsId}` as any);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Events':
        return '#F59E0B';
      case 'HR':
        return '#8B5CF6';
      case 'Announcements':
        return '#3B82F6';
      case 'Technology':
        return '#10B981';
      default:
        return Colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Company News"
        icon={Newspaper}
        iconColor="#3B82F6"
        showSeeAll
        onSeeAll={handleViewAll}
        seeAllText="View All"
      />

      <View style={styles.newsWrapper}>
        <View style={styles.newsCard}>
          {newsData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.newsItem,
                index === newsData.length - 1 && styles.lastNewsItem,
              ]}
              onPress={() => handleNewsPress(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.newsItemLeft}>
                <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(item.category) }]} />
                <View style={styles.newsItemContent}>
                  <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '18' }]}>
                    <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
                      {item.category}
                    </Text>
                  </View>
                  <Text style={styles.newsItemTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={styles.newsItemMeta}>
                    <Clock size={10} color="#94A3B8" />
                    <Text style={styles.newsItemDate}>{item.date}</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={16} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  newsWrapper: {
    paddingHorizontal: Colors.spacing,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  lastNewsItem: {
    borderBottomWidth: 0,
  },
  newsItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  categoryIndicator: {
    width: 4,
    height: 44,
    borderRadius: 2,
    marginTop: 4,
  },
  newsItemContent: {
    flex: 1,
    gap: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  newsItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
  newsItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  newsItemDate: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
