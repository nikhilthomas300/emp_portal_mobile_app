import { SearchContent } from '@/components/SearchModal';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F9', paddingTop: insets.top }}>
      <SearchContent 
        onClose={() => router.replace('/(tabs)')} 
        style={{ marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, flex: 1 }}
      />
    </View>
  );
}
