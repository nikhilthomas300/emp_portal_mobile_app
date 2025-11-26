import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { Briefcase, FileText, Home } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const actions = [
  { id: 1, title: 'Apply Leave', icon: Briefcase, color: Colors.accent, link: '/apply-leave' },
  { id: 2, title: 'WFH', icon: Home, color: Colors.primary, link: '/apply-wfh' },
  { id: 3, title: 'My Letters', icon: FileText, color: Colors.warning, link: '/(tabs)/index' },
];

export default function QuickActions() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.row}>
          {actions.map((action) => (
            <Link key={action.id} href={action.link as any} asChild>
              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.iconContainer}>
                  <action.icon size={24} color={action.color} />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Colors.spacing,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    ...Colors.shadows.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    width: '30%',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F8F9FD',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
