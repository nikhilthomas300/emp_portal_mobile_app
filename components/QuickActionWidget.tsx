import { Briefcase, Home } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { ApplyLeaveModal } from './ApplyLeaveModal';
import { ApplyWFHModal } from './ApplyWFHModal';

export const QuickActionWidget = () => {
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [wfhModalVisible, setWfhModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => setLeaveModalVisible(true)}
      >
        <View style={[styles.iconContainer, { backgroundColor: COLORS.primaryLight }]}>
          <Briefcase size={24} color={COLORS.primary} />
        </View>
        <Text style={styles.actionText}>Apply Leave</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => setWfhModalVisible(true)}
      >
        <View style={[styles.iconContainer, { backgroundColor: '#F3E8FF' }]}>
          <Home size={24} color={'#9333EA'} />
        </View>
        <Text style={styles.actionText}>Work From Home</Text>
      </TouchableOpacity>

      <ApplyLeaveModal 
        visible={leaveModalVisible} 
        onClose={() => setLeaveModalVisible(false)} 
      />
      
      <ApplyWFHModal 
        visible={wfhModalVisible} 
        onClose={() => setWfhModalVisible(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    gap: SPACING.l,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  actionButton: {
    alignItems: 'center',
    gap: SPACING.s,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
  },
});
