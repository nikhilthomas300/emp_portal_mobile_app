import { Heart, MessageCircle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface GreetingHeaderProps {
  name: string;
}

export const GreetingHeader = ({ name }: GreetingHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logoText}>Portal</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Heart size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MessageCircle size={24} color={COLORS.text} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    backgroundColor: COLORS.background,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'System', // Use system font for clean look
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.l,
  },
  iconButton: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.danger,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
