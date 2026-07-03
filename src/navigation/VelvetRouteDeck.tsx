import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBar } from '../components/grandSalonKit';
import { TabKey } from '../data/hospitalityTypes';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { AureliaGate } from '../screens/AureliaGate';
import { CulinaryConsole } from '../screens/CulinaryConsole';
import { HarborDesk } from '../screens/HarborDesk';
import { OccasionGallery } from '../screens/OccasionGallery';
import { SuiteAtmosphere } from '../screens/SuiteAtmosphere';
import { TransferConcierge } from '../screens/TransferConcierge';
import { VelvetPreludeRun } from '../screens/VelvetPreludeRun';

type RoutePhase = 'loader' | 'onboarding' | 'main';

export function VelvetRouteDeck() {
  const [onboarded, setOnboarded, onboardReady] = useVaultState(vaultKeys.onboarded, false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [phase, setPhase] = useState<RoutePhase>('loader');

  useEffect(() => {
    if (loaderDone && onboardReady) {
      setPhase(onboarded ? 'main' : 'onboarding');
    }
  }, [loaderDone, onboardReady, onboarded]);

  const completeOnboarding = useCallback(() => {
    setOnboarded(true);
    setPhase('main');
  }, [setOnboarded]);

  if (phase === 'loader') {
    return <AureliaGate onFinish={() => setLoaderDone(true)} />;
  }

  if (phase === 'onboarding') {
    return <VelvetPreludeRun onComplete={completeOnboarding} />;
  }

  return <GrandTabCabinet />;
}

function GrandTabCabinet() {
  const [activeTab, setActiveTab] = useState<TabKey>('Home');
  const [focusedEventId, setFocusedEventId] = useState<string | null>(null);

  const openEvent = (eventId: string) => {
    setFocusedEventId(eventId);
    setActiveTab('Events');
  };

  return (
    <View style={styles.root}>
      {activeTab === 'Home' ? <HarborDesk onViewEvent={openEvent} /> : null}
      {activeTab === 'Menu' ? <CulinaryConsole /> : null}
      {activeTab === 'Events' ? (
        <OccasionGallery
          focusedEventId={focusedEventId}
          onFocusConsumed={() => setFocusedEventId(null)}
        />
      ) : null}
      {activeTab === 'Room' ? <SuiteAtmosphere /> : null}
      {activeTab === 'Taxi' ? <TransferConcierge /> : null}
      <BottomTabBar active={activeTab} onChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
