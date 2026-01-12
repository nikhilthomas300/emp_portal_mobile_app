import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SectionHeader from './SectionHeader';

// Import SVG icons
import FlexIcon from '@/assets/images/widgets/Flex.svg';
import MyAssetsIcon from '@/assets/images/widgets/MyAssets.svg';
import MyAttendanceIcon from '@/assets/images/widgets/MyAttendance.svg';
import MyProfileIcon from '@/assets/images/widgets/MyProfile.svg';
import SalaryIcon from '@/assets/images/widgets/Salary.svg';

// Widget colors - consistently themed
const widgetColors: Record<string, string> = {
  'Attendance': '#0066FF',
  'Assets': '#8B5CF6',
  'Letters': '#F59E0B',
  'Flex': '#00B4D8',
  'Profile': '#00C48C',
  'Salary': '#FF4757',
};

// 8 widgets to show the 4-column layout properly
const widgets = [
  { id: 1, title: 'Attendance', Icon: MyAttendanceIcon },
  { id: 2, title: 'Assets', Icon: MyAssetsIcon },
  { id: 3, title: 'Letters', FallbackIcon: FileText },
  { id: 4, title: 'Flex', Icon: FlexIcon },
  { id: 5, title: 'Profile', Icon: MyProfileIcon },
  { id: 6, title: 'Salary', Icon: SalaryIcon },
];

export default function MeSection() {
  const router = useRouter();

  const renderIcon = (widget: any) => {
    const color = widgetColors[widget.title] || Colors.primary;
    
    if (widget.FallbackIcon) {
      const FallbackComponent = widget.FallbackIcon;
      // Slightly smaller icon size for 4-column layout
      return <FallbackComponent size={24} color={color} strokeWidth={2} />;
    }
    if (widget.Icon) {
      const SvgIcon = widget.Icon;
      return <SvgIcon width={32} height={32} />;
    }
    return null;
  };

  const getIconBgColor = (title: string) => {
    const color = widgetColors[title] || Colors.primary;
    return color + '15'; // 15 = ~8% opacity
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="My Widgets" 
        showSeeAll
        onSeeAll={() => router.push('/widgets')}
      />
      
      <View style={styles.cardContainer}>
        <View style={styles.gridContainer}>
          {widgets.map((widget) => (
            <TouchableOpacity 
              key={widget.id} 
              style={styles.widgetItem} 
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: getIconBgColor(widget.title) }]}>
                {renderIcon(widget)}
              </View>
              <Text style={styles.widgetTitle} numberOfLines={1}>{widget.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  cardContainer: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 8,
    // Premium shadow
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  widgetItem: {
    width: '25%', // Force 4 items per row
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 56, // Optimized size
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  widgetTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
    letterSpacing: -0.2,
  },
});
