import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
// Force reload
import {
  ArrowLeft,
  BarChart,
  BookOpen,
  Box,
  Briefcase,
  CheckCircle,
  Cloud,
  Code,
  Database,
  FileText,
  Globe,
  HardDrive,
  Layout,
  Link,
  Mail,
  MessageCircle,
  Monitor,
  Plane,
  RotateCw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  TrendingUp,
  Users,
  Video
} from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const GAP = 12;
const PADDING = 20;
// 2 Columns for better readability and touch targets
const CARD_WIDTH = (width - (PADDING * 2) - GAP) / 2;

const CATEGORIES = ['All', 'Productivity', 'Communication', 'HR & Finance', 'Dev Tools', 'Utilities'];

const APPS = [
  // Communication
  { id: 3, name: 'Slack And SalesForce Apps With AI', icon: MessageCircle, color: '#E01E5A', bg: '#FFE5EC', category: 'Communication' },
  { id: 4, name: 'Oracle OIDC', icon: Video, color: '#2D8CFF', bg: '#E5F0FF', category: 'Communication' },
  { id: 9, name: 'Human Resources Management', icon: Mail, color: '#0078D4', bg: '#DEECF9', category: 'Communication' },
  { id: 10, name: 'Teams', icon: Users, color: '#6264A7', bg: '#E8E8F5', category: 'Communication' },
  { id: 23, name: 'Webex', icon: Globe, color: '#00BCEB', bg: '#E0F9FF', category: 'Communication' },
  
  // Productivity
  { id: 5, name: 'Jira', icon: CheckCircle, color: '#0052CC', bg: '#DEEBFF', category: 'Productivity' },
  { id: 6, name: 'Confluence', icon: FileText, color: '#172B4D', bg: '#E6EFFC', category: 'Productivity' },
  { id: 11, name: 'Trello', icon: Layout, color: '#0079BF', bg: '#DFF0FA', category: 'Productivity' },
  { id: 12, name: 'Asana', icon: CheckCircle, color: '#F06A6A', bg: '#FFEBEB', category: 'Productivity' },
  { id: 13, name: 'Notion', icon: Box, color: '#000000', bg: '#F3F4F6', category: 'Productivity' },
  { id: 50, name: 'Monday', icon: Layout, color: '#F59E0B', bg: '#FEF3C7', category: 'Productivity' },

  // HR & Finance
  { id: 2, name: 'Workday', icon: Briefcase, color: '#0051E0', bg: '#E0EBFF', category: 'HR & Finance' },
  { id: 16, name: 'Salesforce', icon: Cloud, color: '#00A1E0', bg: '#E0F5FF', category: 'HR & Finance' },
  { id: 17, name: 'SAP', icon: Database, color: '#008FD3', bg: '#E0F2FA', category: 'HR & Finance' },
  { id: 18, name: 'Oracle', icon: Server, color: '#C74634', bg: '#FCEBE9', category: 'HR & Finance' },
  { id: 26, name: 'Trav & Exp', icon: Plane, color: '#0EA5E9', bg: '#E0F2FE', category: 'HR & Finance' },
  { id: 28, name: 'Portfolio', icon: Briefcase, color: '#8B5CF6', bg: '#EDE9FE', category: 'HR & Finance' },

  // Dev Tools
  { id: 7, name: 'GitHub', icon: Code, color: '#24292E', bg: '#F3F4F6', category: 'Dev Tools' },
  { id: 22, name: 'VS Code', icon: Terminal, color: '#007ACC', bg: '#E0F2FF', category: 'Dev Tools' },
  { id: 30, name: 'Cloud Infra', icon: Server, color: '#64748B', bg: '#F1F5F9', category: 'Dev Tools' },
  { id: 25, name: 'LMS', icon: BookOpen, color: '#F59E0B', bg: '#FEF3C7', category: 'Dev Tools' },

  // Utilities & Others
  { id: 1, name: 'Digital Risk', icon: Shield, color: '#DC2626', bg: '#FEF2F2', category: 'Utilities' },
  { id: 8, name: 'Drive', icon: HardDrive, color: '#1FA463', bg: '#E3FCEF', category: 'Utilities' },
  { id: 14, name: 'Figma', icon: Monitor, color: '#F24E1E', bg: '#FFEEE5', category: 'Utilities' },
  { id: 15, name: 'Dropbox', icon: Box, color: '#0061FF', bg: '#E5F0FF', category: 'Utilities' },
  { id: 19, name: 'ServiceNow', icon: CheckCircle, color: '#81B5A1', bg: '#E8F5F1', category: 'Utilities' },
  { id: 20, name: 'Zendesk', icon: MessageCircle, color: '#03363D', bg: '#E0F2F1', category: 'Utilities' },
  { id: 21, name: 'Tableau', icon: BarChart, color: '#E97627', bg: '#FCEFE5', category: 'Utilities' },
  { id: 24, name: 'Intranet', icon: Link, color: '#6B7280', bg: '#F3F4F6', category: 'Utilities' },
  { id: 27, name: 'InfoSec', icon: ShieldCheck, color: '#10B981', bg: '#D1FAE5', category: 'Utilities' },
  { id: 29, name: 'BI Tool', icon: TrendingUp, color: '#EC4899', bg: '#FCE7F3', category: 'Utilities' },
];

