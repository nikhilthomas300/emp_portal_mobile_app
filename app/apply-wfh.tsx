import PageHeader from '@/components/PageHeader';
import Colors from '@/constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, router } from 'expo-router';
import { Calendar, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const WSS_HISTORY = [
  { id: '1', date: 'Oct 15, 2024', type: 'WFH - Short Term', reason: 'Plumber check', status: 'Approved' },
  { id: '2', date: 'Nov 02, 2024', type: 'Client Location', reason: 'Client Meeting', status: 'Rejected' },
];

const WSS_TYPES = ['Work From Home', 'Work From Client Location', 'In Training'];
const WFH_TERMS = ['Short Term', 'Long Term'];

export default function ApplyWSSScreen() {
  const [activeTab, setActiveTab] = useState<'New' | 'History'>('New');

  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  // WSS Fields
  const [wssType, setWssType] = useState(WSS_TYPES[0]);
  const [wfhTerm, setWfhTerm] = useState(WFH_TERMS[0]); 

  const [reason, setReason] = useState('');
  
  const [showWssType, setShowWssType] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) {
      Alert.alert('Required', 'Please enter a reason.');
      return;
    }
    Alert.alert('Submitted', 'WSS request submitted!', [
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

  const renderHistoryTable = () => (
     <View style={styles.tableContainer}>
       <View style={styles.tableHeader}>
         <Text style={[styles.columnHeader, { flex: 2 }]}>Date</Text>
         <Text style={[styles.columnHeader, { flex: 2 }]}>Type</Text>
         <Text style={[styles.columnHeader, { flex: 1.2, textAlign: 'right' }]}>Status</Text>
       </View>
       <FlatList
         data={WSS_HISTORY}
         keyExtractor={item => item.id}
         scrollEnabled={false}
         renderItem={({ item }) => (
           <View style={styles.tableRow}>
             <View style={{ flex: 2 }}>
                 <Text style={styles.cellTitle}>{item.date}</Text>
                 <Text style={styles.cellSubtitle} numberOfLines={1}>{item.reason}</Text>
             </View>
             <Text style={[styles.cellText, { flex: 2 }]}>{item.type}</Text>
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

  const renderDropdown = (
      visible: boolean, 
      setVisible: (v: boolean) => void, 
      current: string, 
      options: string[], 
      onSelect: (v: string) => void,
      label: string
  ) => (
      <View style={[styles.inputGroup, { zIndex: visible ? 100 : 1 }]}>
         <Text style={styles.label}>{label} <Text style={{color: Colors.danger}}>*</Text></Text>
         <TouchableOpacity style={styles.selectInput} onPress={() => setVisible(!visible)}>
             <Text style={styles.inputText}>{current}</Text>
             <ChevronDown size={20} color={Colors.secondaryText} />
         </TouchableOpacity>
         
         {visible && (
             <View style={styles.dropdownList}>
                 {options.map(opt => (
                     <TouchableOpacity 
                        key={opt} 
                        style={styles.dropdownItem} 
                        onPress={() => { onSelect(opt); setVisible(false); }}
                     >
                         <Text style={styles.dropdownItemText}>{opt}</Text>
                     </TouchableOpacity>
                 ))}
             </View>
         )}
      </View>
  );

  const renderForm = () => (
    <View style={styles.formContainer}>
        
        {/* WSS Type Dropdown */}
        {renderDropdown(showWssType, setShowWssType, wssType, WSS_TYPES, setWssType, 'WSS Type')}

        {/* WFH Sub-Type: Term Selection (Only if WFH) */}
        {wssType === 'Work From Home' && (
             <View style={styles.inputGroup}>
                 <Text style={styles.label}>WFH Term</Text>
                 <View style={styles.radioGroup}>
                    {WFH_TERMS.map(term => (
                        <TouchableOpacity 
                            key={term} 
                            style={styles.radioBtn} 
                            onPress={() => setWfhTerm(term)}
                        >
                             <View style={[styles.radioCircle, wfhTerm === term && styles.radioCircleSelected]}>
                                 {wfhTerm === term && <View style={styles.radioDot} />}
                             </View>
                             <Text style={styles.radioLabel}>{term}</Text>
                        </TouchableOpacity>
                    ))}
                 </View>
             </View>
        )}

        {/* Start Date */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Start Date <Text style={{color: Colors.danger}}>*</Text></Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => setShowPicker(true)}>
                <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                    <Calendar size={18} color={Colors.primary} />
                    <Text style={styles.inputText}>{formatDate(date)}</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* End Date (Added as requested) */}
        <View style={styles.inputGroup}>
            <Text style={styles.label}>End Date <Text style={{color: Colors.danger}}>*</Text></Text>
            <TouchableOpacity style={styles.selectInput} onPress={() => setShowEndPicker(true)}>
                <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                    <Calendar size={18} color={Colors.primary} />
                    <Text style={styles.inputText}>{formatDate(endDate)}</Text>
                </View>
            </TouchableOpacity>
        </View>

        {/* Reason */}
        <View style={[styles.inputGroup, { marginBottom: 80 }]}>
            <Text style={styles.label}>Reason <Text style={{color: Colors.danger}}>*</Text></Text>
            <TextInput
            style={styles.textArea}
            placeholder="Enter reason..."
            placeholderTextColor={Colors.secondaryText}
            multiline
            numberOfLines={4}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
            />
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="WSS" />
      
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
             <Text style={[styles.tabText, activeTab === 'History' && styles.activeTabText]}>My Requests</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {activeTab === 'New' ? renderForm() : renderHistoryTable()}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer Submit Button - Always Visible */}
      {activeTab === 'New' && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitBtnText}>Submit WSS</Text>
            </TouchableOpacity>
          </View>
      )}

      {/* Date Picker (IOS Modal / Android Inline) */}
       {Platform.OS === 'ios' ? (
          <Modal visible={showPicker} transparent animationType="fade">
             <View style={styles.modalOverlay}>
                <View style={styles.pickerWrapper}>
                    <DateTimePicker value={date} mode="date" display="inline" onChange={(_, d) => {
                         if(d) setDate(d);
                         setShowPicker(false);
                    }} />
                     <TouchableOpacity style={styles.closePicker} onPress={() => setShowPicker(false)}>
                        <Text style={styles.closePickerText}>Close</Text>
                    </TouchableOpacity>
                </View>
             </View>
          </Modal>
        ) : (
          showPicker && <DateTimePicker value={date} mode="date" onChange={(_, d) => { setShowPicker(false); if(d) setDate(d); }} />
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
  
  /* Tabs */
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

  /* Form */
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Colors.shadows?.small,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
    zIndex: 1,
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
    paddingVertical: 14,
  },
  inputText: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  dropdownList: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 4,
    ...Colors.shadows?.medium,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
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

  /* Radio Buttons */
  radioGroup: {
      flexDirection: 'row',
      gap: 20,
      marginTop: 4,
  },
  radioBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 6,
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
    fontSize: 15,
    color: Colors.text,
    minHeight: 120,
  },

  /* Footer */
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFF',
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Safe area for iOS X+
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      ...Colors.shadows?.medium,
      zIndex: 10,
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

  /* Table */
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

  /* Modal */
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
