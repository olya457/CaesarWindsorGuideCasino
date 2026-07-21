import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { onboardingStories } from '../data/arrivalStories';
import { PrimaryGoldButton } from '../components/grandSalonKit';
import { palette, spacing } from '../theme/nocturneTokens';

export function VelvetPreludeRun({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const story = onboardingStories[index];
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 760;
  const isLast = index === onboardingStories.length - 1;
  const imageFirst = index % 2 === 0;

  const next = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setIndex(value => value + 1);
  };

  const illustration = (
    <View style={[styles.imageFrame, compact && styles.imageFrameCompact]}>
      <Image source={story.image} style={styles.image} resizeMode="cover" />
      <View style={styles.imageShade} />
      <View style={styles.imageNumberWrap}>
        <Text style={styles.imageNumber}>{`${index + 1}`.padStart(2, '0')}</Text>
      </View>
      <Text style={styles.imageCaption}>THE WINDSOR EDIT</Text>
    </View>
  );

  const copy = (
    <View style={[styles.copyPanel, compact && styles.copyPanelCompact]}>
      <View style={styles.indicatorRow}>
        {onboardingStories.map((item, dotIndex) => (
          <View
            key={item.id}
            style={[styles.dot, dotIndex === index && styles.dotActive]}
          />
        ))}
      </View>
      <Text style={styles.kicker}>YOUR PRIVATE GUIDE</Text>
      <Text style={[styles.title, compact && styles.titleCompact]}>{story.title}</Text>
      <Text style={styles.subtitle}>{story.subtitle}</Text>
      <View style={styles.actions}>
        {index > 0 ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setIndex(value => value - 1)}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <PrimaryGoldButton
          title={isLast ? 'Enter Guide' : 'Continue →'}
          onPress={next}
          style={styles.nextButton}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top + 10 + spacing.androidTopGap,
          paddingBottom: insets.bottom + 14 + spacing.androidBottomGap,
        },
      ]}
    >
      <View style={styles.ambientGold} />
      <View style={styles.ambientBlue} />
      <Pressable
        onPress={onComplete}
        style={styles.skip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <View style={styles.content}>
        {imageFirst ? illustration : copy}
        {imageFirst ? copy : illustration}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.graphite,
    paddingHorizontal: 20,
  },
  ambientGold: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -100,
    right: -120,
    backgroundColor: 'rgba(217,164,65,0.12)',
  },
  ambientBlue: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    bottom: -120,
    left: -140,
    backgroundColor: 'rgba(18,59,115,0.25)',
  },
  skip: {
    alignSelf: 'flex-end',
    zIndex: 3,
    borderRadius: 999,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
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
    justifyContent: 'center',
    gap: 15,
    paddingTop: 10,
  },
  imageFrame: {
    height: '47%',
    minHeight: 280,
    maxHeight: 410,
    overflow: 'hidden',
    borderRadius: 34,
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.16)',
  },
  imageFrameCompact: {
    minHeight: 230,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(5,10,18,0.2)',
  },
  imageNumberWrap: {
    position: 'absolute',
    top: 18,
    left: 18,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11,13,18,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.28)',
  },
  imageNumber: {
    color: palette.champagneGold,
    fontSize: 16,
    fontWeight: '900',
  },
  imageCaption: {
    position: 'absolute',
    right: 18,
    bottom: 17,
    color: palette.textPrimary,
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '900',
  },
  copyPanel: {
    minHeight: 270,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  copyPanelCompact: {
    minHeight: 225,
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(201,209,227,0.38)',
  },
  dotActive: {
    width: 30,
    backgroundColor: palette.primaryGold,
  },
  kicker: {
    color: palette.softGold,
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '900',
  },
  title: {
    marginTop: 9,
    color: palette.textPrimary,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 27,
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 10,
    color: palette.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  backText: {
    color: palette.textSecondary,
    fontSize: 14,
    fontWeight: '800',
  },
  nextButton: {
    minWidth: 152,
  },
});
