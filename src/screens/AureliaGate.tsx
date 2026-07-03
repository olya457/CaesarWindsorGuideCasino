import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { arrivalArt } from '../assets/grandImageRegistry';
import { palette, radius, shadow } from '../theme/nocturneTokens';

export function AureliaGate({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <ImageBackground source={arrivalArt.loaderFacade} style={styles.root} resizeMode="cover">
      <View style={styles.deepShade} />
      <View style={styles.goldHalo} />
      <View style={styles.blueHalo} />
      <View style={styles.center}>
        <View style={styles.logoCard}>
          <Image source={arrivalArt.laurelEmblem} style={styles.logo} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Caesar Windsor Guide</Text>
        <Text style={styles.subtitle}>Smart Hotel Companion</Text>
        <ActivityIndicator color={palette.softGold} size="small" style={styles.loader} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.graphite,
  },
  deepShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(7,20,38,0.54)',
  },
  goldHalo: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    top: 132,
    alignSelf: 'center',
    backgroundColor: 'rgba(217,164,65,0.18)',
  },
  blueHalo: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    bottom: -80,
    right: -120,
    backgroundColor: 'rgba(18,59,115,0.32)',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 34,
  },
  logoCard: {
    width: 210,
    height: 210,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11,13,18,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.24)',
    ...shadow.gold,
  },
  logo: {
    width: 178,
    height: 178,
  },
  title: {
    marginTop: 28,
    color: palette.textPrimary,
    fontSize: 31,
    lineHeight: 37,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    color: palette.champagneGold,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  loader: {
    marginTop: 30,
  },
});
