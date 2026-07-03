import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  EventCard,
  EventDetailView,
  PremiumDarkBackground,
} from '../components/grandSalonKit';
import { occasionById, occasionItems } from '../data/occasionLedger';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { palette, spacing } from '../theme/nocturneTokens';

export function OccasionGallery({
  focusedEventId,
  onFocusConsumed,
}: {
  focusedEventId?: string | null;
  onFocusConsumed?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [planned, setPlanned] = useVaultState<string[]>(vaultKeys.plannedEvents, []);

  useEffect(() => {
    if (focusedEventId && occasionById(focusedEventId)) {
      setDetailId(focusedEventId);
      onFocusConsumed?.();
    }
  }, [focusedEventId, onFocusConsumed]);

  const selectedEvent = useMemo(() => (detailId ? occasionById(detailId) : undefined), [detailId]);

  const addPlan = (id: string) => {
    setPlanned(current => (current.includes(id) ? current : [...current, id]));
  };

  if (selectedEvent) {
    return (
      <PremiumDarkBackground>
        <View
          style={[
            styles.detailWrap,
            {
              paddingTop: insets.top + 14 + spacing.androidTopGap,
              paddingHorizontal: spacing.pageX,
            },
          ]}
        >
          <EventDetailView
            event={selectedEvent}
            planned={planned.includes(selectedEvent.id)}
            onPlan={() => addPlan(selectedEvent.id)}
            onBack={() => setDetailId(null)}
          />
        </View>
      </PremiumDarkBackground>
    );
  }

  return (
    <PremiumDarkBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + 14 + spacing.androidTopGap,
            paddingBottom: insets.bottom + 142 + spacing.navBottomGap + spacing.androidBottomGap,
          },
        ]}
      >
        <View>
          <Text style={styles.kicker}>Curated Calendar</Text>
          <Text style={styles.title}>Daily Events</Text>
          <Text style={styles.subtitle}>Twelve refined experiences around the complex.</Text>
        </View>
        <View style={styles.list}>
          {occasionItems.map(event => (
            <EventCard key={event.id} event={event} onPress={() => setDetailId(event.id)} />
          ))}
        </View>
      </ScrollView>
    </PremiumDarkBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.pageX,
    gap: 18,
  },
  detailWrap: {
    flex: 1,
  },
  kicker: {
    color: palette.softGold,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 8,
    color: palette.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    gap: 14,
  },
});
