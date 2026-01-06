import { ModalType, StatusModal } from '@/components/common';
import { PageHeader } from '@/components/navigation';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { Briefcase, Calendar, Clock, MessageSquare } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LEAVE_TYPES = [
  { id: 1, name: 'Casual', icon: Clock, color: '#6366F1', balance: 8 },
  { id: 2, name: 'Earned', icon: Briefcase, color: '#10B981', balance: 14 },
];

const HISTORY = [
  { id: '1', type: 'Casual Leave', date: 'Oct 12 - 14, 2025', days: '3 days', status: 'Approved', comment: 'Personal work at home' },
  { id: '2', type: 'Earned Leave', date: 'Nov 05, 2025', days: '1 day', status: 'Rejected', comment: 'Family function - rejected due to project deadline' },
  { id: '3', type: 'Casual Leave', date: 'Dec 20 - 22, 2025', days: '3 days', status: 'Pending', comment: 'Year end vacation with family' },
];

export default function ApplyLeaveScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [selectedType, setSelectedType] = useState(LEAVE_TYPES[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [session, setSession] = useState<'Full' | '1st Half' | '2nd Half'>('Full');
  const [reason, setReason] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ type: 'info' as ModalType, title: '', description: '' });

  const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const getStatusColor = (status: string) => status === 'Approved' ? '#10B981' : status === 'Rejected' ? '#EF4444' : '#F59E0B';

  const handleSubmit = () => {
    if (!reason.trim()) {
      setModalConfig({ type: 'error', title: 'Required', description: 'Please enter a reason.' });
      setModalVisible(true);
      return;
    }
    setModalConfig({ type: 'success', title: 'Submitted', description: 'Leave request sent successfully.' });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Apply Leave" />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'new' && styles.tabActive]} onPress={() => setActiveTab('new')}>
          <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>New Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'history' && styles.tabActive]} onPress={() => setActiveTab('history')}>
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>History</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.content, { paddingBottom: activeTab === 'new' ? 100 : 20 }]}
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === 'new' ? (
            <>
              {/* Leave Type Selection */}
              <Text style={styles.label}>Leave Type</Text>
              <View style={styles.typeRow}>
                {LEAVE_TYPES.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={[styles.typeCard, selectedType.id === type.id && { borderColor: type.color, backgroundColor: type.color + '10' }]}
                    onPress={() => setSelectedType(type)}
                  >
                    <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                      <type.icon size={18} color={type.color} />
                    </View>
                    <View style={styles.typeInfo}>
                      <Text style={styles.typeName}>{type.name}</Text>
                      <Text style={[styles.typeBalance, { color: type.color }]}>{type.balance} days</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Dates */}
              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.label}>From</Text>
                  <TouchableOpacity style={styles.dateBtn} onPress={() => setShowStartPicker(true)}>
                    <Calendar size={16} color={Colors.primary} />
                    <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>To</Text>
                  <TouchableOpacity style={styles.dateBtn} onPress={() => setShowEndPicker(true)}>
                    <Calendar size={16} color={Colors.primary} />
                    <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Session */}
              <Text style={styles.label}>Session</Text>
              <View style={styles.sessionRow}>
                {(['Full', '1st Half', '2nd Half'] as const).map(s => (
                  <TouchableOpacity key={s} style={[styles.sessionBtn, session === s && styles.sessionBtnActive]} onPress={() => setSession(s)}>
                    <Text style={[styles.sessionText, session === s && styles.sessionTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Reason */}
              <Text style={styles.label}>Reason</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter reason for leave..."
                placeholderTextColor="#94A3B8"
                multiline
                value={reason}
                onChangeText={setReason}
              />
            </>
          ) : (
            <>
              {HISTORY.map(item => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <View>
                      <Text style={styles.historyType}>{item.type}</Text>
                      <Text style={styles.historyDate}>{item.date} • {item.days}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                    </View>
                  </View>
                  <View style={styles.commentRow}>
                    <MessageSquare size={14} color="#64748B" />
                    <Text style={styles.commentText} numberOfLines={2}>{item.comment}</Text>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>

        {/* Fixed Submit Button - Inside KeyboardAvoidingView */}
        {activeTab === 'new' && (
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <LinearGradient colors={['#4338CA', '#6366F1']} style={styles.gradient}>
                <Text style={styles.submitText}>Submit Leave Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>

      {/* Date Pickers */}
      {showStartPicker && (Platform.OS === 'ios' ? (
        <Modal transparent animationType="fade">
          <TouchableOpacity style={styles.overlay} onPress={() => setShowStartPicker(false)}>
            <View style={styles.pickerCard}>
              <DateTimePicker value={startDate} mode="date" display="inline" onChange={(_, d) => d && setStartDate(d)} />
              <TouchableOpacity style={styles.pickerDone} onPress={() => setShowStartPicker(false)}>
                <Text style={styles.pickerDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : <DateTimePicker value={startDate} mode="date" onChange={(_, d) => { setShowStartPicker(false); d && setStartDate(d); }} />)}

      {showEndPicker && (Platform.OS === 'ios' ? (
        <Modal transparent animationType="fade">
          <TouchableOpacity style={styles.overlay} onPress={() => setShowEndPicker(false)}>
            <View style={styles.pickerCard}>
              <DateTimePicker value={endDate} mode="date" display="inline" onChange={(_, d) => d && setEndDate(d)} />
              <TouchableOpacity style={styles.pickerDone} onPress={() => setShowEndPicker(false)}>
                <Text style={styles.pickerDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : <DateTimePicker value={endDate} mode="date" onChange={(_, d) => { setShowEndPicker(false); d && setEndDate(d); }} />)}

      <StatusModal visible={modalVisible} onClose={() => { setModalVisible(false); if (modalConfig.type === 'success') router.back(); }} type={modalConfig.type} title={modalConfig.title} description={modalConfig.description} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 120 },

  tabContainer: { flexDirection: 'row', marginHorizontal: 16, marginVertical: 12, backgroundColor: '#E2E8F0', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#FFF' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },

  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 16 },
  typeRow: { flexDirection: 'row', gap: 12 },
  typeCard: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#FFF', borderRadius: 14, borderWidth: 2, borderColor: '#E2E8F0', gap: 12 },
  typeIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  typeInfo: { flex: 1 },
  typeName: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  typeBalance: { fontSize: 12, fontWeight: '600', marginTop: 2 },

  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  dateBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  dateText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },

  sessionRow: { flexDirection: 'row', gap: 10 },
  sessionBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10, backgroundColor: '#E2E8F0' },
  sessionBtnActive: { backgroundColor: Colors.primary },
  sessionText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  sessionTextActive: { color: '#FFF' },

  textArea: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', height: 100, textAlignVertical: 'top', fontSize: 14, color: '#1E293B' },

  historyCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  historyType: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  historyDate: { fontSize: 13, color: '#64748B', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  commentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 8 },
  commentText: { flex: 1, fontSize: 13, color: '#64748B', lineHeight: 18 },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  submitBtn: { borderRadius: 14, overflow: 'hidden' },
  gradient: { paddingVertical: 16, alignItems: 'center' },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  pickerCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16 },
  pickerDone: { backgroundColor: Colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  pickerDoneText: { color: '#FFF', fontWeight: '700' },
});
