import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface ApplyLeaveModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ApplyLeaveModal = ({ visible, onClose }: ApplyLeaveModalProps) => {
  const [type, setType] = useState('casual');
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Apply Leave</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Leave Type</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[styles.typeButton, type === 'casual' && styles.activeType]}
                onPress={() => setType('casual')}
              >
                <Text style={[styles.typeText, type === 'casual' && styles.activeTypeText]}>Casual</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.typeButton, type === 'earned' && styles.activeType]}
                onPress={() => setType('earned')}
              >
                <Text style={[styles.typeText, type === 'earned' && styles.activeTypeText]}>Earned</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Reason</Text>
            <TextInput 
              style={styles.input}
              placeholder="Why do you need leave?"
              placeholderTextColor={COLORS.textSecondary}
              multiline
            />

            <TouchableOpacity style={styles.submitButton} onPress={onClose}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.l,
    minHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  form: {
    gap: SPACING.l,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: SPACING.m,
  },
  typeButton: {
    flex: 1,
    paddingVertical: SPACING.m,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  activeType: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeText: {
    color: COLORS.text,
    fontWeight: '500',
  },
  activeTypeText: {
    color: COLORS.white,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    padding: SPACING.m,
    height: 100,
    textAlignVertical: 'top',
    color: COLORS.text,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    marginTop: SPACING.m,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
