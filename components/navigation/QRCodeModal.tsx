import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Download, QrCode, Share2, X } from 'lucide-react-native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function QRCodeModal({ visible, onClose }: QRCodeModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={20} color="#64748B" strokeWidth={2} />
          </TouchableOpacity>

          {/* Header */}
          <LinearGradient
            colors={['#1E40AF', '#3B82F6', '#60A5FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.headerIcon}>
              <QrCode size={28} color="#FFF" strokeWidth={1.5} />
            </View>
            <Text style={styles.headerTitle}>Digital Identity</Text>
            <Text style={styles.headerSubtitle}>Scan to verify your identity</Text>
          </LinearGradient>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrWrapper}>
              {/* QR Code placeholder - replace with actual QR component */}
              <View style={styles.qrCode}>
                {/* Simulated QR pattern */}
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, i % 2 === 0 && styles.qrCellFilled]} />
                  ))}
                </View>
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, i % 3 === 0 && styles.qrCellFilled]} />
                  ))}
                </View>
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, (i % 2 === 1) && styles.qrCellFilled]} />
                  ))}
                </View>
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, i % 4 === 0 && styles.qrCellFilled]} />
                  ))}
                </View>
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, i % 2 === 0 && styles.qrCellFilled]} />
                  ))}
                </View>
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, i % 3 === 1 && styles.qrCellFilled]} />
                  ))}
                </View>
                <View style={styles.qrRow}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <View key={i} style={[styles.qrCell, (i % 2 === 0) && styles.qrCellFilled]} />
                  ))}
                </View>
              </View>

              {/* Corner decorations */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Nikhil Thomas</Text>
            <Text style={styles.userId}>EMP-2024-1234</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Download size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Share2 size={18} color={Colors.primary} strokeWidth={2} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 23, 42, 0.6)', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 24,
  },
  modalCard: { 
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFF', 
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#FFF', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },

  qrContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  qrWrapper: {
    position: 'relative',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  qrCode: {
    width: 150,
    height: 150,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginVertical: 2,
  },
  qrCell: {
    width: 16,
    height: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  qrCellFilled: {
    backgroundColor: '#1E293B',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: Colors.primary,
  },
  topLeft: { 
    top: 0, 
    left: 0, 
    borderTopWidth: 4, 
    borderLeftWidth: 4, 
    borderTopLeftRadius: 8,
  },
  topRight: { 
    top: 0, 
    right: 0, 
    borderTopWidth: 4, 
    borderRightWidth: 4, 
    borderTopRightRadius: 8,
  },
  bottomLeft: { 
    bottom: 0, 
    left: 0, 
    borderBottomWidth: 4, 
    borderLeftWidth: 4, 
    borderBottomLeftRadius: 8,
  },
  bottomRight: { 
    bottom: 0, 
    right: 0, 
    borderBottomWidth: 4, 
    borderRightWidth: 4, 
    borderBottomRightRadius: 8,
  },

  userInfo: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  userName: { fontSize: 18, fontWeight: '700', color: '#1E293B', marginBottom: 4 },
  userId: { fontSize: 14, color: '#64748B', fontWeight: '500' },

  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});
