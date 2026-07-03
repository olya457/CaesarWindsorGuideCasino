import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ConfirmationModal,
  PremiumDarkBackground,
  PremiumGlowCard,
  PrimaryGoldButton,
  SectionHeader,
  TaxiBookingModeSelector,
  TaxiCategoryCard,
} from '../components/grandSalonKit';
import { taxiFleet } from '../data/taxiFleet';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { palette, spacing } from '../theme/nocturneTokens';
import { nextScheduleText } from '../utils/daySignature';

export function TransferConcierge() {
  const insets = useSafeAreaInsets();
  const [selectedTaxi, setSelectedTaxi] = useVaultState(vaultKeys.taxiCategory, taxiFleet[0].id);
  const [mode, setMode] = useVaultState<'ASAP' | 'Schedule'>(vaultKeys.taxiMode, 'ASAP');
  const [schedule, setSchedule] = useVaultState(vaultKeys.taxiSchedule, nextScheduleText());
  const [modal, setModal] = useState(false);
  const activeTaxi = taxiFleet.find(taxi => taxi.id === selectedTaxi) ?? taxiFleet[0];

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
          <Text style={styles.kicker}>Transfer Desk</Text>
          <Text style={styles.title}>Taxi Booking</Text>
          <Text style={styles.subtitle}>Choose the right ride for a smooth city transfer.</Text>
        </View>

        <View style={styles.list}>
          {taxiFleet.map(taxi => (
            <TaxiCategoryCard
              key={taxi.id}
              taxi={taxi}
              selected={taxi.id === selectedTaxi}
              onSelect={() => setSelectedTaxi(taxi.id)}
            />
          ))}
        </View>

        <PremiumGlowCard>
          <SectionHeader title="Booking Options" action={activeTaxi.name} />
          <TaxiBookingModeSelector selected={mode} onSelect={setMode} />
          {mode === 'Schedule' ? (
            <View style={styles.scheduleWrap}>
              <Text style={styles.inputLabel}>Scheduled date and time</Text>
              <TextInput
                value={schedule}
                onChangeText={setSchedule}
                placeholder="YYYY-MM-DD HH:MM"
                placeholderTextColor={palette.mutedText}
                style={styles.scheduleInput}
              />
            </View>
          ) : (
            <Text style={styles.asapText}>A concierge transfer request will be sent for the next available car.</Text>
          )}
        </PremiumGlowCard>

        <PrimaryGoldButton title="Book Taxi" onPress={() => setModal(true)} />
      </ScrollView>

      <ConfirmationModal
        visible={modal}
        title="Taxi Requested"
        message="Your taxi request has been sent."
        onClose={() => setModal(false)}
      />
    </PremiumDarkBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.pageX,
    gap: 16,
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
  scheduleWrap: {
    marginTop: 16,
  },
  inputLabel: {
    color: palette.mutedText,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
  },
  scheduleInput: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.graphite,
    color: palette.textPrimary,
    paddingHorizontal: 14,
    fontWeight: '800',
  },
  asapText: {
    marginTop: 16,
    color: palette.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
