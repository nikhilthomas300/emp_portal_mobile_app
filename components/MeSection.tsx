import Colors from '@/constants/Colors';
import { Activity, Box, Clock, DollarSign, FileText, Truck, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const widgets = [
  { id: 1, title: 'Attendance', icon: Clock, color: Colors.primary },
  { id: 2, title: 'My Letters', icon: FileText, color: Colors.accent },
  { id: 3, title: 'Salary', icon: DollarSign, color: Colors.success },
  { id: 4, title: 'Assets', icon: Box, color: Colors.warning },
];

const allWidgets = [
  ...widgets,
  { id: 5, title: 'Flex', icon: Activity, color: '#8B5CF6' },
  { id: 6, title: 'Transport', icon: Truck, color: '#EC4899' },
];

export default function MeSection() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>My Widgets</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.seeAllBtn}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.grid}>
          {widgets.map((widget) => (
            <TouchableOpacity key={widget.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: widget.color + '15' }]}>
                <widget.icon size={24} color={widget.color} />
              </View>
              <Text style={styles.title}>{widget.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Widgets</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modalGrid}>
              {allWidgets.map((widget) => (
                <TouchableOpacity key={widget.id} style={styles.card}>
                  <View style={[styles.iconBox, { backgroundColor: widget.color + '15' }]}>
                    <widget.icon size={24} color={widget.color} />
                  </View>
                  <Text style={styles.title}>{widget.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    ...Colors.shadows.small,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  seeAll: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '30%', // 3 columns
    backgroundColor: '#F8F9FD',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // ...Colors.shadows.small,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    height: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingBottom: 40,
  },
});
