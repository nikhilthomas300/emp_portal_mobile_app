import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { Briefcase, Calendar, Clock, FileText, Home, Search, Users, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const suggestedWidgets = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, color: Colors.accent, route: '/apply-leave' },
  { id: 2, title: 'WFH Request', icon: Home, color: Colors.primary, route: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, color: Colors.warning, route: null },
  { id: 4, title: 'My Approvals', icon: Calendar, color: Colors.success, route: '/approvals' },
  { id: 5, title: 'My Assets', icon: Users, color: Colors.secondary, route: null },
];

const recentSearches = [
  'Oracle HCM',
  'Payroll',
  'CareerOrbit'
];

export function SearchContent({ onClose, style }: { onClose: () => void; style?: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handlePress = (route: string | null) => {
    if (route) {
      // @ts-ignore
      router.push(route);
    }
  };

  return (
    <View style={[styles.modalContainer, style]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.primary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Apps and Widgets..."
            placeholderTextColor="#94A3B8"
            autoFocus
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <X size={16} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Recent Searches */}
        {searchQuery.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.recentContainer}>
              {recentSearches.map((term, index) => (
                <Animated.View 
                  key={index} 
                  entering={FadeInDown.delay(index * 100).duration(400)}
                >
                  <TouchableOpacity style={styles.recentPill}>
                    <Clock size={14} color={Colors.secondaryText} style={{ marginRight: 6 }} />
                    <Text style={styles.recentText}>{term}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
        )}

        {/* Suggested Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggestions</Text>
          <View style={styles.widgetsContainer}>
            {suggestedWidgets.map((widget, index) => {
              const isMatch = widget.title.toLowerCase().includes(searchQuery.toLowerCase());
              if (!isMatch) return null;

              return (
                <Animated.View 
                  key={widget.id} 
                  entering={FadeInRight.delay(index * 100 + 200).springify()}
                  style={{ width: '48%' }}
                >
                  <TouchableOpacity 
                    style={styles.widgetItem}
                    onPress={() => handlePress(widget.route)}
                  >
                    <View style={[styles.widgetIcon, { backgroundColor: `${widget.color}10` }]}>
                      <widget.icon size={20} color={widget.color} />
                    </View>
                    <Text style={styles.widgetTitle} numberOfLines={1}>{widget.title}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <SearchContent onClose={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)', // Darker overlay
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    marginTop: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      android: { elevation: 20 },
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10 },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
    opacity: 0.8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    height: '100%',
    fontWeight: '500',
    ...Platform.select({
      web: { outlineStyle: 'none' } as any,
    }),
  },
  clearButton: {
    backgroundColor: '#CBD5E1',
    borderRadius: 12,
    padding: 4,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: { overflowY: 'auto' } as any,
    }),
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.secondaryText,
    marginBottom: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Colors.shadows.small,
  },
  recentText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '500',
  },
  widgetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  widgetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Colors.shadows.small,
  },
  widgetIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  widgetTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
});
