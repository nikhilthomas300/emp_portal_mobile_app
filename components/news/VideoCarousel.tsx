import * as Haptics from 'expo-haptics';
import { Play, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.75;
const CARD_SPACING = 12;

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  youtubeId: string;
}

// 5 Dummy YouTube videos
const VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Mphasis Q3 2024 Earnings Highlights',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    duration: '15:42',
    channel: 'Mphasis Official',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Digital Transformation Journey',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg',
    duration: '8:24',
    channel: 'Tech Insights',
    youtubeId: 'jNQXAC9IVRw',
  },
  {
    id: '3',
    title: 'Employee Wellness Guide',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
    duration: '12:30',
    channel: 'HR Updates',
    youtubeId: '9bZkp7q19f0',
  },
  {
    id: '4',
    title: 'Cloud Migration Best Practices',
    thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
    duration: '20:15',
    channel: 'Cloud Academy',
    youtubeId: 'kJQP7kiw5Fk',
  },
  {
    id: '5',
    title: 'Building High Performance Teams',
    thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/hqdefault.jpg',
    duration: '25:00',
    channel: 'Leadership Series',
    youtubeId: 'fJ9rUzIMcZQ',
  },
];

export default function VideoCarousel() {
  const insets = useSafeAreaInsets();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleVideoPress = (video: VideoItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedVideo(video);
    setIsPlayerVisible(true);
  };

  const closePlayer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsPlayerVisible(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  // YouTube embed HTML for better compatibility
  const getYouTubeHTML = (videoId: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; background: #000; overflow: hidden; }
          .container { position: relative; width: 100%; height: 100%; }
          iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&showinfo=0&controls=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </body>
    </html>
  `;

  const renderVideoCard = (item: VideoItem, index: number) => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.9}
        onPress={() => handleVideoPress(item)}
        style={[
          styles.videoCard,
          index === 0 && { marginLeft: 16 },
          index === VIDEOS.length - 1 && { marginRight: 16 },
        ]}
      >
        {/* Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          
          {/* Play Button Overlay */}
          <View style={styles.playOverlay}>
            <View style={styles.playButton}>
              <Play size={20} color="#FFFFFF" fill="#FFFFFF" strokeWidth={0} />
            </View>
          </View>

          {/* Duration Badge */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.channelName}>{item.channel}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Featured Videos</Text>
        <Text style={styles.sectionSubtitle}>Latest updates and insights</Text>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContent}
      >
        {VIDEOS.map((video, index) => renderVideoCard(video, index))}
      </ScrollView>

      {/* Video Player Modal */}
      <Modal
        visible={isPlayerVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closePlayer}
        statusBarTranslucent
      >
        <View style={styles.playerModal}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={closePlayer} activeOpacity={1} />
          
          <View style={[styles.playerContainer, { paddingTop: insets.top + 16 }]}>
            {/* Close Button */}
            <TouchableOpacity onPress={closePlayer} style={styles.closeButton} activeOpacity={0.8}>
              <X size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>

            {/* Video Title */}
            {selectedVideo && (
              <Text style={styles.playerTitle} numberOfLines={2}>
                {selectedVideo.title}
              </Text>
            )}

            {/* YouTube Player */}
            {selectedVideo && (
              <View style={styles.webViewContainer}>
                <WebView
                  source={{ html: getYouTubeHTML(selectedVideo.youtubeId) }}
                  style={styles.webView}
                  allowsFullscreenVideo
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction={false}
                  javaScriptEnabled
                  domStorageEnabled
                  startInLoadingState
                  originWhitelist={['*']}
                  mixedContentMode="compatibility"
                  androidLayerType={Platform.OS === 'android' ? 'hardware' : undefined}
                />
              </View>
            )}

            {/* Channel info */}
            {selectedVideo && (
              <Text style={styles.channelInfo}>{selectedVideo.channel}</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  videoCard: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    position: 'relative',
    backgroundColor: '#1E293B',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(37, 99, 235, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 20,
    marginBottom: 4,
  },
  channelName: {
    fontSize: 12,
    color: '#64748B',
  },
  // Player Modal Styles
  playerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  playerContainer: {
    paddingHorizontal: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  webViewContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  webView: {
    flex: 1,
    backgroundColor: '#000',
  },
  channelInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 12,
    paddingHorizontal: 4,
  },
});
