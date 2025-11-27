import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Activity, Box, Clock, DollarSign, FileText, Truck, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const widgets = [
  { id: 1, title: 'My Attendance', icon: Clock, color: Colors.primary },
  { id: 2, title: 'My Transport', icon: FileText, color: Colors.accent },
  { id: 3, title: 'Salary Payment Status', icon: DollarSign, color: Colors.success },
  { id: 4, title: 'My Assets', icon: Box, color: Colors.warning },
    { id: 5, title: 'My Letters', icon: Box, color: Colors.warning },
      { id: 6, title: 'My Profile', icon: Box, color: Colors.warning },
        { id: 7, title: 'Flex', icon: Box, color: Colors.warning },
];

const allWidgets = [
  ...widgets,
  { id: 8, title: 'Flex', icon: Activity, color: '#8B5CF6' },
  { id: 9, title: 'Transport', icon: Truck, color: '#EC4899' },
];

export default function MeSection() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>My Widgets</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.seeAllBtn}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {widgets.map((widget) => (
          <TouchableOpacity key={widget.id} style={styles.card}>
            <LinearGradient
              colors={[widget.color + '20', widget.color + '08']}
              style={styles.iconBox}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <widget.icon size={20} color={widget.color} strokeWidth={2.5} />
            </LinearGradient>
            <Text style={styles.title} numberOfLines={2}>{widget.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
                <TouchableOpacity key={widget.id} style={styles.modalCard}>
                  <LinearGradient
                    colors={[widget.color + '20', widget.color + '08']}
                    style={styles.modalIconBox}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <widget.icon size={20} color={widget.color} strokeWidth={2.5} />
                  </LinearGradient>
                  <Text style={styles.modalCardTitle}>{widget.title}</Text>
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
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: Colors.spacing,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllBtn: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 14,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: Colors.spacing,
    gap: 12,
  },
  card: {
    width: 120,
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    ...Colors.shadows.small,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 16,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 40,
  },
  modalCard: {
    width: '30.5%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    ...Colors.shadows.small,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  modalIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 16,
  },
});