export default function AppStoreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredApps = APPS.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [searchQuery, selectedCategory]);

  const [activeUrl, setActiveUrl] = useState('');
  const webViewRef = useRef<WebView>(null);
  const navigation = useNavigation();
  const tabHidden = useRef(false);

  useEffect(() => {
    if (activeUrl) {
      navigation.setOptions({
        tabBarStyle: { display: 'none' }
      });
      tabHidden.current = true;
    } else if (tabHidden.current) {
      // Restore the full tab bar styles to match _layout.tsx
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: Platform.OS === 'ios' ? 75 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 20,
          paddingTop: 8,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        }
      });
      tabHidden.current = false;
    }
  }, [activeUrl, navigation]);

  const handleAppOpen = (url: string) => {
    setActiveUrl(url);
  };

  const handleClose = () => {
    setActiveUrl('');
  };

  if (activeUrl) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: '#FFFFFF' }]}>
          <View style={styles.browserHeader}>
              <TouchableOpacity onPress={handleClose} style={styles.headerButton}>
                  <ArrowLeft size={20} color={Colors.primary} />
                  <Text style={styles.headerButtonText}>Back to AppStore</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => webViewRef.current?.reload()} style={styles.headerButton}>
                  <RotateCw size={20} color={Colors.primary} />
              </TouchableOpacity>
          </View>
          <WebView 
              ref={webViewRef}
              source={{ uri: activeUrl }} 
              style={styles.webview} 
              startInLoadingState
          />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>App Store</Text>
        
        {/* Search */}
        <View style={styles.searchBar}>
            <Search size={20} color="#64748B" strokeWidth={2} />
            <TextInput 
                style={styles.searchInput}
                placeholder="Search for apps..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
            />
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[
                styles.categoryPill, 
                selectedCategory === cat && styles.activeCategoryPill
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.categoryText, 
                selectedCategory === cat && styles.activeCategoryText
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
          {filteredApps.length === 0 ? (
              <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>No apps found matching "{searchQuery}"</Text>
              </View>
          ) : (
            <View style={styles.gridContainer}>
                {filteredApps.map((app) => (
                    <TouchableOpacity 
                      key={app.id} 
                      style={styles.appCard}
                      activeOpacity={0.7}
                      onPress={() => handleAppOpen('https://www.mphasis.com/home.html')}
                    >
                        {/* Icon - Left */}
                          <LinearGradient
                            colors={[app.bg, '#FFFFFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.iconContainer}
                          >
                             {React.createElement(app.icon as any, { size: 18, color: app.color, strokeWidth: 2.2 })}
                          </LinearGradient>
                        
                        {/* Info - Middle */}
                        <View style={styles.cardInfo}>
                           <Text style={styles.appName} numberOfLines={2}>{app.name}</Text>
                           <Text style={styles.appCategory}>{app.category}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
          )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', 
  },
  header: {
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#F8FAFC',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 30, 
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
    paddingHorizontal: PADDING,
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0', // Flat, softer gray
    marginHorizontal: PADDING,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18, 
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  categoryContainer: {
    paddingHorizontal: PADDING,
    paddingBottom: 16,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeCategoryPill: {
    backgroundColor: '#1E293B',
    borderColor: '#1E293B',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: PADDING, 
    paddingTop: 4,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  appCard: {
    width: CARD_WIDTH, // 2-column width
    backgroundColor: '#FFFFFF',
    borderRadius: 16, // Tighter radius
    padding: 16, // Increased padding for more height
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center',
    gap: 12, // Gap between icon and text
    
    // Subtle shadow
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  // Removed cardHeaderRow as it's no longer needed
  iconContainer: {
    width: 36, 
    height: 36, 
    borderRadius: 12, // Squaricle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  cardInfo: {
    flex: 1, // Take remaining space
    gap: 2,
  },
  appName: {
    fontSize: 14, 
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'left',
  },
  appCategory: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    textAlign: 'left',
  },
  emptyState: {
      paddingVertical: 80,
      alignItems: 'center',
  },
  emptyText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#6B7280',
  },
  browserHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      backgroundColor: '#fff',
  },
  headerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      padding: 4,
  },
  headerButtonText: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: '600',
  },
  webview: {
      flex: 1,
  }
});
