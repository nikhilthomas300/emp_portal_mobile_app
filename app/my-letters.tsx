import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, Download, FileText } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Tab options
const TABS = ['Letters', 'PFR Letters', 'ESOP Letters'];

// Year options
const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];

// Dummy letters data
const LETTERS_DATA: Record<string, any[]> = {
  'Letters': [
    { id: '1', name: 'Annual Salary Revision Letter', year: '2026', date: '15 Jan 2026' },
    { id: '2', name: 'Promotion Confirmation Letter', year: '2025', date: '01 Apr 2025' },
    { id: '3', name: 'Annual Salary Revision Letter', year: '2025', date: '15 Jan 2025' },
    { id: '4', name: 'Employment Confirmation Letter', year: '2024', date: '01 Jun 2024' },
    { id: '5', name: 'Annual Salary Revision Letter', year: '2024', date: '15 Jan 2024' },
    { id: '6', name: 'Offer Letter', year: '2023', date: '15 Mar 2023' },
  ],
  'PFR Letters': [
    { id: '1', name: 'PF Yearly Statement', year: '2026', date: '10 Jan 2026' },
    { id: '2', name: 'PF Yearly Statement', year: '2025', date: '10 Jan 2025' },
    { id: '3', name: 'PF Account Transfer Confirmation', year: '2024', date: '05 Jul 2024' },
    { id: '4', name: 'PF Yearly Statement', year: '2024', date: '10 Jan 2024' },
  ],
  'ESOP Letters': [
    { id: '1', name: 'ESOP Grant Letter', year: '2025', date: '15 Aug 2025' },
    { id: '2', name: 'ESOP Vesting Confirmation', year: '2024', date: '15 Aug 2024' },
    { id: '3', name: 'ESOP Grant Letter', year: '2023', date: '15 Aug 2023' },
  ],
};

export default function MyLettersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Letters');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [showYearPicker, setShowYearPicker] = useState(false);

  const handleTabChange = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const handleYearSelect = (year: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedYear(year);
    setShowYearPicker(false);
  };

  const handleDownload = (letter: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Handle download
    console.log('Download:', letter.name);
  };

  // Filter letters by selected year
  const filteredLetters = LETTERS_DATA[activeTab]?.filter(
    (letter) => letter.year === selectedYear
  ) || [];

  const renderLetterItem = ({ item }: { item: any }) => (
    <View style={styles.letterCard}>
      <View style={styles.letterIconContainer}>
        <FileText size={24} color="#2563EB" strokeWidth={1.5} />
      </View>
      <View style={styles.letterInfo}>
        <Text style={styles.letterName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.letterDate}>{item.date}</Text>
      </View>
      <TouchableOpacity 
        style={styles.downloadBtn} 
        onPress={() => handleDownload(item)}
        activeOpacity={0.7}
      >
        <Download size={20} color="#2563EB" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#0D3C75', '#165BAA', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Letters</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => handleTabChange(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Year Dropdown */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setShowYearPicker(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownLabel}>Year:</Text>
          <Text style={styles.dropdownValue}>{selectedYear}</Text>
          <ChevronDown size={18} color="#64748B" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Letters List */}
      <FlatList
        data={filteredLetters}
        keyExtractor={(item) => item.id}
        renderItem={renderLetterItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FileText size={48} color="#CBD5E1" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No Letters Found</Text>
            <Text style={styles.emptyText}>
              No {activeTab.toLowerCase()} available for {selectedYear}
            </Text>
          </View>
        }
      />

      {/* Year Picker Modal */}
      <Modal
        visible={showYearPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowYearPicker(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowYearPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Select Year</Text>
            {YEARS.map((year) => (
              <TouchableOpacity
                key={year}
                style={[styles.pickerItem, selectedYear === year && styles.pickerItemActive]}
                onPress={() => handleYearSelect(year)}
              >
                <Text style={[styles.pickerItemText, selectedYear === year && styles.pickerItemTextActive]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  placeholder: {
    width: 44,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#64748B',
    marginRight: 8,
  },
  dropdownValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  letterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  letterIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  letterInfo: {
    flex: 1,
  },
  letterName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
    lineHeight: 20,
  },
  letterDate: {
    fontSize: 13,
    color: '#64748B',
  },
  downloadBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 300,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 16,
  },
  pickerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  pickerItemActive: {
    backgroundColor: '#EFF6FF',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
  pickerItemTextActive: {
    color: '#2563EB',
    fontWeight: '600',
  },
});
