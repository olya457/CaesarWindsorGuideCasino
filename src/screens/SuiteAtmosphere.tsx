import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ClimateModeSelector,
  ClimateTemperatureControl,
  ConfirmationModal,
  FanSpeedSelector,
  LightingBrightnessControl,
  LightingModeSelector,
  MenuBackButton,
  PremiumDarkBackground,
  PremiumGlowCard,
  PrimaryGoldButton,
  RoomModeSwitcher,
  RoomTimerPicker,
  SectionHeader,
} from '../components/grandSalonKit';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { palette, spacing } from '../theme/nocturneTokens';

export function SuiteAtmosphere({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useVaultState<'Climate' | 'Lighting'>(vaultKeys.chamberTab, 'Climate');
  const [desiredTemp, setDesiredTemp] = useVaultState(vaultKeys.climateTemp, 22);
  const [climateMode, setClimateMode] = useVaultState(vaultKeys.climateMode, 'Auto');
  const [fanSpeed, setFanSpeed] = useVaultState(vaultKeys.fanSpeed, 'Medium');
  const [climateOn, setClimateOn] = useVaultState(vaultKeys.climateOn, '');
  const [climateOff, setClimateOff] = useVaultState(vaultKeys.climateOff, '');
  const [lightPower, setLightPower] = useVaultState(vaultKeys.lightPower, true);
  const [lightBrightness, setLightBrightness] = useVaultState(vaultKeys.lightBrightness, 60);
  const [lightMode, setLightMode] = useVaultState(vaultKeys.lightMode, 'Relax');
  const [lightOn, setLightOn] = useVaultState(vaultKeys.lightOn, '');
  const [lightOff, setLightOff] = useVaultState(vaultKeys.lightOff, '');
  const [modal, setModal] = useState<'Climate' | 'Lighting' | null>(null);

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
        <View>
          <Text style={styles.kicker}>Suite Atmosphere</Text>
          <Text style={styles.title}>Room Controls</Text>
          <Text style={styles.subtitle}>Adjust comfort without leaving your bed.</Text>
        </View>

        <RoomModeSwitcher selected={tab} onSelect={setTab} />

        {tab === 'Climate' ? (
          <>
            <ClimateTemperatureControl
              current={21}
              desired={desiredTemp}
              onDecrease={() => setDesiredTemp(value => Math.max(16, value - 1))}
              onIncrease={() => setDesiredTemp(value => Math.min(30, value + 1))}
            />
            <PremiumGlowCard>
              <SectionHeader title="Climate Mode" />
              <ClimateModeSelector selected={climateMode} onSelect={setClimateMode} />
            </PremiumGlowCard>
            <PremiumGlowCard>
              <SectionHeader title="Fan Speed" />
              <FanSpeedSelector selected={fanSpeed} onSelect={setFanSpeed} />
            </PremiumGlowCard>
            <PremiumGlowCard>
              <SectionHeader title="Timers" />
              <View style={styles.timerRow}>
                <RoomTimerPicker label="Turn On" value={climateOn} onChange={setClimateOn} />
                <RoomTimerPicker label="Turn Off" value={climateOff} onChange={setClimateOff} />
              </View>
            </PremiumGlowCard>
            <PrimaryGoldButton title="Apply Settings" onPress={() => setModal('Climate')} />
          </>
        ) : (
          <>
            <LightingBrightnessControl
              power={lightPower}
              brightness={lightBrightness}
              onPower={setLightPower}
              onChange={setLightBrightness}
            />
            <PremiumGlowCard>
              <SectionHeader title="Lighting Mode" />
              <LightingModeSelector selected={lightMode} onSelect={setLightMode} />
            </PremiumGlowCard>
            <PremiumGlowCard>
              <SectionHeader title="Timers" />
              <View style={styles.timerRow}>
                <RoomTimerPicker label="Turn On" value={lightOn} onChange={setLightOn} />
                <RoomTimerPicker label="Turn Off" value={lightOff} onChange={setLightOff} />
              </View>
            </PremiumGlowCard>
            <PrimaryGoldButton title="Apply Settings" onPress={() => setModal('Lighting')} />
          </>
        )}
      </ScrollView>

      <ConfirmationModal
        visible={modal !== null}
        title={`${modal ?? 'Room'} Updated`}
        message={
          modal === 'Lighting'
            ? 'Lighting settings have been updated.'
            : 'Climate settings have been updated.'
        }
        onClose={() => setModal(null)}
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
  timerRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
