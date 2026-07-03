import { TaxiClass } from './hospitalityTypes';

export const taxiFleet: TaxiClass[] = [
  {
    id: 'standard-city-glide',
    name: 'Standard',
    wait: '5 min wait',
    pricePerKm: '\u20ac0.80/km',
    short: 'Simple everyday city ride',
    icon: '\uD83D\uDE95',
  },
  {
    id: 'comfort-soft-transfer',
    name: 'Comfort',
    wait: '8 min wait',
    pricePerKm: '\u20ac1.10/km',
    short: 'Extra space and comfort',
    icon: '\uD83D\uDE99',
  },
  {
    id: 'premium-gold-arrival',
    name: 'Premium',
    wait: '12 min wait',
    pricePerKm: '\u20ac1.70/km',
    short: 'Luxury ride experience',
    icon: '\uD83D\uDE98',
  },
  {
    id: 'van-group-suite',
    name: 'Van',
    wait: '15 min wait',
    pricePerKm: '\u20ac1.40/km',
    short: 'Spacious group transfer option',
    icon: '\uD83D\uDE90',
  },
];
