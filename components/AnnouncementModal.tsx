import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Dimensions, Image, ImageSourcePropType, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AnnouncementModalProps {
  visible: boolean;
  onClose: () => void;
  // Content
  title: string;
  description: string;
  // Optional customization
  badge?: string;
  badgeColor?: string;
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  onButtonPress?: () => void;
  // Image at top (overlapping)
  image?: ImageSourcePropType;
  imageSize?: number;
  // Icon instead of image
  showIcon?: boolean;
}

export default function AnnouncementModal({
  visible,
  onClose,
  title,
  description,
  badge,
  badgeColor = '#2563EB',
  buttonText = 'Got it',
  buttonColor,
  buttonTextColor = '#FFFFFF',
  onButtonPress,
  image,
  imageSize = 100,
  showIcon = true,
}: AnnouncementModalProps) {

  const shimmer = useSharedValue(0);
  const iconScale = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      // Subtle pulse animation for the icon
      iconScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      // Shimmer effect for button
      shimmer.value = withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );
    }
  }, [visible]);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const handleButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onButtonPress) {
      onButtonPress();
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* Dark Overlay Background with fade */}
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

        {/* Bottom Sheet - Smooth slide animation */}
        <Animated.View
          entering={SlideInDown.duration(400).easing(Easing.out(Easing.cubic))}
          exiting={SlideOutDown.duration(250).easing(Easing.in(Easing.cubic))}
          style={styles.sheetContainer}
        >
          {/* Decorative top handle */}
          <View style={styles.handleBar} />

          {/* Floating Image or Icon */}
          {image ? (
            <View style={[styles.imageContainer, { marginTop: -imageSize * 0.5 }]}>
              <View style={styles.imageShadow}>
                <Image 
                  source={image} 
                  style={[styles.floatingImage, { width: imageSize, height: imageSize }]}
                  resizeMode="contain"
                />
              </View>
            </View>
          ) : showIcon && (
            <View style={styles.iconOuterContainer}>
              <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
                <LinearGradient
                  colors={['#2563EB', '#7C3AED']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Sparkles size={36} color="#FFFFFF" strokeWidth={1.5} />
                </LinearGradient>
                {/* Glow effect */}
                <View style={styles.iconGlow} />
              </Animated.View>
            </View>
          )}

          {/* Close Button */}
          <TouchableOpacity onPress={handleClose} style={styles.closeBtn} activeOpacity={0.7}>
            <X size={18} color="#64748B" strokeWidth={2.5} />
          </TouchableOpacity>

          {/* Badge */}
          {badge && (
            <View style={[styles.badgeContainer, { backgroundColor: badgeColor }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {/* Action Button with Gradient */}
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={handleButtonPress}
            style={styles.btnWrapper}
          >
            <LinearGradient
              colors={buttonColor ? [buttonColor, buttonColor] : ['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.actionBtn}
            >
              <Text style={[styles.btnText, { color: buttonTextColor }]}>{buttonText}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Bottom safe area padding */}
          <View style={styles.bottomPadding} />
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
  imageContainer: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 10,
  },
  imageShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  floatingImage: {
    borderRadius: 20,
  },
  iconOuterContainer: {
    marginBottom: 20,
  },
  iconContainer: {
    position: 'relative',
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 28,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  badgeContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  btnWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  bottomPadding: {
    height: Platform.OS === 'ios' ? 28 : 20,
  },
});
