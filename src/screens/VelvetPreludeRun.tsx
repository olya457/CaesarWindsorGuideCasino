import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { onboardingStories } from '../data/arrivalStories';
import { PrimaryGoldButton } from '../components/grandSalonKit';
import { palette, radius, spacing } from '../theme/nocturneTokens';

export function VelvetPreludeRun({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const story = onboardingStories[index];
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 760;
  const isLast = index === onboardingStories.length - 1;

  const next = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setIndex(value => value + 1);
  };

  return (
    <ImageBackground source={story.image} style={styles.root} resizeMode="cover">
      <View style={styles.shade} />
      <Pressable
        onPress={onComplete}
        style={[styles.skip, { top: insets.top + 12 + spacing.androidTopGap }]}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <View style={[styles.content, { paddingBottom: insets.bottom + spacing.navBottomGap + 6 }]}>
        <View style={[styles.copyPanel, compact && styles.copyPanelCompact]}>
          <View style={styles.indicatorRow}>
            {onboardingStories.map((item, dotIndex) => (
              <View key={item.id} style={[styles.dot, dotIndex === index && styles.dotActive]} />
            ))}
          </View>
          <Text style={[styles.title, compact && styles.titleCompact]}>{story.title}</Text>
          <Text style={styles.subtitle}>{story.subtitle}</Text>
          <PrimaryGoldButton title={isLast ? 'Enter App' : 'Next'} onPress={next} style={styles.nextButton} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.graphite,
  },
  shade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(7,20,38,0.42)',
  },
  skip: {
    position: 'absolute',
    right: 22,
    zIndex: 2,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(11,13,18,0.56)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.18)',
  },
  skipText: {
    color: palette.textSecondary,
    fontSize: 14,
    fontWeight: '800',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  copyPanel: {
    padding: 22,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(11,13,18,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.14)',
  },
  copyPanelCompact: {
    padding: 18,
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(201,209,227,0.38)',
  },
  dotActive: {
    width: 26,
    backgroundColor: palette.primaryGold,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 27,
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 12,
    color: palette.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  nextButton: {
    marginTop: 22,
  },
});
