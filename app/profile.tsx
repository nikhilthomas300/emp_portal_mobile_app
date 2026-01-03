import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Briefcase, Building, ChevronRight, FileText, LogOut, Mail, MapPin, Phone, User } from 'lucide-react-native';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 180;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerBackgroundStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0], Extrapolate.CLAMP);
    return { opacity };
  });

  const stickyHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [60, 100], [0, 1], Extrapolate.CLAMP);
    return { opacity };
  });
  
  const titleStyle = useAnimatedStyle(() => {
     const opacity = interpolate(scrollY.value, [80, 120], [0, 1], Extrapolate.CLAMP);
     return { opacity };
  });

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => console.log("Logged out") }
    ]);
  };

  const collapsedHeaderHeight = insets.top + 56;

  return (
    <View style={styles.container}>
      
      {/* Fixed Blue Gradient Background */}
      <Animated.View style={[styles.fixedGradient, headerBackgroundStyle]}>
        <LinearGradient
            colors={['#1E40AF', '#3B82F6', '#60A5FA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        />
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingTop: HEADER_HEIGHT - 50, paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
         {/* Profile Card */}
         <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>PG</Text>
              </View>
            </View>
            <Text style={styles.userName}>Pavan Goyal</Text>
            <Text style={styles.userRole}>Senior Vice President</Text>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>ID: 809210</Text>
            </View>
         </View>

         {/* Info Sections */}
         <View style={styles.sectionsContainer}>
           {/* Personal Info */}
           <View style={styles.section}>
             <Text style={styles.sectionHeader}>PERSONAL</Text>
             <View style={styles.card}>
               <InfoRow icon={<User size={16} color="#6366F1" />} label="Full Name" value="Pavan Kumar Goyal" />
               <InfoRow icon={<Phone size={16} color="#6366F1" />} label="Phone" value="+1 (555) 019-2834" />
               <InfoRow icon={<Mail size={16} color="#6366F1" />} label="Email" value="pavan.goyal@company.com" isLast />
             </View>
           </View>

           {/* Work Info */}
           <View style={styles.section}>
             <Text style={styles.sectionHeader}>WORK</Text>
             <View style={styles.card}>
               <InfoRow icon={<Building size={16} color="#8B5CF6" />} label="Department" value="Product & Engineering" />
               <InfoRow icon={<Briefcase size={16} color="#8B5CF6" />} label="Project" value="Strategic Digital Transformation" />
               <InfoRow icon={<MapPin size={16} color="#8B5CF6" />} label="Location" value="San Francisco HQ" isLast />
             </View>
           </View>

           {/* Documents */}
           <View style={styles.section}>
             <Text style={styles.sectionHeader}>DOCUMENTS</Text>
             <View style={styles.card}>
               <MenuItem icon={<FileText size={18} color="#4F46E5" />} label="Payslips" />
               <MenuItem icon={<FileText size={18} color="#4F46E5" />} label="Tax Documents" isLast />
             </View>
           </View>

           {/* Logout */}
           <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
             <LogOut size={18} color={Colors.danger} />
             <Text style={styles.logoutText}>Log Out</Text>
           </TouchableOpacity>
         </View>
      </Animated.ScrollView>

      {/* Sticky Header */}
      <View style={[styles.stickyHeader, { height: collapsedHeaderHeight, paddingTop: insets.top }]}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: '#1E40AF' }, stickyHeaderStyle]} />
          <View style={styles.headerControls}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <ArrowLeft size={22} color="#FFF" strokeWidth={2.5} />
              </TouchableOpacity>
              <Animated.Text style={[styles.stickyTitle, titleStyle]}>My Profile</Animated.Text>
              <View style={{ width: 40 }} />
          </View>
      </View>

    </View>
  );
}

// Reusable Info Row Component
function InfoRow({ icon, label, value, isLast = false }: { icon: React.ReactNode, label: string, value: string, isLast?: boolean }) {
  return (
    <View style={[styles.infoRow, !isLast && styles.borderBottom]}>
      <View style={styles.iconBox}>{icon}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue} numberOfLines={1}>{value}</Text>
      </View>
    </View>
  );
}

// Reusable Menu Item Component
function MenuItem({ icon, label, isLast = false }: { icon: React.ReactNode, label: string, isLast?: boolean }) {
  return (
    <TouchableOpacity style={[styles.menuItem, !isLast && styles.borderBottom]}>
      <View style={styles.menuIconBox}>{icon}</View>
      <Text style={styles.menuText}>{label}</Text>
      <ChevronRight size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  fixedGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 0,
  },
  scrollContent: {
    zIndex: 1,
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarWrapper: {
    marginBottom: 14,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#FFF' 
  },
  userName: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginBottom: 4 
  },
  userRole: { 
    fontSize: 14, 
    color: '#64748B', 
    marginBottom: 12, 
    fontWeight: '500' 
  },
  idBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  idText: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: Colors.primary 
  },

  // Sections
  sectionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: { 
    marginBottom: 20 
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 10,
    letterSpacing: 0.8,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  // Info Row
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  borderBottom: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9' 
  },
  iconBox: {
    width: 32, 
    height: 32, 
    borderRadius: 10, 
    backgroundColor: '#F3F4F6', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12,
  },
  infoContent: { 
    flex: 1 
  },
  infoLabel: { 
    fontSize: 11, 
    color: '#94A3B8', 
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: { 
    fontSize: 14, 
    color: '#1E293B', 
    fontWeight: '600' 
  },

  // Menu Item
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  menuIconBox: { 
    width: 32, 
    height: 32, 
    borderRadius: 10, 
    backgroundColor: '#EEF2FF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  menuText: { 
    flex: 1, 
    fontSize: 14, 
    color: '#1E293B', 
    fontWeight: '600' 
  },

  // Sticky Header
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  stickyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },

  // Logout
  logoutButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8, 
    paddingVertical: 14,
    backgroundColor: '#FEF2F2', 
    borderRadius: 14, 
    marginTop: 4,
    borderWidth: 1, 
    borderColor: '#FECACA',
  },
  logoutText: { 
    color: '#DC2626', 
    fontWeight: '700', 
    fontSize: 14 
  },
});
