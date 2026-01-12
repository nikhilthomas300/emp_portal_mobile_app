import Colors from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import {
    ArrowLeft,
    RotateCw,
    Search
} from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, UIManager, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const GAP = 10;
const PADDING = 16;
const CARD_WIDTH = (width - (PADDING * 2) - GAP) / 2;

const CATEGORIES = ['All', 'HR & Finance', 'Utilities'];

// App icons from assets
const appIcons: { [key: string]: any } = {
  'EASEF': require('@/assets/images/apps/EASEF.png'),
  'EPAY': require('@/assets/images/apps/EPAY.png'),
  'PROVIDENT': require('@/assets/images/apps/PROVIDENT.png'),
  'PS': require('@/assets/images/apps/PS.png'),
  'SSP': require('@/assets/images/apps/SSP.png'),
  'TALENTNEXT': require('@/assets/images/apps/TALENTNEXT.png'),
};

const APPS = [
  { id: 1, name: 'EASEF', image: 'EASEF', category: 'HR & Finance', description: 'Employee Self Service' },
  { id: 2, name: 'EPAY', image: 'EPAY', category: 'HR & Finance', description: 'Payroll & Salary' },
  { id: 3, name: 'Provident Fund', image: 'PROVIDENT', category: 'HR & Finance', description: 'PF Management' },
  { id: 4, name: 'People Soft', image: 'PS', category: 'Utilities', description: 'HR System' },
  { id: 5, name: 'SSP', image: 'SSP', category: 'Utilities', description: 'Service Portal' },
  { id: 6, name: 'TalentNext', image: 'TALENTNEXT', category: 'Utilities', description: 'Learning & Career' },
];

export default function AppStoreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

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
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
      tabHidden.current = true;
    } else if (tabHidden.current) {
      navigation.setOptions({
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 75 : 70,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 8,
        }
      });
      tabHidden.current = false;
    }
  }, [activeUrl, navigation]);

  if (activeUrl) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: '#FFF' }]}>
        <View style={styles.browserHeader}>
          <TouchableOpacity onPress={() => setActiveUrl('')} style={styles.headerButton}>
            <ArrowLeft size={20} color={Colors.primary} />
            <Text style={styles.headerButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => webViewRef.current?.reload()} style={styles.headerButton}>
            <RotateCw size={18} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <WebView ref={webViewRef} source={{ uri: activeUrl }} style={styles.webview} startInLoadingState />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Blue Gradient Header */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientHeader, { paddingTop: insets.top + 8 }]}
      >
        <Text style={styles.headerTitle}>App Store</Text>
        <Text style={styles.headerSubtitle}>Discover enterprise apps & tools</Text>
        
        {/* Search Bar inside gradient */}
        <View style={styles.searchBar}>
          <Search size={18} color="#64748B" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search apps..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </LinearGradient>

      {/* Sticky Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Apps Grid */}
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {filteredApps.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No apps found</Text>
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {filteredApps.map((app) => (
              <TouchableOpacity 
                key={app.id} 
                style={styles.appCard}
                activeOpacity={0.7}
              >
                <Image 
                  source={appIcons[app.image]} 
                  style={styles.appIcon}
                  resizeMode="contain"
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.appName} numberOfLines={1}>{app.name}</Text>
                  <Text style={styles.appDescription} numberOfLines={1}>{app.description}</Text>
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
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  gradientHeader: { 
    paddingHorizontal: 18, 
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#FFF', 
  },
  headerSubtitle: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.8)', 
    marginTop: 2,
    marginBottom: 14,
  },
  
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 14, 
    paddingHorizontal: 14, 
    height: 44,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1E293B', fontWeight: '500' },

  categoriesContainer: { 
    backgroundColor: '#FFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E8F0',
  },
  categoryScroll: { paddingHorizontal: PADDING, paddingVertical: 12, gap: 8 },
  categoryPill: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  categoryPillActive: { backgroundColor: '#3B82F6' },
  categoryText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  categoryTextActive: { color: '#FFF' },

  scrollContent: { paddingBottom: 100, paddingTop: 16 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: PADDING, gap: GAP },
  
  appCard: { 
    width: CARD_WIDTH, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 14, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  appIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 10,
  },
  cardInfo: { flex: 1, gap: 2 },
  appName: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  appCategory: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },
  appDescription: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },

  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyText: { fontSize: 15, fontWeight: '500', color: '#94A3B8' },

  browserHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerButton: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 4 },
  headerButtonText: { color: Colors.primary, fontSize: 15, fontWeight: '600' },
  webview: { flex: 1 },
});
