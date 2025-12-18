import PageHeader from '@/components/PageHeader';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { Calendar, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CATEGORIES = ['All', 'Leave', 'WFH', 'Expense', 'Shift', 'Overtime'];

// Helper to get initials
const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const MOCK_DATA = [
    { 
      id: '1', 
      category: 'WFH',
      name: 'John Doe', 
      role: 'Senior Developer',
      startDate: 'Jan 15',
      endDate: 'Jan 17',
      duration: '3 Days',
      type: 'Full Day',
      reason: 'Personal work at home. Will be available on Slack.',
      appliedDate: 'Today',
      amount: null
    },
    { 
      id: '2', 
      category: 'WFH',
      name: 'Jane Smith', 
      role: 'Product Designer',
      startDate: 'Jan 20',
      endDate: 'Jan 20',
      duration: '1 Day',
      type: 'Half Day',
      reason: 'Medical appointment.',
      appliedDate: 'Yesterday',
      amount: null
    },
    { 
      id: '3', 
      category: 'Leave',
      name: 'Mike Ross', 
      role: 'Legal Advisor',
      startDate: 'Jan 22',
      endDate: 'Jan 24',
      duration: '3 Days',
      type: 'Sick Leave',
      reason: 'Suffering from high fever and cold.',
      appliedDate: 'Today',
      amount: null
    },
    { 
      id: '4', 
      category: 'Leave',
      name: 'Rachel Green', 
      role: 'Marketing Head',
      startDate: 'Feb 01',
      endDate: 'Feb 05',
      duration: '5 Days',
      type: 'Earned Leave',
      reason: 'Annual family vacation trip.',
      appliedDate: '2d ago',
      amount: null
    },
    { 
        id: '5', 
        category: 'Expense',
        name: 'Robert Fox', 
        role: 'DevOps Engineer',
        startDate: 'Jan 10',
        endDate: 'Jan 10',
        duration: null,
        type: 'Travel Reimbursement',
        reason: 'Client meeting travel expenses (Cab + Meals).',
        appliedDate: '3d ago',
        amount: '$45.00'
    },
];

export default function ApprovalsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState<'Approve' | 'Reject' | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState('');

  const initiateAction = (item: any, type: 'Approve' | 'Reject') => {
    setSelectedItem(item);
    setActionType(type);
    setRejectReason(''); 
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (actionType === 'Reject' && !rejectReason.trim()) {
      Alert.alert('Error', 'Please enter a reason for rejection.');
      return;
    }
    setModalVisible(false);
    setTimeout(() => {
        Alert.alert('Success', `Request ${actionType === 'Approve' ? 'Approved' : 'Rejected'}`);
    }, 400);
  };

  const getFilteredData = () => {
    let data = MOCK_DATA;
    if (activeCategory !== 'All') {
        data = data.filter(item => item.category === activeCategory);
    }
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        data = data.filter(item => 
          item.name.toLowerCase().includes(query) ||
          item.reason.toLowerCase().includes(query)
        );
    }
    return data;
  };

  const renderCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      
      {/* 1. Header with Initials Avatar */}
      <View style={styles.cardHeader}>
         <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
         </View>
         <View style={styles.headerMeta}>
             <View style={styles.rowBetween}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.dateLabel}>{item.appliedDate}</Text>
             </View>
             <Text style={styles.userRole}>{item.role}</Text>
         </View>
      </View>

      <View style={styles.divider} />

      {/* 2. Structured Details */}
      <View style={styles.detailsContainer}>
         <View style={styles.detailRow}>
            <View style={styles.labelCol}>
                <Text style={styles.label}>Category</Text>
            </View>
            <View style={styles.valCol}>
                <View style={styles.pill}>
                    <Text style={styles.pillText}>{item.category} • {item.type}</Text>
                </View>
            </View>
         </View>

         <View style={styles.detailRow}>
            <View style={styles.labelCol}>
                <Text style={styles.label}>Date</Text>
            </View>
            <View style={styles.valCol}>
                <View style={styles.dateValRow}>
                    <Calendar size={13} color="#4B5563" style={{ marginRight: 5 }} />
                    <Text style={styles.valText}>{item.startDate} - {item.endDate}</Text>
                    {item.duration && (
                         <Text style={styles.subText}> ({item.duration})</Text>
                    )}
                </View>
            </View>
         </View>

         {item.amount && (
            <View style={styles.detailRow}>
                <View style={styles.labelCol}>
                    <Text style={styles.label}>Amount</Text>
                </View>
                <View style={styles.valCol}>
                    <Text style={styles.amountText}>{item.amount}</Text>
                </View>
            </View>
         )}

         {/* Reason Section */}
         <View style={styles.reasonBox}>
            <Text style={styles.reasonText} numberOfLines={2}>{item.reason}</Text>
         </View>
      </View>

      {/* 3. Footer Actions */}
      <View style={styles.footer}>
         <TouchableOpacity 
            style={[styles.btn, styles.rejectBtn]}
            onPress={() => initiateAction(item, 'Reject')}
         >
            <Text style={styles.rejectBtnText}>Reject</Text>
         </TouchableOpacity>
         
         <TouchableOpacity 
            style={[styles.btn, styles.approveBtn]}
            onPress={() => initiateAction(item, 'Approve')}
         >
            <Text style={styles.approveBtnText}>Approve</Text>
         </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Approvals" />
      
      {/* Top Controls */}
      <View style={styles.controlsSection}>
         {/* Search */}
         <View style={styles.searchBar}>
            <Search size={18} color="#9CA3AF" />
            <TextInput 
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
         </View>

         {/* Category Tabs */}
         <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
         >
            {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                    <TouchableOpacity 
                        key={cat}
                        style={[styles.tabItem, isActive && styles.activeTabItem]}
                        onPress={() => setActiveCategory(cat)}
                    >
                        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{cat}</Text>
                    </TouchableOpacity>
                );
            })}
         </ScrollView>
      </View>

      <FlatList 
        data={getFilteredData()}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No items to show</Text>
            </View>
        }
      />

       {/* Modal */}
       <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
                {actionType === 'Approve' ? 'Confirm Approval' : 'Reject Request'}
            </Text>
            <Text style={styles.modalMsg}>
                {actionType === 'Approve' 
                 ? `Are you sure you want to approve this request for ${selectedItem?.name}?` 
                 : `Please provide a reason to reject ${selectedItem?.name}.`}
            </Text>

            {actionType === 'Reject' && (
                <TextInput 
                    style={styles.reasonInput}
                    placeholder="Reason..."
                    value={rejectReason}
                    onChangeText={setRejectReason}
                    multiline
                />
            )}

            <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalBtnCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.modalBtnConfirm, 
                        // Dynamically set background color based on action
                        actionType === 'Reject' ? { backgroundColor: Colors.danger } : { backgroundColor: Colors.success }
                    ]} 
                    onPress={handleConfirm}
                >
                    <Text style={styles.modalBtnConfirmText}>
                        {actionType === 'Approve' ? 'Confirm' : 'Reject'}
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Neutral light gray background
  },
  controlsSection: {
    backgroundColor: '#FFF',
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  tabsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTabItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 15,
  },

  /* Enterprise Card */
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Colors.shadows?.small,
  },
  
  /* Header */
  cardHeader: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  headerMeta: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  dateLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  userRole: {
    fontSize: 13,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 14,
  },

  /* Details Body */
  detailsContainer: {
    padding: 14,
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelCol: {
    width: 65,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  valCol: {
    flex: 1,
  },
  pill: {
    backgroundColor: '#F9FAFB',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  dateValRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  subText: {
    fontSize: 13,
    color: '#6B7280',
  }, 
  amountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  reasonBox: {
    marginTop: 4,
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 8,
  },
  reasonText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    padding: 12,
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.danger, // Red Border
  },
  approveBtn: {
    backgroundColor: Colors.success, // Green Background
  },
  rejectBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.danger, // Red Text
  },
  approveBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF', // White Text
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 24,
    ...Colors.shadows?.medium,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMsg: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  reasonInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalBtnCancel: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalBtnConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.success, // Default Confirm is Green
  },
  modalBtnConfirmText: {
    color: '#FFF',
    fontWeight: '600',
  },
  modalBtnCancelText: {
    color: '#4B5563',
    fontWeight: '600',
  },
});
