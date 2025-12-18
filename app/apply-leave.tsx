import PageHeader from '@/components/PageHeader';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, router } from 'expo-router';
import { Calendar, ChevronDown, FileText, PieChart } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MY_LEAVE_HISTORY = [
  { id: '1', type: 'Sick Leave', startDate: 'Oct 12, 2024', endDate: 'Oct 14, 2024', days: '3', status: 'Approved' },
  { id: '2', type: 'Casual Leave', startDate: 'Nov 05, 2024', endDate: 'Nov 05, 2024', days: '1', status: 'Rejected' },
];

const LEAVE_BALANCES = [
    { type: 'Sick / Casual', balance: 7, total: 12, color: '#3B82F6' },
    { type: 'Earned Leave', balance: 12, total: 15, color: '#10B981' },
];

export default function ApplyLeave() {
  const [activeTab, setActiveTab] = useState<'New' | 'History'>('New');

  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const [startDayType, setStartDayType] = useState<'Full Day' | 'Half Day'>('Full Day');
  const [endDayType, setEndDayType] = useState<'Full Day' | 'Half Day'>('Full Day');

  const [reason, setReason] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showLeaveTypeDropdown, setShowLeaveTypeDropdown] = useState(false);

  // Leave Types
  const leaveTypes = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Comp Off'];

  const handleSubmit = () => {
    if (!leaveType || !reason) {
      Alert.alert('Required', 'Please fill all fields.');
      return;
    }
    Alert.alert('Submitted', 'Leave request sent.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return Colors.success;
      case 'Rejected': return Colors.danger;
      default: return '#F59E0B'; 
    }
  };

  const renderBalanceCards = () => (
    <View style={styles.balanceContainer}>
        <View style={styles.balanceGrid}>
            {LEAVE_BALANCES.map((item) => (
                <View key={item.type} style={styles.balanceCard}>
                    <View style={[styles.balanceIconWrapper, { backgroundColor: item.color + '15' }]}>
                        <PieChart size={18} color={item.color} />
                    </View>
                    <View style={styles.balanceInfo}>
                        <Text style={styles.balanceLabel}>{item.type}</Text>
                        <Text style={styles.balanceValue}>
                            {item.balance} <Text style={styles.balanceTotal}>/ {item.total}</Text>
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    </View>
  );

  const renderForm = () => (
    <View style={styles.formContent}>
        
        {/* Leave Type Selector */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Leave Type <Text style={{color: Colors.danger}}>*</Text></Text>
            <TouchableOpacity 
                style={styles.selectInput}
                onPress={() => setShowLeaveTypeDropdown(!showLeaveTypeDropdown)}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <FileText size={18} color={Colors.primary} />
                    <Text style={leaveType ? styles.inputText : styles.placeholderText}>
                        {leaveType || 'Select Type'}
                    </Text>
                </View>
                <ChevronDown size={20} color={Colors.secondaryText} />
            </TouchableOpacity>
        </View>

        {showLeaveTypeDropdown && (
            <View style={styles.dropdownList}>
                {leaveTypes.map((type) => (
                <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => {
                        setLeaveType(type);
                        setShowLeaveTypeDropdown(false);
                    }}
                >
                    <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
                ))}
            </View>
        )}

        {/* Start Date */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Date <Text style={{color: Colors.danger}}>*</Text></Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartPicker(true)}>
                <Calendar size={18} color={Colors.secondaryText} />
                <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
            
            <View style={styles.radioGroup}>
                {['Full Day', 'Half Day'].map(opt => (
                     <TouchableOpacity 
                        key={opt}
                        style={styles.radioBtn} 
                        onPress={() => setStartDayType(opt as any)}
                     >
                        <View style={[styles.radioCircle, startDayType === opt && styles.radioCircleSelected]}>
                            {startDayType === opt && <View style={styles.radioDot} />}
                        </View>
                        <Text style={styles.radioLabel}>{opt}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* End Date */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>End Date <Text style={{color: Colors.danger}}>*</Text></Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndPicker(true)}>
                 <Calendar size={18} color={Colors.secondaryText} />
                <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>

             <View style={styles.radioGroup}>
                {['Full Day', 'Half Day'].map(opt => (
                     <TouchableOpacity 
                        key={opt}
                        style={styles.radioBtn} 
                        onPress={() => setEndDayType(opt as any)}
                     >
                        <View style={[styles.radioCircle, endDayType === opt && styles.radioCircleSelected]}>
                            {endDayType === opt && <View style={styles.radioDot} />}
                        </View>
                        <Text style={styles.radioLabel}>{opt}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* Reason */}
        <View style={[styles.inputGroup, { marginBottom: 100 }]}>
            <Text style={styles.label}>Reason <Text style={{color: Colors.danger}}>*</Text></Text>
            <TextInput
                style={styles.textArea}
                placeholder="Enter a reason..."
                placeholderTextColor={Colors.secondaryText}
                multiline
                numberOfLines={3}
                value={reason}
                onChangeText={setReason}
                textAlignVertical="top"
            />
        </View>
    </View>
  );

  const renderHistoryTable = () => (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={[styles.columnHeader, { flex: 2 }]}>Type / Date</Text>
        <Text style={[styles.columnHeader, { flex: 0.8, textAlign: 'center' }]}>Days</Text>
        <Text style={[styles.columnHeader, { flex: 1.2, textAlign: 'right' }]}>Status</Text>
      </View>
      <FlatList
        data={MY_LEAVE_HISTORY}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <View style={{ flex: 2 }}>
                <Text style={styles.cellTitle}>{item.type}</Text>
                <Text style={styles.cellSubtitle}>{item.startDate}</Text>
            </View>
            <Text style={[styles.cellText, { flex: 0.8, textAlign: 'center' }]}>{item.days}</Text>
            <View style={{ flex: 1.2, alignItems: 'flex-end' }}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Apply Leave" />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
            style={[styles.tab, activeTab === 'New' && styles.activeTab]} 
            onPress={() => setActiveTab('New')}
        >
            <Text style={[styles.tabText, activeTab === 'New' && styles.activeTabText]}>New Request</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.tab, activeTab === 'History' && styles.activeTab]} 
            onPress={() => setActiveTab('History')}
        >
             <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>My History</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {activeTab === 'New' && renderBalanceCards()}
            {activeTab === 'New' ? renderForm() : renderHistoryTable()}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer Submit Button - Always Visible */}
      {activeTab === 'New' && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
      )}

      {/* Date Pickers */}
       {Platform.OS === 'ios' ? (
          <Modal visible={showStartPicker} transparent animationType="fade">
             <View style={styles.modalOverlay}>
                <View style={styles.pickerWrapper}>
                    <DateTimePicker value={startDate} mode="date" display="inline" onChange={(_, d) => {
                         if(d) setStartDate(d);
                         setShowStartPicker(false);
                    }} />
                     <TouchableOpacity style={styles.closePicker} onPress={() => setShowStartPicker(false)}>
                        <Text style={styles.closePickerText}>Close</Text>
                    </TouchableOpacity>
                </View>
             </View>
          </Modal>
        ) : (
          showStartPicker && <DateTimePicker value={startDate} mode="date" onChange={(_, d) => { setShowStartPicker(false); if(d) setStartDate(d); }} />
       )}

       {Platform.OS === 'ios' ? (
          <Modal visible={showEndPicker} transparent animationType="fade">
             <View style={styles.modalOverlay}>
                <View style={styles.pickerWrapper}>
                    <DateTimePicker value={endDate} mode="date" display="inline" onChange={(_, d) => {
                         if(d) setEndDate(d);
                         setShowEndPicker(false);
                    }} />
                    <TouchableOpacity style={styles.closePicker} onPress={() => setShowEndPicker(false)}>
                        <Text style={styles.closePickerText}>Close</Text>
                    </TouchableOpacity>
                </View>
             </View>
          </Modal>
        ) : (
          showEndPicker && <DateTimePicker value={endDate} mode="date" onChange={(_, d) => { setShowEndPicker(false); if(d) setEndDate(d); }} />
       )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 16,
    marginBottom: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFF',
    ...Colors.shadows?.small,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: Colors.text,
  },
  
  /* Balance Widget */
  balanceContainer: {
    marginBottom: 16,
  },
  balanceGrid: {
      flexDirection: 'row',
      gap: 12,
  },
  balanceCard: {
      flex: 1,
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 10, // Compact padding
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: 1,
      borderColor: '#E5E7EB',
  },
  balanceIconWrapper: {
      width: 32, // Smaller icon
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
  },
  balanceInfo: {
      flex: 1,
  },
  balanceLabel: { // Label on top now for better hierarchy in small space
      fontSize: 11,
      color: '#6B7280',
      fontWeight: '600',
      marginBottom: 2,
      textTransform: 'uppercase',
  },
  balanceValue: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors.text,
      lineHeight: 18,
  },
  balanceTotal: {
      fontSize: 12,
      color: '#9CA3AF',
      fontWeight: '500',
  },

  /* Form Styles */
  formContent: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      ...Colors.shadows?.small,
      paddingBottom: 20, 
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  placeholderText: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  dropdownList: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: -10,
    marginBottom: 16,
    ...Colors.shadows?.medium,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.text,
  },
  
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  
  /* Radio Buttons */
  radioGroup: {
      flexDirection: 'row',
      gap: 24,
      marginTop: 12,
      paddingLeft: 4,
  },
  radioBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  radioCircle: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: '#D1D5DB',
      justifyContent: 'center',
      alignItems: 'center',
  },
  radioCircleSelected: {
      borderColor: Colors.primary,
  },
  radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: Colors.primary,
  },
  radioLabel: {
      fontSize: 14,
      color: '#4B5563',
  },

  textArea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: Colors.text,
    minHeight: 100,
  },
  
  /* Footer */
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFF',
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 34 : 16,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      ...Colors.shadows?.medium,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },

  /* Table Styles */
  tableContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  columnHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'center',
  },
  cellTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  cellSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  cellText: {
    fontSize: 14,
    color: '#4B5563',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  /* Modal Picker */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  pickerWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  closePicker: {
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  closePickerText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
