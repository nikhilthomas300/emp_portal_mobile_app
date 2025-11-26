import PageHeader from '@/components/PageHeader';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TABS = ['WFH', 'Leave'];

const MOCK_DATA = {
  'WFH': [
    { 
      id: '1', 
      name: 'John Doe', 
      startDate: 'Jan 15, 2025',
      endDate: 'Jan 17, 2025',
      wfhType: 'Full Day',
      comments: 'Need to work from home due to personal reasons',
      date: 'Today'
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      startDate: 'Jan 20, 2025',
      endDate: 'Jan 20, 2025',
      wfhType: 'Half Day',
      comments: 'Medical appointment in the morning',
      date: 'Yesterday'
    },
  ],
  'Leave': [
    { 
      id: '3', 
      name: 'Mike Ross', 
      startDate: 'Jan 22, 2025',
      endDate: 'Jan 24, 2025',
      reason: 'Sick leave - Fever and cold',
      date: 'Today'
    },
    { 
      id: '4', 
      name: 'Rachel Green', 
      startDate: 'Feb 1, 2025',
      endDate: 'Feb 5, 2025',
      reason: 'Vacation - Family trip',
      date: '2 days ago'
    },
  ],
};

export default function ApprovalsScreen() {
  const [activeTab, setActiveTab] = useState<'WFH' | 'Leave'>('WFH');

  const renderWFHItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{item.startDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.value}>{item.endDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{item.wfhType}</Text>
        </View>
        {item.comments && (
          <View style={[styles.detailRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
            <Text style={styles.label}>Comments:</Text>
            <Text style={[styles.value, { marginTop: 4 }]}>{item.comments}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
          <X size={20} color={Colors.danger} />
          <Text style={[styles.btnText, { color: Colors.danger }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
          <Check size={20} color="#FFF" />
          <Text style={[styles.btnText, { color: '#FFF' }]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLeaveItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{item.startDate}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.value}>{item.endDate}</Text>
        </View>
        {item.reason && (
          <View style={[styles.detailRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
            <Text style={styles.label}>Reason:</Text>
            <Text style={[styles.value, { marginTop: 4 }]}>{item.reason}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.rejectBtn]}>
          <X size={20} color={Colors.danger} />
          <Text style={[styles.btnText, { color: Colors.danger }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.approveBtn]}>
          <Check size={20} color="#FFF" />
          <Text style={[styles.btnText, { color: '#FFF' }]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <PageHeader title="My Approvals" />
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as 'WFH' | 'Leave')}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={MOCK_DATA[activeTab]}
        renderItem={activeTab === 'WFH' ? renderWFHItem : renderLeaveItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No pending approvals</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: Colors.spacing,
    paddingVertical: 10,
    gap: 10,
    ...Colors.shadows.small,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondaryText,
  },
  activeTabText: {
    color: '#FFF',
  },
  listContent: {
    padding: Colors.spacing,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    ...Colors.shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  date: {
    fontSize: 11,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  detailsSection: {
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondaryText,
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  rejectBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: Colors.danger,
  },
  approveBtn: {
    backgroundColor: Colors.success,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.secondaryText,
    fontSize: 16,
  },
});
