import React from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { arrivalArt } from '../assets/grandImageRegistry';
import { PremiumDarkBackground } from '../components/grandSalonKit';
import { TabKey } from '../data/hospitalityTypes';
import { palette, radius, shadow, spacing } from '../theme/nocturneTokens';

const destinations: {
  key: TabKey;
  eyebrow: string;
  title: string;
  copy: string;
  icon: string;
  wide?: boolean;
}[] = [
  {
    key: 'Home',
    eyebrow: 'YOUR STAY',
    title: 'Guest\nDesk',
    copy: 'Reservation, daily picks and concierge',
    icon: '⌂',
    wide: true,
  },
  {
    key: 'Menu',
    eyebrow: 'TASTE',
    title: 'Dining',
    copy: 'Order from the signature kitchen',
    icon: '✦',
  },
  {
    key: 'Events',
    eyebrow: 'DISCOVER',
    title: 'Events',
    copy: 'A curated calendar of experiences',
    icon: '◇',
  },
  {
    key: 'Room',
    eyebrow: 'SET THE MOOD',
    title: 'Room',
    copy: 'Climate, lighting and personal scenes',
    icon: '◐',
  },
  {
    key: 'Taxi',
    eyebrow: 'MOVE',
    title: 'Transfer',
    copy: 'Book a ride now or for later',
    icon: '↗',
  },
];

export function ConciergeMenu({ onOpen }: { onOpen: (destination: TabKey) => void }) {
  const insets = useSafeAreaInsets();

  return (
    <PremiumDarkBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + 12 + spacing.androidTopGap,
            paddingBottom: insets.bottom + 28 + spacing.androidBottomGap,
          },
        ]}
      >
        <View style={styles.topLine}>
          <View>
            <Text style={styles.brand}>CAESAR WINDSOR</Text>
            <Text style={styles.place}>Private guest guide</Text>
          </View>
          <View style={styles.roomPill}>
            <Text style={styles.roomLabel}>ROOM</Text>
            <Text style={styles.roomNumber}>1808</Text>
          </View>
        </View>

        <ImageBackground
          source={arrivalArt.guestPortal}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroShade} />
          <View style={styles.heroRule} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>GOOD EVENING</Text>
            <Text style={styles.heroTitle}>Your stay,{'\n'}beautifully arranged.</Text>
            <Text style={styles.heroSubtitle}>Choose a destination below. Every service is one touch away.</Text>
          </View>
        </ImageBackground>

        <View style={styles.sectionLine}>
          <Text style={styles.sectionNumber}>01</Text>
          <Text style={styles.sectionTitle}>WHERE WOULD YOU LIKE TO GO?</Text>
        </View>

        <View style={styles.grid}>
          {destinations.map((item, index) => (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityLabel={`Open ${item.title.replace('\n', ' ')}`}
              onPress={() => onOpen(item.key)}
              style={({ pressed }) => [
                styles.destination,
                item.wide && styles.destinationWide,
                index % 3 === 0 && styles.destinationWarm,
                pressed && styles.destinationPressed,
              ]}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardEyebrow}>{item.eyebrow}</Text>
                <Text style={styles.cardIcon}>{item.icon}</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCopy}>{item.copy}</Text>
              </View>
              <View style={styles.arrowLine}>
                <View style={styles.line} />
                <Text style={styles.arrow}>→</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </PremiumDarkBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.pageX,
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brand: {
    color: palette.champagneGold,
    fontSize: 12,
    letterSpacing: 2.4,
    fontWeight: '900',
  },
  place: {
    marginTop: 4,
    color: palette.mutedText,
    fontSize: 12,
  },
  roomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 13,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.2)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  roomLabel: {
    color: palette.mutedText,
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '900',
  },
  roomNumber: {
    color: palette.textPrimary,
    fontSize: 13,
    fontWeight: '900',
  },
  hero: {
    height: 320,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderRadius: radius.xl,
    ...shadow.card,
  },
  heroImage: {
    borderRadius: radius.xl,
  },
  heroShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(7,12,22,0.47)',
  },
  heroRule: {
    position: 'absolute',
    left: 22,
    top: 24,
    width: 44,
    height: 2,
    backgroundColor: palette.primaryGold,
  },
  heroCopy: {
    padding: 24,
  },
  heroKicker: {
    color: palette.softGold,
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '900',
  },
  heroTitle: {
    marginTop: 10,
    color: palette.textPrimary,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 10,
    maxWidth: 300,
    color: palette.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  sectionLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionNumber: {
    color: palette.primaryGold,
    fontSize: 11,
    fontWeight: '900',
  },
  sectionTitle: {
    color: palette.mutedText,
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  destination: {
    width: '48%',
    minHeight: 202,
    padding: 17,
    borderRadius: radius.lg,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(18,44,85,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(164,191,230,0.13)',
  },
  destinationWide: {
    width: '100%',
    minHeight: 188,
  },
  destinationWarm: {
    backgroundColor: 'rgba(59,43,22,0.64)',
    borderColor: 'rgba(245,201,107,0.16)',
  },
  destinationPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.985 }],
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardEyebrow: {
    color: palette.softGold,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  cardIcon: {
    color: palette.champagneGold,
    fontSize: 24,
    fontWeight: '300',
  },
  cardTitle: {
    color: palette.textPrimary,
    fontSize: 25,
    lineHeight: 28,
    fontWeight: '900',
  },
  cardCopy: {
    marginTop: 7,
    color: palette.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  arrowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,229,163,0.18)',
  },
  arrow: {
    color: palette.champagneGold,
    fontSize: 19,
  },
});
