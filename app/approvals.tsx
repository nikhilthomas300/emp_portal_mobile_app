import { ModalType, StatusModal } from '@/components/common';
import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { Briefcase, Check, ChevronLeft, CreditCard, Home, Search, X } from 'lucide-react-native';
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
    fromDate: 'Jan 15',
    toDate: 'Jan 17',
    days: '3 days', 
    reason: 'Need to work from home due to personal commitments.',
    applied: '2h ago' 
  },
  { 
    id: '2', 
    category: 'Leave', 
    name: 'Mike Ross', 
    initials: 'MR', 
    role: 'Legal Advisor', 
    type: 'Sick Leave',
    fromDate: 'Jan 22',
    toDate: 'Jan 24',
    days: '3 days', 
    reason: 'Suffering from fever and cold.',
    applied: '5h ago' 
  },
  { 
    id: '3', 
    category: 'Expense', 
    name: 'Robert Fox', 
    initials: 'RF', 
    role: 'DevOps Lead', 
    type: 'Travel Expense',
    fromDate: 'Jan 10',
    toDate: 'Jan 10',
    amount: '$245', 
    reason: 'Client meeting travel expenses.',
    applied: '1d ago' 
  },
  { 
    id: '4', 
    category: 'Leave', 
    name: 'Sarah Kim', 
    initials: 'SK', 
    role: 'UX Designer', 
    type: 'Casual Leave',
    fromDate: 'Jan 28',
    toDate: 'Jan 30',
    days: '3 days', 
    reason: 'Attending a family wedding.',
    applied: '2d ago' 
  },
];

const getCatColor = (c: string) => ({ Leave: '#8B5CF6', WFH: '#10B981', Expense: '#F59E0B' }[c] || '#3B82F6');
const getCatIcon = (c: string) => ({ Leave: Briefcase, WFH: Home, Expense: CreditCard }[c] || Briefcase);

export default function ApprovalsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
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
      desc: `${modal?.item?.name}'s request has been ${modal?.type?.toLowerCase()}ed.` 
    }), 150);
  };

  const Card = ({ item }: { item: typeof MOCK_DATA[0] }) => {
    const color = getCatColor(item.category);
    
    return (
      <View style={styles.card}>
        {/* Header Row */}
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, { backgroundColor: color + '15' }]}>
            <Text style={[styles.avatarText, { color }]}>{item.initials}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: color + '15' }]}>
            <Text style={[styles.badgeText, { color }]}>{item.days || item.amount}</Text>
          </View>
        </View>

        {/* Date & Reason */}
        <View style={styles.detailsRow}>
          <Text style={styles.dateText}>{item.fromDate} - {item.toDate}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.reasonText} numberOfLines={1}>{item.reason}</Text>
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={styles.appliedTime}>{item.applied}</Text>
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.rejectBtn} 
              onPress={() => setModal({ type: 'Reject', item })}
            >
              <X size={16} color="#DC2626" strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.approveBtn} 
              onPress={() => setModal({ type: 'Approve', item })}
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
      
      {/* Gradient Header with Search */}
      <LinearGradient
        colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ChevronLeft size={22} color="#FFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={styles.headerTitleSection}>
            <Text style={styles.headerTitle}>Approvals</Text>
            <Text style={styles.headerSubtitle}>{data.length} pending requests</Text>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or type..."
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
      </LinearGradient>

      {/* Category Tabs */}
      <View style={styles.tabs}>
        {CATEGORIES.map(c => (
          <TouchableOpacity 
            key={c} 
            style={[styles.tab, active === c && styles.tabActive]} 
            onPress={() => setActive(c)}
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
            <Text style={styles.emptyText}>No pending approvals</Text>
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
              {modal?.type === 'Approve' ? <Check size={28} color="#FFF" strokeWidth={2.5} /> : <X size={28} color="#FFF" strokeWidth={2.5} />}
            </LinearGradient>
            
            <Text style={styles.modalTitle}>{modal?.type} Request?</Text>
            <Text style={styles.modalSubtitle}>{modal?.item?.name} • {modal?.item?.type}</Text>

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

  // Header
  header: {
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTitleSection: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
  },

  // Tabs
  tabs: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 8,
  },
  tab: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 10, 
    backgroundColor: '#FFFFFF',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  tabTextActive: { color: '#FFF' },
  tabBadge: { 
    minWidth: 18, 
    height: 18, 
    borderRadius: 9, 
    backgroundColor: '#F1F5F9', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  tabBadgeActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  tabBadgeText: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  tabBadgeTextActive: { color: '#FFF' },

  // List
  list: { paddingHorizontal: 16, paddingTop: 4 },
  empty: { paddingVertical: 80, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#374151', marginTop: 16 },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },

  // Card - Compact Design
  card: { 
    backgroundColor: '#FFF', 
    borderRadius: 14, 
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '700' },
  headerInfo: { marginLeft: 10, flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  type: { fontSize: 12, color: '#64748B', marginTop: 1 },
  badge: { 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 8, 
  },
  badgeText: { fontSize: 12, fontWeight: '700' },

  // Details Row
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    marginBottom: 10,
  },
  dateText: { fontSize: 12, fontWeight: '600', color: '#334155' },
  dot: { color: '#CBD5E1', marginHorizontal: 8 },
  reasonText: { flex: 1, fontSize: 12, color: '#64748B' },

  // Footer
  cardFooter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  appliedTime: { fontSize: 11, color: '#94A3B8' },
  actions: { flexDirection: 'row', gap: 8 },
  rejectBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 10, 
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  approveBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    height: 36, 
    borderRadius: 10, 
    backgroundColor: '#10B981',
    gap: 6,
  },
  approveText: { fontSize: 13, fontWeight: '600', color: '#FFF' },

  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 24, width: '100%', alignItems: 'center' },
  modalIconBox: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 4 },
  modalSubtitle: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 16 },
  modalInput: { 
    width: '100%', 
    backgroundColor: '#F9FAFB', 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 12, 
    padding: 14, 
    height: 80, 
    textAlignVertical: 'top', 
    fontSize: 14, 
    color: '#111827', 
    marginBottom: 16,
  },
  modalButtons: { flexDirection: 'row', gap: 12, width: '100%' },
  modalCancelBtn: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalCancelText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  modalConfirmBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalConfirmText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
});
