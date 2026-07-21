import AsyncStorage from '@react-native-async-storage/async-storage';
import { SetStateAction, useCallback, useEffect, useState } from 'react';

export const vaultKeys = {
  onboarded: 'aurelian.onboarded.v1',
  dnd: 'aurelian.dnd.v1',
  concierge: 'aurelian.concierge.v1',
  reservationRoom: 'aurelian.reservation.room.v1',
  reservationCheckIn: 'aurelian.reservation.checkIn.v1',
  reservationCheckOut: 'aurelian.reservation.checkOut.v1',
  reservationGuests: 'aurelian.reservation.guests.v1',
  reservationConfirmed: 'aurelian.reservation.confirmed.v1',
  dailyDish: 'aurelian.dailyDish.v1',
  dailyEvent: 'aurelian.dailyEvent.v1',
  menuCategory: 'aurelian.menuCategory.v1',
  cart: 'aurelian.cart.v1',
  cartNote: 'aurelian.cartNote.v1',
  plannedEvents: 'aurelian.plannedEvents.v1',
  chamberTab: 'aurelian.chamberTab.v1',
  climateTemp: 'aurelian.climateTemp.v1',
  climateMode: 'aurelian.climateMode.v1',
  fanSpeed: 'aurelian.fanSpeed.v1',
  climateOn: 'aurelian.climateOn.v1',
  climateOff: 'aurelian.climateOff.v1',
  lightPower: 'aurelian.lightPower.v1',
  lightBrightness: 'aurelian.lightBrightness.v1',
  lightMode: 'aurelian.lightMode.v1',
  lightOn: 'aurelian.lightOn.v1',
  lightOff: 'aurelian.lightOff.v1',
  taxiCategory: 'aurelian.taxiCategory.v1',
  taxiMode: 'aurelian.taxiMode.v1',
  taxiSchedule: 'aurelian.taxiSchedule.v1',
};

export function useVaultState<T>(
  key: string,
  fallback: T,
): [T, (next: SetStateAction<T>) => void, boolean] {
  const [value, setValue] = useState<T>(fallback);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(key)
      .then(raw => {
        if (!active || raw == null) {
          return;
        }
        setValue(JSON.parse(raw) as T);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) {
          setReady(true);
        }
      });
    return () => {
      active = false;
    };
  }, [key]);

  const update = useCallback(
    (next: SetStateAction<T>) => {
      setValue(current => {
        const resolved =
          typeof next === 'function' ? (next as (value: T) => T)(current) : next;
        AsyncStorage.setItem(key, JSON.stringify(resolved)).catch(() => undefined);
        return resolved;
      });
    },
    [key],
  );

  return [value, update, ready];
}
