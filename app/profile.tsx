import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Briefcase, Building, ChevronRight, Contact, FileText, FolderGit2, LogOut, Mail, MapPin, Phone, User } from 'lucide-react-native';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_EXPANDED_HEIGHT = 200;
const HEADER_COLLAPSED_HEIGHT = 100;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Header Background Animation (Parallax/Fade)
  const headerBackgroundStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [-100, 0, HEADER_EXPANDED_HEIGHT], [0, 0, -50], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, HEADER_EXPANDED_HEIGHT - 50], [1, 0], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  // Sticky Top Bar Animation (Fade in blue background)
  const stickyHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [HEADER_EXPANDED_HEIGHT - 120, HEADER_EXPANDED_HEIGHT - 80], [0, 1], Extrapolate.CLAMP);
    return {
      opacity,
    };
  });
  
  // Title Animation (Fade in when name scrolls out)
  const titleStyle = useAnimatedStyle(() => {
     const opacity = interpolate(scrollY.value, [100, 150], [0, 1], Extrapolate.CLAMP);
     return { opacity };
  });

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => console.log("Logged out") }
    ]);
  };

  const renderInfoRow = (icon: any, label: string, value: string, isLast: boolean = false) => (
      <View style={[styles.infoRow, !isLast && styles.borderBottom]}>
          <View style={styles.iconContainer}>{icon}</View>
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
            <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>
        )}
        <ChevronRight size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const collapsedHeaderHeight = insets.top + 60;

  return (
    <View style={styles.container}>
      
      {/* 1. LAYER 0: Blue Gradient Background (Fixed at top) */}
      <Animated.View style={[styles.fixedGradient, headerBackgroundStyle]}>
        <LinearGradient
            colors={['#1E40AF', '#3B82F6', '#60A5FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        />
      </Animated.View>

      {/* 2. LAYER 1: Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_EXPANDED_HEIGHT - 60, paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
         {/* Overlapping Avatar Section */}
         <View style={styles.profileHeader}>
             <View style={styles.avatarContainer}>
                 <Text style={styles.avatarText}>PG</Text>
             </View>
             <Text style={styles.userName}>Pavan Goyal</Text>
             <Text style={styles.userRole}>Senior Vice President</Text>
             <View style={styles.idBadge}>
                 <Text style={styles.idText}>ID: 809210</Text>
             </View>
         </View>

         {/* White Content Cards */}
         <View style={styles.contentBody}>
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

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <LogOut size={20} color={Colors.danger} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
         </View>
      </Animated.ScrollView>

      {/* 3. LAYER 2: Sticky Header Controls (Back Button, Title) */}
      <View style={[styles.stickyHeader, { height: collapsedHeaderHeight, paddingTop: insets.top }]}>
          {/* Animated Blue Background for Sticky Header */}
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#1E40AF' }, stickyHeaderStyle]} />
          
          <View style={styles.headerControls}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <ArrowLeft size={24} color="#FFF" />
              </TouchableOpacity>
              <Animated.Text style={[styles.stickyTitle, titleStyle]}>My Profile</Animated.Text>
              <View style={{ width: 40 }} />
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  fixedGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_EXPANDED_HEIGHT,
      zIndex: 0,
  },
  scrollContent: {
      // Padding top handles the overlap
      zIndex: 1,
  },
  
  // Header section in ScrollView
  profileHeader: {
      alignItems: 'center',
      marginBottom: 20,
  },
  avatarContainer: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: '#F8FAFC', // Match background
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
  },
  avatarText: { fontSize: 36, fontWeight: '700', color: '#FFF' },
  userName: { fontSize: 24, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  userRole: { fontSize: 16, color: '#64748B', marginBottom: 12, fontWeight: '500' },
  idBadge: {
      backgroundColor: '#EFF6FF',
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#DBEAFE',
  },
  idText: { fontSize: 13, fontWeight: '700', color: Colors.primary },

  contentBody: {
      paddingHorizontal: 20,
  },

  // Sticky Header
  stickyHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      justifyContent: 'center',
      overflow: 'hidden',
  },
  headerControls: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      height: 60,
  },
  backButton: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  stickyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFF',
  },

  /* Sections */
  section: { marginBottom: 24 },
  sectionHeader: {
      fontSize: 13,
      fontWeight: '700',
      color: '#64748B',
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      paddingLeft: 4,
  },
  group: {
      backgroundColor: '#FFF',
      borderRadius: 16,
      ...Colors.shadows?.small,
  },
  
  /* Rows */
  infoRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingVertical: 18 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconContainer: {
      width: 36, height: 36, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  infoValue: { fontSize: 15, color: '#1E293B', fontWeight: '500' },
  
  menuIconBox: { width: 28, alignItems: 'center', marginRight: 12 },
  menuText: { flex: 1, fontSize: 15, color: '#1E293B', fontWeight: '500' },
  badge: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
  badgeText: { color: Colors.primary, fontSize: 11, fontWeight: '700' },

  /* Logout */
  logoutButton: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 18,
      backgroundColor: '#FEF2F2', borderRadius: 16, marginTop: 8, borderWidth: 1, borderColor: '#FECACA',
  },
  logoutText: { color: '#DC2626', fontWeight: '700', fontSize: 15 },
});
