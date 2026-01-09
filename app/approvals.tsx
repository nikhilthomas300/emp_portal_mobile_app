import { ModalType, StatusModal } from '@/components/common';
import { PageHeader } from '@/components/navigation';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Briefcase, Check, CreditCard, Home, MessageCircle, Search, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = ['All', 'Leave', 'WFH', 'Expense'];

const MOCK_DATA = [
  { 
    id: '1', 
    category: 'WFH', 
    name: 'John Doe', 
    initials: 'JD', 
    role: 'Senior Developer', 
    type: 'Work From Home',
    fromDate: 'Jan 15, 2025',
    toDate: 'Jan 17, 2025',
    days: '3 days', 
    reason: 'Need to work from home due to personal commitments. Will be available online during regular working hours.',
    applied: '2 hours ago' 
  },
  { 
    id: '2', 
    category: 'Leave', 
    name: 'Mike Ross', 
    initials: 'MR', 
    role: 'Legal Advisor', 
    type: 'Sick Leave',
    fromDate: 'Jan 22, 2025',
    toDate: 'Jan 24, 2025',
    days: '3 days', 
    reason: 'Suffering from fever and cold. Doctor has advised rest for 3 days.',
    applied: '5 hours ago' 
  },
  { 
    id: '3', 
    category: 'Expense', 
    name: 'Robert Fox', 
    initials: 'RF', 
    role: 'DevOps Lead', 
    type: 'Travel Expense',
    fromDate: 'Jan 10, 2025',
    toDate: 'Jan 10, 2025',
    amount: '$245', 
    reason: 'Client meeting travel expenses including cab fare and lunch.',
    applied: '1 day ago' 
  },
  { 
    id: '4', 
    category: 'Leave', 
    name: 'Sarah Kim', 
    initials: 'SK', 
    role: 'UX Designer', 
    type: 'Casual Leave',
    fromDate: 'Jan 28, 2025',
    toDate: 'Jan 30, 2025',
    days: '3 days', 
    reason: 'Attending a family wedding function out of town.',
    applied: '2 days ago' 
  },
];

const getCatColor = (c: string) => ({ Leave: '#8B5CF6', WFH: '#10B981', Expense: '#F59E0B' }[c] || '#3B82F6');
const getCatIcon = (c: string) => ({ Leave: Briefcase, WFH: Home, Expense: CreditCard }[c] || Briefcase);

