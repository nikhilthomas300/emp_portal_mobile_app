import { ModalType, StatusModal } from '@/components/common';
import { PageHeader } from '@/components/navigation';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { Building, Calendar, ChevronDown, GraduationCap, Home, MapPin, MessageSquare, Plane } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WSS_TYPES = [
  { id: 1, name: 'Work From Home', short: 'WFH', icon: Home, color: '#6366F1' },
  { id: 2, name: 'Client Location', short: 'Client', icon: Building, color: '#10B981' },
  { id: 3, name: 'Training', short: 'Training', icon: GraduationCap, color: '#F59E0B' },
  { id: 4, name: 'Travelling', short: 'Travel', icon: Plane, color: '#EC4899' },
];

const INDIA_STATES = ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi', 'Telangana', 'Gujarat'];
const LOCATIONS: { [key: string]: string[] } = {
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Delhi': ['New Delhi', 'Noida', 'Gurgaon'],
  'Telangana': ['Hyderabad', 'Warangal'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
};

const HISTORY = [
  { id: '1', type: 'Work From Home', date: 'Oct 15 - 17, 2025', days: '3 days', status: 'Approved', comment: 'Need to work from home for personal reasons' },
  { id: '2', type: 'Client Location', date: 'Nov 02, 2025', days: '1 day', status: 'Rejected', comment: 'Client meeting at their Bangalore office - rejected due to conflict' },
];

export default function ApplyWFHScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [selectedType, setSelectedType] = useState(WSS_TYPES[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  
  // WFH specific
  const [wfhDuration, setWfhDuration] = useState<'Short Term' | 'Long Term'>('Short Term');
  
  // Client Location specific
  const [country, setCountry] = useState<'India' | 'Other'>('India');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
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
    if (selectedType.id === 2 && country === 'India' && (!selectedState || !selectedLocation)) {
      setModalConfig({ type: 'error', title: 'Required', description: 'Please select state and location.' });
      setModalVisible(true);
      return;
    }
    setModalConfig({ type: 'success', title: 'Submitted', description: 'WSS request sent successfully.' });
    setModalVisible(true);
  };

  const handleTypeChange = (type: typeof WSS_TYPES[0]) => {
    setSelectedType(type);
    setWfhDuration('Short Term');
    setCountry('India');
    setSelectedState('');
    setSelectedLocation('');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Apply WSS" />

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
              {/* Work Type Selection */}
              <Text style={styles.label}>Work Type</Text>
              <View style={styles.typeGrid}>
                {WSS_TYPES.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={[styles.typeCard, selectedType.id === type.id && { borderColor: type.color, backgroundColor: type.color + '10' }]}
                    onPress={() => handleTypeChange(type)}
                  >
                    <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                      <type.icon size={18} color={type.color} />
                    </View>
                    <Text style={styles.typeName}>{type.short}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* WFH Duration - Only for Work From Home */}
              {selectedType.id === 1 && (
                <>
                  <Text style={styles.label}>Duration Type</Text>
                  <View style={styles.optionRow}>
                    {(['Short Term', 'Long Term'] as const).map(opt => (
                      <TouchableOpacity
                        key={opt}
                        style={[styles.optionBtn, wfhDuration === opt && styles.optionBtnActive]}
                        onPress={() => setWfhDuration(opt)}
                      >
                        <Text style={[styles.optionText, wfhDuration === opt && styles.optionTextActive]}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              {/* Client Location Options */}
              {selectedType.id === 2 && (
                <>
                  <Text style={styles.label}>Country</Text>
                  <View style={styles.optionRow}>
                    {(['India', 'Other'] as const).map(opt => (
                      <TouchableOpacity
                        key={opt}
                        style={[styles.optionBtn, country === opt && styles.optionBtnActive]}
                        onPress={() => { setCountry(opt); setSelectedState(''); setSelectedLocation(''); }}
                      >
                        <Text style={[styles.optionText, country === opt && styles.optionTextActive]}>
                          {opt === 'Other' ? 'Other than India' : opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {country === 'India' && (
                    <>
                      <Text style={styles.label}>State</Text>
                      <TouchableOpacity style={styles.dropdown} onPress={() => setShowStateDropdown(!showStateDropdown)}>
                        <MapPin size={16} color="#64748B" />
                        <Text style={selectedState ? styles.dropdownValue : styles.dropdownPlaceholder}>
                          {selectedState || 'Select State'}
                        </Text>
                        <ChevronDown size={18} color="#64748B" />
                      </TouchableOpacity>
                      {showStateDropdown && (
                        <View style={styles.dropdownList}>
                          {INDIA_STATES.map(state => (
                            <TouchableOpacity
                              key={state}
                              style={styles.dropdownItem}
                              onPress={() => { setSelectedState(state); setSelectedLocation(''); setShowStateDropdown(false); }}
                            >
                              <Text style={styles.dropdownItemText}>{state}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}

                      {selectedState && (
                        <>
                          <Text style={styles.label}>Location</Text>
                          <TouchableOpacity style={styles.dropdown} onPress={() => setShowLocationDropdown(!showLocationDropdown)}>
                            <MapPin size={16} color="#64748B" />
                            <Text style={selectedLocation ? styles.dropdownValue : styles.dropdownPlaceholder}>
                              {selectedLocation || 'Select Location'}
                            </Text>
                            <ChevronDown size={18} color="#64748B" />
                          </TouchableOpacity>
                          {showLocationDropdown && (
                            <View style={styles.dropdownList}>
                              {LOCATIONS[selectedState]?.map(loc => (
                                <TouchableOpacity
                                  key={loc}
                                  style={styles.dropdownItem}
                                  onPress={() => { setSelectedLocation(loc); setShowLocationDropdown(false); }}
                                >
                                  <Text style={styles.dropdownItemText}>{loc}</Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}

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

              {/* Reason */}
              <Text style={styles.label}>Reason</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Enter reason..."
                placeholderTextColor="#94A3B8"
                multiline
                value={reason}
                onChangeText={setReason}
              />

              {/* Submit Button - inside ScrollView */}
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
                <LinearGradient 
                  colors={[Colors.gradientStart, Colors.gradientMiddle, Colors.gradientEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradient}
                >
                  <Text style={styles.submitText}>Submit Request</Text>
                </LinearGradient>
              </TouchableOpacity>
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
  content: { padding: 16, paddingBottom: 40 },

  tabContainer: { flexDirection: 'row', marginHorizontal: 16, marginVertical: 12, backgroundColor: '#E2E8F0', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#FFF' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748B' },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },

  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8, marginTop: 16 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  typeCard: { width: '48%', flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 2, borderColor: '#E2E8F0', gap: 10 },
  typeIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  typeName: { fontSize: 13, fontWeight: '600', color: '#374151' },

  optionRow: { flexDirection: 'row', gap: 10 },
  optionBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10, backgroundColor: '#E2E8F0' },
  optionBtnActive: { backgroundColor: Colors.primary },
  optionText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  optionTextActive: { color: '#FFF' },

  dropdown: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  dropdownValue: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E293B' },
  dropdownPlaceholder: { flex: 1, fontSize: 14, color: '#94A3B8' },
  dropdownList: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 4, overflow: 'hidden' },
  dropdownItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dropdownItemText: { fontSize: 14, color: '#1E293B' },

  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  dateBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#FFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  dateText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },

  textArea: { backgroundColor: '#FFF', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', height: 80, textAlignVertical: 'top', fontSize: 14, color: '#1E293B' },

  historyCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  historyType: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  historyDate: { fontSize: 13, color: '#64748B', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700' },
  commentRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 8 },
  commentText: { flex: 1, fontSize: 13, color: '#64748B', lineHeight: 18 },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  submitBtn: { borderRadius: 16, overflow: 'hidden', marginTop: 24, shadowColor: '#0D3C75', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  gradient: { paddingVertical: 18, alignItems: 'center' },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  pickerCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16 },
  pickerDone: { backgroundColor: Colors.primary, padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  pickerDoneText: { color: '#FFF', fontWeight: '700' },
});
