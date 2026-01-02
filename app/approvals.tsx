import { ModalType, StatusModal } from '@/components/common';
import { PageHeader } from '@/components/navigation';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { Briefcase, Check, CreditCard, Home, MessageSquare, Search, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = ['All', 'Leave', 'WFH', 'Expense'];

const MOCK_DATA = [
  { id: '1', category: 'WFH', name: 'John Doe', role: 'Senior Developer', type: 'Work From Home', dates: 'Jan 15 - 17', days: '3 days', reason: 'Personal work from home.', applied: 'Today' },
  { id: '2', category: 'Leave', name: 'Mike Ross', role: 'Legal Advisor', type: 'Sick Leave', dates: 'Jan 22 - 24', days: '3 days', reason: 'Suffering from fever.', applied: 'Today' },
  { id: '3', category: 'Expense', name: 'Robert Fox', role: 'DevOps Lead', type: 'Travel Expense', dates: 'Jan 10', days: '', reason: 'Client meeting travel.', applied: '2d ago', amount: '$245' },
];

const getColor = (cat: string) => ({ Leave: '#6366F1', WFH: '#10B981', Expense: '#F59E0B' }[cat] || Colors.primary);
const getIcon = (cat: string) => ({ Leave: Briefcase, WFH: Home, Expense: CreditCard }[cat] || Briefcase);
const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2);

export default function ApprovalsScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [actionModal, setActionModal] = useState<{ visible: boolean; type: 'Approve' | 'Reject'; item: any } | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [statusModal, setStatusModal] = useState({ visible: false, type: 'success' as ModalType, title: '', description: '' });

  const filteredData = MOCK_DATA.filter(d =>
    (activeCategory === 'All' || d.category === activeCategory) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAction = () => {
    if (actionModal?.type === 'Reject' && !rejectReason.trim()) {
      setStatusModal({ visible: true, type: 'error', title: 'Required', description: 'Enter rejection reason.' });
      return;
    }
    setActionModal(null);
    setTimeout(() => {
      setStatusModal({
        visible: true,
        type: 'success',
        title: actionModal?.type === 'Approve' ? 'Approved' : 'Rejected',
        description: `${actionModal?.item?.name}'s request has been ${actionModal?.type?.toLowerCase()}ed.`
      });
    }, 200);
  };

  const renderCard = ({ item }: { item: typeof MOCK_DATA[0] }) => {
    const color = getColor(item.category);
    const Icon = getIcon(item.category);

    return (
      <View style={styles.card}>
        {/* Header Row */}
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, { backgroundColor: color + '15' }]}>
            <Text style={[styles.avatarText, { color }]}>{getInitials(item.name)}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: color + '15' }]}>
            <Icon size={12} color={color} />
            <Text style={[styles.badgeText, { color }]}>{item.category}</Text>
          </View>
        </View>

        {/* Details Row */}
        <View style={styles.detailsRow}>
          <View style={styles.detailCol}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>{item.type}</Text>
          </View>
          <View style={styles.detailCol}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{item.dates}{item.days ? ` (${item.days})` : ''}</Text>
          </View>
          {item.amount && (
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>Amount</Text>
              <Text style={[styles.detailValue, { color: '#10B981', fontWeight: '700' }]}>{item.amount}</Text>
            </View>
          )}
        </View>

        {/* Reason */}
        <View style={styles.reasonRow}>
          <MessageSquare size={14} color="#64748B" />
          <Text style={styles.reason} numberOfLines={2}>{item.reason}</Text>
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <Text style={styles.appliedText}>Applied {item.applied}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.rejectBtn} onPress={() => setActionModal({ visible: true, type: 'Reject', item })}>
              <X size={14} color="#EF4444" strokeWidth={2.5} />
              <Text style={styles.rejectBtnText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.approveBtn} onPress={() => setActionModal({ visible: true, type: 'Approve', item })}>
              <Check size={14} color="#FFF" strokeWidth={2.5} />
              <Text style={styles.approveBtnText}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Approvals" />

      {/* Sticky Search & Categories */}
      <View style={styles.stickyHeader}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search approvals..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Category Pills - Horizontal Simple */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyText}>No pending approvals</Text></View>}
      />

      {/* Action Modal */}
      <Modal visible={!!actionModal?.visible} transparent animationType="fade" onRequestClose={() => setActionModal(null)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalIcon, { backgroundColor: actionModal?.type === 'Approve' ? '#10B98115' : '#EF444415' }]}>
              {actionModal?.type === 'Approve' ? <Check size={28} color="#10B981" /> : <X size={28} color="#EF4444" />}
            </View>
            <Text style={styles.modalTitle}>{actionModal?.type} Request</Text>
            <Text style={styles.modalSubtitle}>
              {actionModal?.type === 'Approve'
                ? `Approve ${actionModal?.item?.name}'s ${actionModal?.item?.type?.toLowerCase()}?`
                : `Please provide a reason for rejection.`}
            </Text>

            {actionModal?.type === 'Reject' && (
              <TextInput
                style={styles.rejectInput}
                placeholder="Rejection reason..."
                placeholderTextColor="#94A3B8"
                value={rejectReason}
                onChangeText={setRejectReason}
                multiline
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setActionModal(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmBtn, actionModal?.type === 'Reject' && { backgroundColor: '#EF4444' }]}
                onPress={handleAction}
              >
                <Text style={styles.confirmBtnText}>{actionModal?.type}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <StatusModal
        visible={statusModal.visible}
        onClose={() => setStatusModal({ ...statusModal, visible: false })}
        type={statusModal.type}
        title={statusModal.title}
        description={statusModal.description}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  stickyHeader: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 14, paddingVertical: Platform.OS === 'ios' ? 12 : 8, borderRadius: 12, gap: 10, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 15, color: '#1E293B' },

  categoryRow: { flexDirection: 'row', gap: 8 },
  categoryPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F1F5F9' },
  categoryPillActive: { backgroundColor: '#1E293B' },
  categoryText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  categoryTextActive: { color: '#FFF' },

  listContent: { padding: 16, paddingBottom: 40 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 15, color: '#94A3B8' },

  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  avatar: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 15, fontWeight: '700' },
  headerInfo: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  role: { fontSize: 12, color: '#64748B', marginTop: 2 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  badgeText: { fontSize: 11, fontWeight: '700' },

  detailsRow: { flexDirection: 'row', marginBottom: 12, gap: 16 },
  detailCol: {},
  detailLabel: { fontSize: 11, color: '#94A3B8', marginBottom: 2 },
  detailValue: { fontSize: 13, fontWeight: '600', color: '#374151' },

  reasonRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 8, marginBottom: 14 },
  reason: { flex: 1, fontSize: 13, color: '#64748B', lineHeight: 18 },

  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  appliedText: { fontSize: 11, color: '#94A3B8' },
  actions: { flexDirection: 'row', gap: 8 },
  rejectBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA' },
  rejectBtnText: { fontSize: 13, fontWeight: '600', color: '#EF4444' },
  approveBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#10B981' },
  approveBtnText: { fontSize: 13, fontWeight: '600', color: '#FFF' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 24, alignItems: 'center' },
  modalIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  modalSubtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  rejectInput: { width: '100%', backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 14, height: 80, textAlignVertical: 'top', marginBottom: 16, fontSize: 14 },
  modalActions: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelBtn: { flex: 1, backgroundColor: '#F1F5F9', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  cancelBtnText: { fontSize: 15, fontWeight: '600', color: '#64748B' },
  confirmBtn: { flex: 1, backgroundColor: '#10B981', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  confirmBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
});
