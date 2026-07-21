import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabKey } from '../data/hospitalityTypes';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { AureliaGate } from '../screens/AureliaGate';
import { CulinaryConsole } from '../screens/CulinaryConsole';
import { ConciergeMenu } from '../screens/ConciergeMenu';
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
  const [activeTab, setActiveTab] = useState<TabKey | 'Directory'>('Directory');
  const [focusedEventId, setFocusedEventId] = useState<string | null>(null);

  const openEvent = (eventId: string) => {
    setFocusedEventId(eventId);
    setActiveTab('Events');
  };

  return (
    <View style={styles.root}>
      {activeTab === 'Directory' ? <ConciergeMenu onOpen={setActiveTab} /> : null}
      {activeTab === 'Home' ? (
        <HarborDesk onViewEvent={openEvent} onBack={() => setActiveTab('Directory')} />
      ) : null}
      {activeTab === 'Menu' ? <CulinaryConsole onBack={() => setActiveTab('Directory')} /> : null}
      {activeTab === 'Events' ? (
        <OccasionGallery
          focusedEventId={focusedEventId}
          onFocusConsumed={() => setFocusedEventId(null)}
          onBack={() => setActiveTab('Directory')}
        />
      ) : null}
      {activeTab === 'Room' ? <SuiteAtmosphere onBack={() => setActiveTab('Directory')} /> : null}
      {activeTab === 'Taxi' ? <TransferConcierge onBack={() => setActiveTab('Directory')} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
