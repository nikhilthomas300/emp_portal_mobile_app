import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import {
  Briefcase,
  Calendar,
  FileText,
  Home,
} from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

const actions = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, link: '/apply-leave', isNew: false },
  { id: 2, title: 'Apply WFH', icon: Home, link: '/apply-wfh', isNew: false },
  { id: 3, title: 'My Letters', icon: FileText, link: '/letters', isNew: false },
  { id: 4, title: 'My Holidays', icon: Calendar, link: '/holidays', isNew: true },
];

export default function QuickActionsGrid() {
  return (
    <View style={styles.container}>
      <SectionHeader title="Quick Actions" />
      
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          {actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Link key={action.id} href={action.link as any} asChild>
                <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
                  <View style={styles.iconWrapper}>
                    {action.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>New</Text>
                      </View>
                    )}
                    <View style={styles.iconContainer}>
                      <IconComponent size={24} color={Colors.primary} strokeWidth={1.8} />
                    </View>
                  </View>
                  <Text style={styles.actionTitle} numberOfLines={2}>{action.title}</Text>
                </TouchableOpacity>
              </Link>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
    width: 75,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    zIndex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  actionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    lineHeight: 14,
  },
});
