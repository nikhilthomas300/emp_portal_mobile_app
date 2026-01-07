import { ModalType, StatusModal } from '@/components/common';
import { PageHeader } from '@/components/navigation';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { Briefcase, Calendar, ChevronRight, Clock, Info } from 'lucide-react-native';
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

  const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const getStatusColor = (status: string) => status === 'Approved' ? '#10B981' : status === 'Rejected' ? '#EF4444' : '#F59E0B';

  const handleSubmit = () => {
    if (!reason.trim()) {
      setModalConfig({ type: 'error', title: 'Required', description: 'Please enter a reason for your leave.' });
      setModalVisible(true);
      return;
    }
    setModalConfig({ type: 'success', title: 'Submitted', description: 'Your leave request has been sent for approval.' });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Apply Leave" />

      {/* Premium Tabs */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, activeTab === 'new' && styles.tabActive]} onPress={() => setActiveTab('new')}>
            <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>New Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'history' && styles.tabActive]} onPress={() => setActiveTab('history')}>
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={[styles.content, { paddingBottom: activeTab === 'new' ? 120 : 20 }]}
          keyboardShouldPersistTaps="handled"
        >
          {activeTab === 'new' ? (
            <View style={styles.formContainer}>
              {/* Leave Type Selection */}
              <View style={styles.sectionHeader}>
                <Text style={[styles.label, { marginBottom: 0 }]}>Select Leave Type</Text>
                <TouchableOpacity>
                  <Info size={14} color="#64748B" />
                </TouchableOpacity>
              </View>
              <View style={styles.typeRow}>
                {LEAVE_TYPES.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeCard, 
                      selectedType.id === type.id && styles.typeCardActive,
                      { borderColor: selectedType.id === type.id ? type.color : '#E2E8F0' }
                    ]}
                    onPress={() => setSelectedType(type)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                      <type.icon size={20} color={type.color} />
                    </View>
                    <View style={styles.typeInfo}>
                      <Text style={styles.typeName}>{type.name}</Text>
                      <Text style={[styles.typeBalance, { color: type.color }]}>{type.balance} days available</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Date Selection */}
              <Text style={styles.label}>Duration</Text>
              <View style={styles.dateRow}>
                <View style={styles.dateCol}>
                  <Text style={styles.subLabel}>From</Text>
                  <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartPicker(true)}>
                    <Calendar size={18} color="#64748B" />
                    <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.dateCol}>
                  <Text style={styles.subLabel}>To</Text>
                  <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndPicker(true)}>
                    <Calendar size={18} color="#64748B" />
                    <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Session */}
              <Text style={styles.label}>Session</Text>
              <View style={styles.sessionRow}>
                {(['Full', '1st Half', '2nd Half'] as const).map(s => (
                  <TouchableOpacity 
                    key={s} 
                    style={[
                      styles.sessionBtn, 
                      session === s && styles.sessionBtnActive,
                      session === s && { borderColor: Colors.primary }
                    ]} 
                    onPress={() => setSession(s)}
                  >
                    <Text style={[styles.sessionText, session === s && styles.sessionTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Reason */}
              <Text style={styles.label}>Reason for Leave</Text>
              <View style={styles.textAreaWrapper}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Enter a detailed reason..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  value={reason}
                  onChangeText={setReason}
                />
              </View>
            </View>
          ) : (
            <View style={styles.historyList}>
              {HISTORY.map(item => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <View style={styles.historyTitleRow}>
                      <View style={[styles.historyIcon, { backgroundColor: '#F1F5F9' }]}>
                        <Briefcase size={16} color="#64748B" />
                      </View>
                      <View>
                        <Text style={styles.historyType}>{item.type}</Text>
                        <Text style={styles.historyDate}>{item.date}</Text>
                      </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.divider} />
                  
                  <View style={styles.historyFooter}>
                    <Text style={styles.historyDays}>{item.days}</Text>
                    {item.comment && (
                      <View style={styles.commentContainer}>
                        <Text style={styles.commentText} numberOfLines={1}>{item.comment}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Fixed Submit Button */}
        {activeTab === 'new' && (
          <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
              <LinearGradient 
                colors={['#1E40AF', '#3B82F6', '#60A5FA']} // Updated to standard blue gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <Text style={styles.submitText}>Submit Leave Request</Text>
                <ChevronRight size={18} color="#FFF" strokeWidth={2.5} />
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 20 },
  formContainer: { gap: 20 },

  // Tabs
  tabWrapper: { backgroundColor: '#F8FAFC', borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingVertical: 12, paddingHorizontal: 20 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  tabText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  tabTextActive: { color: '#0F172A', fontWeight: '700' },

  // Labels
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 10 },
  subLabel: { fontSize: 12, fontWeight: '600', color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  
  // Types
  typeRow: { flexDirection: 'row', gap: 12 },
  typeCard: { flex: 1, flexDirection: 'row', padding: 12, backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', gap: 10, shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
  typeCardActive: { backgroundColor: '#F8FAFC', borderWidth: 1.5 },
  typeIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  typeInfo: { flex: 1 },
  typeName: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginBottom: 1 },
  typeBalance: { fontSize: 11, fontWeight: '600' },

  // Dates
  dateRow: { flexDirection: 'row', gap: 16 },
  dateCol: { flex: 1 },
  dateInput: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#F8FAFC', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  dateText: { fontSize: 15, fontWeight: '600', color: '#1E293B' },

  // Session
  sessionRow: { flexDirection: 'row', gap: 10 },
  sessionBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0' },
  sessionBtnActive: { backgroundColor: '#EFF6FF', borderWidth: 1.5 },
  sessionText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  sessionTextActive: { color: Colors.primary },

  // Logic
  textAreaWrapper: { backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', padding: 4 },
  textArea: { padding: 12, height: 100, textAlignVertical: 'top', fontSize: 15, color: '#1E293B' },

  // History
  historyList: { gap: 12 },
  historyCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  historyIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  historyType: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  historyDate: { fontSize: 12, color: '#64748B', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },
  historyFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  historyDays: { fontSize: 13, fontWeight: '600', color: '#334155' },
  commentContainer: { flex: 1, marginLeft: 16 },
  commentText: { fontSize: 13, color: '#64748B', textAlign: 'right' },

  // Footer
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  submitBtn: { borderRadius: 16, overflow: 'hidden', shadowColor: '#2563EB', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  gradient: { paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  pickerCard: { backgroundColor: '#FFF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  pickerDone: { backgroundColor: Colors.primary, padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 16 },
  pickerDoneText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});