export default function ApprovalsScreen() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState<{ type: 'Approve' | 'Reject'; item: any } | null>(null);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState({ visible: false, type: 'success' as ModalType, title: '', desc: '' });

  const data = MOCK_DATA.filter(d => {
    const matchesCategory = active === 'All' || d.category === active;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const counts = { 
    Leave: MOCK_DATA.filter(d => d.category === 'Leave').length, 
    WFH: MOCK_DATA.filter(d => d.category === 'WFH').length, 
    Expense: MOCK_DATA.filter(d => d.category === 'Expense').length 
  };

  const handleAction = () => {
    if (modal?.type === 'Reject' && !reason.trim()) {
      setStatus({ visible: true, type: 'error', title: 'Required', desc: 'Please enter rejection reason.' });
      return;
    }
    setModal(null);
    setReason('');
    setTimeout(() => setStatus({ 
      visible: true, 
      type: 'success', 
      title: modal?.type === 'Approve' ? 'Approved!' : 'Rejected', 
      desc: `${modal?.item?.name}'s ${modal?.item?.type} request has been ${modal?.type?.toLowerCase()}ed.` 
    }), 150);
  };

  const Card = ({ item }: { item: typeof MOCK_DATA[0] }) => {
    const color = getCatColor(item.category);
    const Icon = getCatIcon(item.category);
    
    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.avatar, { backgroundColor: color + '15' }]}>
              <Text style={[styles.avatarText, { color }]}>{item.initials}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: color + '12' }]}>
            <Icon size={12} color={color} strokeWidth={2} />
            <Text style={[styles.categoryText, { color }]}>{item.category}</Text>
          </View>
        </View>

        {/* Content Container */}
        <View style={styles.cardContent}>
          {/* Request Type */}
          <Text style={styles.typeLabel}>{item.type}</Text>
          {item.amount && <Text style={styles.amount}>{item.amount}</Text>}

          {/* Date Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>From</Text>
              <Text style={styles.infoValue}>{item.fromDate}</Text>
            </View>
            <View style={styles.infoItemMiddle}>
              <Text style={styles.infoLabel}>To</Text>
              <Text style={styles.infoValue}>{item.toDate}</Text>
            </View>
            {item.days && (
              <View style={styles.infoItemLast}>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{item.days}</Text>
              </View>
            )}
          </View>

          {/* Reason/Comment */}
          <View style={styles.reasonBox}>
            <MessageCircle size={14} color="#64748B" strokeWidth={1.8} style={{ marginTop: 2 }} />
            <Text style={styles.reasonText} numberOfLines={2}>{item.reason}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={styles.appliedTime}>Applied {item.applied}</Text>
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.rejectBtn} 
              onPress={() => setModal({ type: 'Reject', item })}
              activeOpacity={0.7}
            >
              <X size={16} color="#DC2626" strokeWidth={2.5} />
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.approveBtn} 
              onPress={() => setModal({ type: 'Approve', item })}
              activeOpacity={0.7}
            >
              <Check size={16} color="#FFF" strokeWidth={2.5} />
              <Text style={styles.approveText}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Pending Approvals" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search approvals..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabs}>
        {CATEGORIES.map(c => (
          <TouchableOpacity 
            key={c} 
            style={[styles.tab, active === c && styles.tabActive]} 
            onPress={() => setActive(c)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, active === c && styles.tabTextActive]}>{c}</Text>
            {c !== 'All' && (
              <View style={[styles.tabBadge, active === c && styles.tabBadgeActive]}>
                <Text style={[styles.tabBadgeText, active === c && styles.tabBadgeTextActive]}>
                  {counts[c as keyof typeof counts]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Count */}
      <View style={styles.countHeader}>
        <Text style={styles.countText}>{data.length} Pending Requests</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={i => i.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Check size={48} color="#D1D5DB" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyText}>No pending approvals found</Text>
          </View>
        }
      />

      {/* Confirmation Modal */}
      <Modal visible={!!modal} transparent animationType="fade" onRequestClose={() => setModal(null)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
          <View style={styles.modalCard}>
            <LinearGradient
              colors={modal?.type === 'Approve' ? ['#059669', '#10B981'] : ['#DC2626', '#EF4444']}
              style={styles.modalIconBox}
            >
              {modal?.type === 'Approve' ? <Check size={32} color="#FFF" strokeWidth={2.5} /> : <X size={32} color="#FFF" strokeWidth={2.5} />}
            </LinearGradient>
            
            <Text style={styles.modalTitle}>{modal?.type} Request?</Text>
            <Text style={styles.modalSubtitle}>{modal?.item?.name} • {modal?.item?.type}</Text>
            <Text style={styles.modalDates}>{modal?.item?.fromDate} - {modal?.item?.toDate}</Text>

            {modal?.type === 'Reject' && (
              <TextInput
                style={styles.modalInput}
                placeholder="Enter reason for rejection..."
                placeholderTextColor="#9CA3AF"
                value={reason}
                onChangeText={setReason}
                multiline
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => { setModal(null); setReason(''); }}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalConfirmBtn, { backgroundColor: modal?.type === 'Approve' ? '#10B981' : '#EF4444' }]} 
                onPress={handleAction}
              >
                <Text style={styles.modalConfirmText}>{modal?.type}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <StatusModal 
        visible={status.visible} 
        onClose={() => setStatus({ ...status, visible: false })} 
        type={status.type} 
        title={status.title} 
        description={status.desc} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  // Search
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    backgroundColor: '#FFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    height: '100%',
  },

  // Tabs
  tabs: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 8,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#F1F5F9',
    gap: 6,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  tabTextActive: { color: '#FFF' },
  tabBadge: { 
    minWidth: 18, 
    height: 18, 
    borderRadius: 9, 
    backgroundColor: '#E2E8F0', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  tabBadgeActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  tabBadgeText: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  tabBadgeTextActive: { color: '#FFF' },

  // Count Header
  countHeader: { paddingHorizontal: 16, paddingVertical: 12 },
  countText: { fontSize: 13, fontWeight: '600', color: '#64748B' },

  // List
  list: { paddingHorizontal: 16 },
  empty: { paddingVertical: 80, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#374151', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },

  // Card
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 14,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  // Card Header
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { 
    width: 42, 
    height: 42, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: '700' },
  headerInfo: { marginLeft: 10, flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  role: { fontSize: 11, color: '#64748B', marginTop: 2 },
  categoryBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8, 
    gap: 4,
  },
  categoryText: { fontSize: 10, fontWeight: '700' },

  cardContent: { gap: 12 },

  // Type
  typeLabel: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  amount: { fontSize: 16, fontWeight: '700', color: '#059669' },

  // Info Grid
  infoGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    gap: 0,
  },
  infoItem: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    paddingRight: 10,
  },
  infoItemMiddle: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    paddingHorizontal: 10,
  },
  infoItemLast: {
    flex: 1,
    paddingLeft: 10,
  },
  infoLabel: { 
    fontSize: 10, 
    color: '#94A3B8', 
    fontWeight: '600', 
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  infoValue: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#334155',
  },

  // Reason
  reasonBox: { 
    flexDirection: 'row', 
    gap: 10, 
    backgroundColor: '#F8FAFC', 
    padding: 12, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginTop: 4,
  },
  reasonText: { flex: 1, fontSize: 13, color: '#4B5563', lineHeight: 18 },

  // Footer
  cardFooter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingTop: 14,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  appliedTime: { fontSize: 11, color: '#94A3B8', fontStyle: 'italic' },
  actions: { flexDirection: 'row', gap: 8 },
  rejectBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 14, 
    height: 36, 
    borderRadius: 10, 
    backgroundColor: '#FEF2F2',
    gap: 5,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  rejectText: { fontSize: 12, fontWeight: '600', color: '#EF4444' },
  approveBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    height: 36, 
    borderRadius: 10, 
    backgroundColor: '#10B981',
    gap: 5,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  approveText: { fontSize: 12, fontWeight: '600', color: '#FFF' },

  // Modal (Same styles)
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, width: '100%', alignItems: 'center' },
  modalIconBox: { width: 64, height: 64, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 4 },
  modalSubtitle: { fontSize: 14, fontWeight: '600', color: '#374151' },
  modalDates: { fontSize: 13, color: '#6B7280', marginBottom: 20 },
  modalInput: { 
    width: '100%', 
    backgroundColor: '#F9FAFB', 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 12, 
    padding: 14, 
    height: 90, 
    textAlignVertical: 'top', 
    fontSize: 14, 
    color: '#111827', 
    marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', gap: 12, width: '100%' },
  modalCancelBtn: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalCancelText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  modalConfirmBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalConfirmText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
});
