import Colors from '@/constants/Colors';
// Force reload
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import {
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
  Search,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  TrendingUp,
  Users,
  Video
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
// 3 Columns Layout
const GAP = 12;
const SIDE_PADDING = 20;
const CARD_WIDTH = (width - (SIDE_PADDING * 2) - (GAP * 2)) / 3;

const APPS = [
  { id: 1, name: 'Digital Risk Management', icon: Shield, color: '#DC2626', bg: '#FEF2F2' },
  { id: 2, name: 'Workday', icon: Briefcase, color: '#0051E0', bg: '#E0EBFF' },
  { id: 3, name: 'Slack', icon: MessageCircle, color: '#E01E5A', bg: '#FFE5EC' },
  { id: 4, name: 'Zoom', icon: Video, color: '#2D8CFF', bg: '#E5F0FF' },
  { id: 5, name: 'Jira', icon: CheckCircle, color: '#0052CC', bg: '#DEEBFF' },
  { id: 6, name: 'Confluence', icon: FileText, color: '#172B4D', bg: '#E6EFFC' },
  { id: 7, name: 'GitHub', icon: Code, color: '#24292E', bg: '#F3F4F6' },
  { id: 8, name: 'Drive', icon: HardDrive, color: '#1FA463', bg: '#E3FCEF' },
  { id: 9, name: 'Outlook', icon: Mail, color: '#0078D4', bg: '#DEECF9' },
  { id: 10, name: 'Teams', icon: Users, color: '#6264A7', bg: '#E8E8F5' },
  { id: 11, name: 'Trello', icon: Layout, color: '#0079BF', bg: '#DFF0FA' },
  { id: 12, name: 'Asana', icon: CheckCircle, color: '#F06A6A', bg: '#FFEBEB' },
  { id: 13, name: 'Notion', icon: Box, color: '#000000', bg: '#F3F4F6' },
  { id: 14, name: 'Figma', icon: Monitor, color: '#F24E1E', bg: '#FFEEE5' },
  { id: 15, name: 'Dropbox', icon: Box, color: '#0061FF', bg: '#E5F0FF' },
  { id: 16, name: 'Salesforce', icon: Cloud, color: '#00A1E0', bg: '#E0F5FF' },
  { id: 17, name: 'SAP', icon: Database, color: '#008FD3', bg: '#E0F2FA' },
  { id: 18, name: 'Oracle', icon: Server, color: '#C74634', bg: '#FCEBE9' },
  { id: 19, name: 'ServiceNow', icon: CheckCircle, color: '#81B5A1', bg: '#E8F5F1' },
  { id: 20, name: 'Zendesk', icon: MessageCircle, color: '#03363D', bg: '#E0F2F1' },
  { id: 21, name: 'Tableau', icon: BarChart, color: '#E97627', bg: '#FCEFE5' },
  { id: 22, name: 'VS Code', icon: Terminal, color: '#007ACC', bg: '#E0F2FF' },
  { id: 23, name: 'Webex', icon: Globe, color: '#00BCEB', bg: '#E0F9FF' },
  { id: 24, name: 'Intranet', icon: Link, color: '#6B7280', bg: '#F3F4F6' },
  { id: 25, name: 'Learning Management', icon: BookOpen, color: '#F59E0B', bg: '#FEF3C7' },
  { id: 26, name: 'Travel & Expense', icon: Plane, color: '#0EA5E9', bg: '#E0F2FE' },
  { id: 27, name: 'Info Security', icon: ShieldCheck, color: '#10B981', bg: '#D1FAE5' },
  { id: 28, name: 'Portfolio Tool', icon: Briefcase, color: '#8B5CF6', bg: '#EDE9FE' },
  { id: 29, name: 'BI Analytics', icon: TrendingUp, color: '#EC4899', bg: '#FCE7F3' },
  { id: 30, name: 'Cloud Infra', icon: Server, color: '#64748B', bg: '#F1F5F9' },
];

export default function AppStoreScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppOpen = async (url: string) => {
    try {
      await openBrowserAsync(url, {
        presentationStyle: WebBrowserPresentationStyle.FULL_SCREEN,
        controlsColor: Colors.primary, 
        toolbarColor: '#FFFFFF',
      });
    } catch (error) {
      console.error("Failed to open browser:", error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enterprise Apps</Text>
        
        <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" />
            <TextInput 
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
            />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
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
                      onPress={() => handleAppOpen('https://www.cricbuzz.com')}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: app.bg }]}>
                           {React.createElement(app.icon as any, { size: 28, color: app.color, strokeWidth: 2 })}
                        </View>
                        
                        <Text style={styles.appName} numberOfLines={3}>{app.name}</Text>
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
    backgroundColor: '#F9FAFB', 
  },
  header: {
    paddingHorizontal: SIDE_PADDING,
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  headerTitle: {
    fontSize: 32, // Large and bold like native iOS
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
    marginTop: 10,
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16, 
    gap: 12,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.03, 
    shadowRadius: 8, 
    elevation: 2
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: SIDE_PADDING, 
    paddingTop: 8,
    paddingBottom: 110,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  appCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    aspectRatio: 0.95, // Slightly taller than square
  },
  iconContainer: {
    width: 48, 
    height: 48, 
    borderRadius: 16, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 12, 
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 16,
  },
  emptyState: {
      paddingVertical: 60,
      alignItems: 'center',
  },
  emptyText: {
      color: '#9CA3AF',
      fontSize: 16,
      fontWeight: '500',
  }
});
