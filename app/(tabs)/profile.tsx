
import Colors from '@/constants/Colors';
import { Briefcase, Building, ChevronRight, Contact, FileText, FolderGit2, LogOut, Mail, MapPin, Phone, User } from 'lucide-react-native';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", style: "destructive", onPress: () => console.log("Logged out") }
      ]
    );
  };

  const renderInfoRow = (icon: any, label: string, value: string, isLast: boolean = false) => (
      <View style={[styles.infoRow, !isLast && styles.borderBottom]}>
          <View style={styles.iconContainer}>
              {icon}
          </View>
          <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>{label}</Text>
              <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
          </View>
      </View>
  );

  const renderMenuItem = (icon: any, label: string, isLast: boolean = false, badge?: string) => (
    <TouchableOpacity style={[styles.menuItem, !isLast && styles.borderBottom]}>
        <View style={styles.menuIconBox}>{icon}</View>
        <Text style={styles.menuText}>{label}</Text>
        {badge && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{badge}</Text>
            </View>
        )}
        <ChevronRight size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 80 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        
        <Text style={styles.screenTitle}>My Profile</Text>

        {/* Profile Header Block */}
        <View style={styles.profileHeader}>
            <View style={styles.avatarMain}>
                <Text style={styles.avatarMainText}>PG</Text>
            </View>
            <View style={styles.headerInfo}>
                <Text style={styles.headerName}>Pavan Goyal</Text>
                <Text style={styles.headerRole}>Senior Vice President</Text>
                <View style={styles.headerTag}>
                    <Text style={styles.headerTagText}>ID: 809210</Text>
                </View>
            </View>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>Personal Information</Text>
            <View style={styles.group}>
                {renderInfoRow(<User size={16} color="#4B5563"/>, "Full Name", "Pavan Kumar Goyal")}
                {renderInfoRow(<Contact size={16} color="#4B5563"/>, "Date of Birth", "15 Aug 1985")}
                {renderInfoRow(<MapPin size={16} color="#4B5563"/>, "Address", "123, Green Valley, Silicon City, CA", true)}
            </View>
        </View>

        {/* Work & Contact */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>Work & Contact</Text>
            <View style={styles.group}>
                {renderInfoRow(<Building size={16} color="#4B5563"/>, "Department", "Product & Engineering")}
                {renderInfoRow(<Mail size={16} color="#4B5563"/>, "Work Email", "pavan.goyal@company.com")}
                {renderInfoRow(<Phone size={16} color="#4B5563"/>, "Work Phone", "+1 (555) 019-2834")}
                {renderInfoRow(<MapPin size={16} color="#4B5563"/>, "Location", "San Francisco HQ", true)}
            </View>
        </View>

         {/* Project / Assignment */}
         <View style={styles.section}>
            <Text style={styles.sectionHeader}>Current Assignment</Text>
            <View style={styles.group}>
                 {renderInfoRow(<FolderGit2 size={16} color="#4B5563"/>, "Project Code", "PRJ-2024-ALPHA")}
                 {renderInfoRow(<Briefcase size={16} color="#4B5563"/>, "Assignment", "Strategic Digital Transformation", true)}
            </View>
        </View>

         {/* My Documents */}
         <View style={styles.section}>
            <Text style={styles.sectionHeader}>Documents</Text>
            <View style={styles.group}>
                 {renderMenuItem(<FileText size={18} color="#4F46E5" />, "Payslips")}
                 {renderMenuItem(<FileText size={18} color="#4F46E5" />, "Tax Documents", true)}
            </View>
        </View>

        <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  screenTitle: {
      fontSize: 28,
      fontWeight: '800',
      color: '#111827',
      marginBottom: 20,
  },
  
  /* Profile Header - Clean & Light */
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Colors.shadows?.small,
  },
  avatarMain: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      ...Colors.shadows?.medium,
  },
  avatarMainText: {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFF',
  },
  headerInfo: {
      flex: 1,
  },
  headerName: {
      fontSize: 20,
      fontWeight: '700',
      color: '#111827',
  },
  headerRole: {
      fontSize: 14,
      color: '#6B7280',
      marginTop: 2,
      marginBottom: 8,
  },
  headerTag: {
      backgroundColor: '#F3F4F6',
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
  },
  headerTagText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#4B5563',
  },

  /* Sections */
  section: {
      marginBottom: 24,
  },
  sectionHeader: {
      fontSize: 12,
      fontWeight: '700',
      color: '#6B7280',
      marginBottom: 10,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingLeft: 4,
  },
  group: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E5E7EB',
  },
  
  /* Rows */
  infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
  },
  menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      paddingVertical: 18,
  },
  borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
  },
  infoContent: {
      flex: 1,
  },
  infoLabel: {
      fontSize: 11,
      color: '#6B7280',
      marginBottom: 2,
      textTransform: 'uppercase',
  },
  infoValue: {
      fontSize: 14,
      color: '#1F2937',
      fontWeight: '500',
  },
  
  menuIconBox: {
      width: 28,
      alignItems: 'center',
      marginRight: 12,
  },
  menuText: {
      flex: 1,
      fontSize: 15,
      color: '#1F2937',
      fontWeight: '500',
  },
  badge: {
      backgroundColor: '#EFF6FF',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginRight: 8,
  },
  badgeText: {
      color: Colors.primary,
      fontSize: 11,
      fontWeight: '700',
  },

  /* Logout */
  logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12, // Increased gap
      padding: 18, // Nicer padding
      backgroundColor: '#FFF', // Clean white
      borderRadius: 16,
      marginTop: 10,
      marginBottom: 30, // Extra space at bottom
      ...Colors.shadows?.small, // Subtle shadow for lift
      borderWidth: 1,
      borderColor: '#FEE2E2', // Very subtle red border
  },
  logoutText: {
      color: Colors.danger,
      fontWeight: '700',
      fontSize: 15,
  },
});
