import { Platform } from 'react-native';

export const palette = {
  graphite: '#0B0D12',
  deepGraphite: '#12151C',
  graphiteCard: '#191D27',
  elevatedCard: '#232938',
  primaryGold: '#D9A441',
  softGold: '#F5C96B',
  champagneGold: '#FFE5A3',
  darkNavy: '#071426',
  deepBlue: '#0B2C55',
  royalBlue: '#123B73',
  textPrimary: '#FFFFFF',
  textSecondary: '#C9D1E3',
  mutedText: '#8D96AA',
  divider: '#2B3448',
  success: '#34C77B',
  warning: '#F2B84B',
  alert: '#E5484D',
};

export const spacing = {
  pageX: 20,
  card: 18,
  navBottomGap: Platform.OS === 'ios' ? 20 : 30,
  androidTopGap: Platform.OS === 'android' ? 30 : 0,
  androidBottomGap: Platform.OS === 'android' ? 30 : 0,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
};

export const shadow = {
  gold: {
    shadowColor: palette.primaryGold,
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 9 },
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.32,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },
};
