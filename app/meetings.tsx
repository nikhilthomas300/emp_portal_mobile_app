import Colors from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Clock, MapPin, MoreHorizontal, User, Video } from 'lucide-react-native';
import React from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const meetingsData = [
  { 
    id: '1', 
    title: 'Q3 Strategic Planning', 
    time: '10:00 AM', 
    duration: '30m',
    host: 'Sarah Wilson',
    startsIn: '10 min',
    status: 'soon',
    joinable: true,
    type: 'video',
    participants: [
      'https://i.pravatar.cc/100?img=1',
      'https://i.pravatar.cc/100?img=2',
      'https://i.pravatar.cc/100?img=3',
    ],
  },
  { 
    id: '2', 
    title: 'Design Review: Mobile App V2', 
    time: '11:00 AM', 
    duration: '1h',
    host: 'Alex Chen',
    startsIn: '1h 10m',
    status: 'upcoming',
    joinable: true,
    type: 'video',
    participants: ['https://i.pravatar.cc/100?img=4', 'https://i.pravatar.cc/100?img=5'],
  },
  {
    id: '5',
    title: 'Client Feedback Session',
    time: '11:00 AM', 
    duration: '30m',
    host: 'Emma Watson',
    startsIn: '1h 10m',
    status: 'upcoming',
    joinable: true,
    type: 'video',
    participants: ['https://i.pravatar.cc/100?img=12'],
  },
  { 
    id: '3', 
    title: '1:1 with Manager', 
    time: '02:00 PM', 
    duration: '30m',
    host: 'Mike Ross',
    startsIn: '4h 10m',
    status: 'upcoming',
    joinable: false,
    type: 'in-person',
    location: 'Conf Room A',
    participants: ['https://i.pravatar.cc/100?img=8'],
  },
  { 
    id: '4', 
    title: 'Sprint Retrospective', 
    time: '04:30 PM', 
    duration: '45m',
    host: 'Scrum Master',
    startsIn: '6h 40m',
    status: 'upcoming',
    joinable: true,
    type: 'video',
    participants: ['https://i.pravatar.cc/100?img=15', 'https://i.pravatar.cc/100?img=16', 'https://i.pravatar.cc/100?img=17'], 
  },
];

export default function MeetingsPage() {
  const router = useRouter();

  // Group meetings by time and extract period (AM/PM)
  const groupedMeetings = meetingsData.reduce((acc, meeting) => {
    const timeParts = meeting.time.split(' ');
    const time = timeParts[0];
    const period = timeParts[1];
    
    // Check if group exists
    const existingGroup = acc.find(g => g.displayTime === meeting.time);
    
    if (existingGroup) {
      existingGroup.meetings.push(meeting);
    } else {
      acc.push({ 
        displayTime: meeting.time,
        timeOnly: time,
        period: period,
        meetings: [meeting] 
      });
    }
    return acc;
  }, [] as { displayTime: string, timeOnly: string, period: string, meetings: typeof meetingsData }[]);

  const renderGroup = ({ item, index }: { item: typeof groupedMeetings[0], index: number }) => {
    const isLastGroup = index === groupedMeetings.length - 1;
    
    return (
      <View style={styles.groupContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.timeText}>{item.timeOnly}</Text>
          <Text style={styles.periodText}>{item.period}</Text>
          
          <View style={styles.timelineContainer}>
            <View style={styles.timelineNode} />
            {!isLastGroup && <View style={styles.timelineLine} />}
          </View>
        </View>

        <View style={styles.cardsContainer}>
          {item.meetings.map((meeting, mIndex) => (
            <TouchableOpacity 
              key={meeting.id} 
              style={[
                styles.card, 
                mIndex < item.meetings.length - 1 && styles.cardGap
              ]} 
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={styles.headerTop}>
                  <View style={styles.badgesRow}>
                    {meeting.status === 'soon' && (
                      <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveText}>Starting Soon</Text>
                      </View>
                    )}
                    <View style={[styles.typeBadge, meeting.type !== 'video' && styles.locationBadge]}>
                      {meeting.type === 'video' ? (
                        <>
                          <Video size={10} color={Colors.primary} />
                          <Text style={styles.typeText}>Video</Text>
                        </>
                      ) : (
                        <>
                          <MapPin size={10} color={Colors.secondaryText} />
                          <Text style={[styles.typeText, { color: Colors.secondaryText }]}>{meeting.location || 'In Person'}</Text>
                        </>
                      )}
                    </View>
                  </View>
                  <Text style={styles.startsInText}>{meeting.startsIn}</Text>
                </View>
                
                <Text style={styles.title} numberOfLines={2}>{meeting.title}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.participantsContainer}>
                  {meeting.participants?.map((_, idx) => (
                    <View 
                      key={idx} 
                      style={[styles.avatar, styles.avatarPlaceholder, { marginLeft: idx > 0 ? -8 : 0, zIndex: 10 - idx }]} 
                    >
                      <User size={12} color="#64748B" />
                    </View>
                  ))}
                  <View style={styles.divider} />
                  <Text style={styles.hostText}>by {meeting.host.split(' ')[0]}</Text>
                </View>

                {meeting.joinable ? (
                  <TouchableOpacity style={styles.joinBtn}>
                    <Text style={styles.joinText}>Join</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.durationBadge}>
                    <Clock size={10} color={Colors.secondaryText} />
                    <Text style={styles.durationText}>{meeting.duration}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backBtn}
        >
          <ArrowLeft size={22} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Meetings</Text>
        <TouchableOpacity style={styles.backBtn}>
          <MoreHorizontal size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={groupedMeetings}
        renderItem={renderGroup}
        keyExtractor={item => item.displayTime}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
           <View style={styles.listHeader}>
             <View style={styles.headerBlock}>
               <View style={styles.dateBadge}>
                 <Text style={styles.dateNum}>15</Text>
                 <Text style={styles.dateMonth}>OCT</Text>
               </View>
               <View>
                 <Text style={styles.dayTitle}>Wednesday</Text>
                 <Text style={styles.meetingCount}>{meetingsData.length} Meetings Today</Text>
               </View>
             </View>
           </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  listHeader: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  headerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dateNum: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 28,
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
    marginTop: -2,
  },
  dayTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  meetingCount: {
    fontSize: 14,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  groupContainer: {
    flexDirection: 'row',
  },
  leftContainer: {
    width: 50,
    alignItems: 'center',
    paddingTop: 2,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 0,
  },
  periodText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
    marginBottom: 8,
  },
  timelineContainer: {
    alignItems: 'center',
    flex: 1,
  },
  timelineNode: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: Colors.primary,
    zIndex: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  cardsContainer: {
    flex: 1,
    paddingBottom: 24,
    paddingLeft: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12, // Compact padding
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardGap: {
    marginBottom: 10,
  },
  cardHeader: {
    marginBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#EF4444',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#EF4444',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  locationBadge: {
    backgroundColor: '#F8FAFC',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.primary,
  },
  startsInText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  avatarPlaceholder: {
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  hostText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  joinBtn: {
    backgroundColor: Colors.text,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  joinText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
});
