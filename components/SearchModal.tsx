import Colors from '@/constants/Colors';
import { Briefcase, Calendar, FileText, Home, Search, Users, X } from 'lucide-react-native';
import React from 'react';
import { Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const suggestedWidgets = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, color: Colors.accent },
  { id: 2, title: 'WFH Request', icon: Home, color: Colors.primary },
  { id: 3, title: 'My Letters', icon: FileText, color: Colors.warning },
  { id: 4, title: 'Calendar', icon: Calendar, color: Colors.success },
  { id: 5, title: 'Team Directory', icon: Users, color: Colors.secondary },
];

export function SearchContent({ onClose, style }: { onClose: () => void; style?: any }) {
  return (
    <View style={[styles.modalContainer, style]}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Widgets..."
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Suggested Widgets</Text>
        <View style={styles.widgetsContainer}>
          {suggestedWidgets.map((widget) => (
            <TouchableOpacity key={widget.id} style={styles.widgetItem}>
              <View style={[styles.widgetIcon, { backgroundColor: `${widget.color}15` }]}>
                <widget.icon size={24} color={widget.color} />
              </View>
              <Text style={styles.widgetText}>{widget.title}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    marginTop: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    height: '100%',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  content: {
    padding: 20,
    ...Platform.select({
      web: {
        overflowY: 'auto',
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#D1D5DB',
          borderRadius: '3px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#9CA3AF',
        },
      } as any,
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  widgetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  widgetItem: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    gap: 10,
    width: '31%',
    ...Colors.shadows.small,
  },
  widgetIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widgetText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
