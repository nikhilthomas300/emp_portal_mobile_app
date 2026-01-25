import * as Haptics from 'expo-haptics';
import { X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

interface QRCodeModalProps {
  visible: boolean;
  onClose: () => void;
}

// Generate a realistic QR code pattern
const generateQRPattern = () => {
  // Standard QR code has fixed position patterns in corners
  const size = 21; // 21x21 is a common QR code size (Version 1)
  const pattern: boolean[][] = [];
  
  for (let i = 0; i < size; i++) {
    pattern[i] = [];
    for (let j = 0; j < size; j++) {
      // Position detection patterns (7x7 squares in 3 corners)
      const isTopLeftFinder = i < 7 && j < 7;
      const isTopRightFinder = i < 7 && j >= size - 7;
      const isBottomLeftFinder = i >= size - 7 && j < 7;
      
      if (isTopLeftFinder || isTopRightFinder || isBottomLeftFinder) {
        // Finder patterns
        const localI = isBottomLeftFinder ? i - (size - 7) : i;
        const localJ = isTopRightFinder ? j - (size - 7) : j;
        
        // Outer border or inner square
        if (localI === 0 || localI === 6 || localJ === 0 || localJ === 6) {
          pattern[i][j] = true;
        } else if (localI >= 2 && localI <= 4 && localJ >= 2 && localJ <= 4) {
          pattern[i][j] = true;
        } else {
          pattern[i][j] = false;
        }
      } else if (i === 6 || j === 6) {
        // Timing patterns
        pattern[i][j] = (i + j) % 2 === 0;
      } else {
        // Data area - pseudo-random but deterministic
        pattern[i][j] = ((i * 7 + j * 11 + i * j) % 3) === 0;
      }
    }
  }
  return pattern;
};

const QR_PATTERN = generateQRPattern();

export default function QRCodeModal({ visible, onClose }: QRCodeModalProps) {

  useEffect(() => {
    if (visible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [visible]);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.overlay}>
        {/* Dark Overlay Background */}
        <Animated.View 
          entering={FadeIn.duration(250)} 
          exiting={FadeOut.duration(200)}
          style={styles.backdrop}
        >
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={handleClose}
          />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View
          entering={SlideInDown.duration(400).easing(Easing.out(Easing.cubic))}
          exiting={SlideOutDown.duration(250).easing(Easing.in(Easing.cubic))}
          style={styles.sheetContainer}
        >
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Close Button */}
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.7}>
            <X size={20} color="#64748B" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Title & Subtitle */}
          <Text style={styles.title}>Digital Identity</Text>
          <Text style={styles.subtitle}>Scan to verify your identity</Text>

          {/* QR Code */}
          <View style={styles.qrOuterContainer}>
            <View style={styles.qrContainer}>
              {/* Corner brackets */}
              <View style={[styles.cornerBracket, styles.topLeftBracket]} />
              <View style={[styles.cornerBracket, styles.topRightBracket]} />
              <View style={[styles.cornerBracket, styles.bottomLeftBracket]} />
              <View style={[styles.cornerBracket, styles.bottomRightBracket]} />
              
              {/* QR Code Grid */}
              <View style={styles.qrCode}>
                {QR_PATTERN.map((row, i) => (
                  <View key={i} style={styles.qrRow}>
                    {row.map((filled, j) => (
                      <View 
                        key={j} 
                        style={[
                          styles.qrCell, 
                          filled && styles.qrCellFilled
                        ]} 
                      />
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Pavan Goyal</Text>
            <Text style={styles.userId}>EMP-2024-1234</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    // Premium shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 25,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginBottom: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
  },
  qrOuterContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  qrContainer: {
    position: 'relative',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Subtle shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cornerBracket: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#2563EB',
  },
  topLeftBracket: { 
    top: -2, 
    left: -2, 
    borderTopWidth: 4, 
    borderLeftWidth: 4, 
    borderTopLeftRadius: 12,
  },
  topRightBracket: { 
    top: -2, 
    right: -2, 
    borderTopWidth: 4, 
    borderRightWidth: 4, 
    borderTopRightRadius: 12,
  },
  bottomLeftBracket: { 
    bottom: -2, 
    left: -2, 
    borderBottomWidth: 4, 
    borderLeftWidth: 4, 
    borderBottomLeftRadius: 12,
  },
  bottomRightBracket: { 
    bottom: -2, 
    right: -2, 
    borderBottomWidth: 4, 
    borderRightWidth: 4, 
    borderBottomRightRadius: 12,
  },
  qrCode: {
    backgroundColor: '#FFFFFF',
  },
  qrRow: {
    flexDirection: 'row',
  },
  qrCell: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
  },
  qrCellFilled: {
    backgroundColor: '#0F172A',
    borderRadius: 1,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#0F172A', 
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userId: { 
    fontSize: 15, 
    color: '#64748B', 
    fontWeight: '600',
    letterSpacing: 0.5,
  },

});
