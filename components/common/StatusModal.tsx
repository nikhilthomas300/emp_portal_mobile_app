import Colors from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertTriangle, CheckCircle, Info, Megaphone, X, XCircle } from 'lucide-react-native';
import React from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    ZoomIn,
    ZoomOut
} from 'react-native-reanimated';

export type ModalType = 'success' | 'error' | 'warning' | 'info' | 'announcement';

interface StatusModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type?: ModalType;
  primaryButtonText?: string;
}

export default function StatusModal({ 
  visible, 
  onClose, 
  title, 
  description, 
  type = 'info',
  primaryButtonText = 'Okay'
}: StatusModalProps) {
  
  if (!visible) return null;

  // Icon Configuration based on type
  const getIconConfig = () => {
    switch(type) {
      case 'success': 
        return { icon: CheckCircle, color: '#10B981', bg: '#ECFDF5', borderColor: '#D1FAE5' }; 
      case 'error': 
        return { icon: XCircle, color: '#EF4444', bg: '#FEF2F2', borderColor: '#FEE2E2' };
      case 'warning': 
        return { icon: AlertTriangle, color: '#F59E0B', bg: '#FFFBEB', borderColor: '#FEF3C7' };
      case 'announcement': 
        return { icon: Megaphone, color: Colors.primary, bg: '#EEF2FF', borderColor: '#E0E7FF' };
      case 'info':
      default: 
        return { icon: Info, color: Colors.primary, bg: '#EEF2FF', borderColor: '#E0E7FF' };
    }
  };

  const { icon: IconComponent, color, bg, borderColor } = getIconConfig();

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* Backdrop Blur */}
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="dark" />
        ) : (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.8)' }]} />
        )}

        <Animated.View 
          entering={ZoomIn.duration(300)}
          exiting={ZoomOut.duration(200)}
          style={styles.container}
        >
          <View style={styles.card}>
            
            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Icon - Clean & Centered */}
            <View style={styles.iconContainer}>
              <View style={[styles.iconCircle, { backgroundColor: bg, borderColor: borderColor }]}>
                <IconComponent size={32} color={color} fill={color} fillOpacity={0.1} />
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>

              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={onClose}
                style={styles.btnWrapper}
              >
                <LinearGradient
                  colors={[Colors.primary, '#4338CA']} // Primary Blue Gradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.actionBtn}
                >
                  <Text style={styles.btnText}>{primaryButtonText}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingTop: 32,
    paddingBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
    zIndex: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  btnWrapper: {
    width: '100%',
  },
  actionBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    width: '100%',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
