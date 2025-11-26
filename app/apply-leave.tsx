import PageHeader from '@/components/PageHeader';
import Colors from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ApplyLeaveScreen() {
  const router = useRouter();
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    Alert.alert('Success', 'Submitted successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="Apply Leave" />
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Type</Text>
          <View style={styles.typeRow}>
            {['Casual Leave', 'Earned Leave'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeChip, leaveType === type && styles.activeChip]}
                onPress={() => setLeaveType(type)}
              >
                <Text style={[styles.chipText, leaveType === type && styles.activeChipText]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={Colors.secondaryText}
            value={startDate}
            onChangeText={setStartDate}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>End Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={Colors.secondaryText}
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Reason</Text>
          <TextInput
            style={styles.input}
            placeholder="Optional"
            placeholderTextColor={Colors.secondaryText}
            value={reason}
            onChangeText={setReason}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginBottom: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeChip: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '500',
  },
  activeChipText: {
    color: Colors.primary,
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 4,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
