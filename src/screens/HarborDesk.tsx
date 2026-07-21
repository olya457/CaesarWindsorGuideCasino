import React, { useEffect } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { arrivalArt } from '../assets/grandImageRegistry';
import {
  ConfirmationModal,
  DailyDishCard,
  EventOfTheDayCard,
  MenuBackButton,
  PremiumDarkBackground,
  PremiumGlowCard,
  QuickActionButton,
  ReservationCard,
  SectionHeader,
} from '../components/grandSalonKit';
import { DailyPick } from '../data/hospitalityTypes';
import { menuItemById, menuItems } from '../data/menuPalace';
import { occasionById, occasionItems } from '../data/occasionLedger';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { palette, radius, spacing } from '../theme/nocturneTokens';
import { stableIndex, todaySignature } from '../utils/daySignature';

export function HarborDesk({
  onViewEvent,
  onBack,
}: {
  onViewEvent: (eventId: string) => void;
  onBack: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 760;
  const [dnd, setDnd] = useVaultState(vaultKeys.dnd, false);
  const [conciergeRequested, setConciergeRequested] = useVaultState(vaultKeys.concierge, false);
  const [dailyDish, setDailyDish, dishReady] = useVaultState<DailyPick | null>(vaultKeys.dailyDish, null);
  const [dailyEvent, setDailyEvent, eventReady] = useVaultState<DailyPick | null>(vaultKeys.dailyEvent, null);
  const [conciergeModal, setConciergeModal] = React.useState(false);
  const today = todaySignature();

  useEffect(() => {
    if (!dishReady) {
      return;
    }
    if (!dailyDish || dailyDish.date !== today || !menuItemById(dailyDish.id)) {
      const item = menuItems[stableIndex(`dish-${today}`, menuItems.length)];
      setDailyDish({ date: today, id: item.id });
    }
  }, [dailyDish, dishReady, setDailyDish, today]);

  useEffect(() => {
    if (!eventReady) {
      return;
    }
    if (!dailyEvent || dailyEvent.date !== today || !occasionById(dailyEvent.id)) {
      const event = occasionItems[stableIndex(`event-${today}`, occasionItems.length)];
      setDailyEvent({ date: today, id: event.id });
    }
  }, [dailyEvent, eventReady, setDailyEvent, today]);

  const dish = menuItemById(dailyDish?.id ?? '') ?? menuItems[0];
  const event = occasionById(dailyEvent?.id ?? '') ?? occasionItems[0];

  const requestConcierge = () => {
    setConciergeRequested(true);
    setConciergeModal(true);
  };

  return (
    <PremiumDarkBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + 14 + spacing.androidTopGap,
            paddingBottom: insets.bottom + 32 + spacing.androidBottomGap,
          },
        ]}
      >
        <MenuBackButton onPress={onBack} />
        <ImageBackground
          source={arrivalArt.guestPortal}
          style={[styles.hero, compact && styles.heroCompact]}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroShade} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Welcome to Your Stay</Text>
            <Text style={styles.heroSubtitle}>Everything you need, right at your fingertips.</Text>
          </View>
        </ImageBackground>

        <ReservationCard />

        <View style={styles.quickRow}>
          <PremiumGlowCard style={styles.dndCard}>
            <Text style={styles.quickTitle}>Do Not Disturb</Text>
            <Text style={styles.quickSubtitle}>{dnd ? 'Privacy mode is active' : 'Room service may visit'}</Text>
            <Switch
              value={dnd}
              onValueChange={setDnd}
              trackColor={{ false: palette.divider, true: palette.royalBlue }}
              thumbColor={dnd ? palette.softGold : palette.mutedText}
            />
          </PremiumGlowCard>
          <QuickActionButton
            title="Emergency Concierge"
            subtitle={conciergeRequested ? 'Request already sent' : 'Urgent staff assistance'}
            active={conciergeRequested}
            onPress={requestConcierge}
          />
        </View>

        <View>
          <SectionHeader title="Dish of the Day" action="15% off" />
          <DailyDishCard item={dish} />
        </View>

        <View>
          <SectionHeader title="Event of the Day" action={today} />
          <EventOfTheDayCard event={event} onPress={() => onViewEvent(event.id)} />
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={conciergeModal}
        title="Concierge Requested"
        message="Concierge has been requested urgently."
        onClose={() => setConciergeModal(false)}
      />
    </PremiumDarkBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.pageX,
    gap: 18,
  },
  hero: {
    height: 270,
    borderRadius: radius.xl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroCompact: {
    height: 222,
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
    backgroundColor: 'rgba(7,20,38,0.34)',
  },
  heroText: {
    padding: 20,
  },
  heroTitle: {
    color: palette.textPrimary,
    fontSize: 32,
    lineHeight: 37,
    fontWeight: '900',
  },
  heroSubtitle: {
    marginTop: 8,
    color: palette.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  quickRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dndCard: {
    flex: 1,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  quickTitle: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  quickSubtitle: {
    color: palette.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
});
