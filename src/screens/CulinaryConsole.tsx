import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CartSheet,
  ConfirmationModal,
  MenuCategorySwitcher,
  MenuItemCard,
  PremiumDarkBackground,
} from '../components/grandSalonKit';
import { CartEntry, MenuCategory, MenuItem } from '../data/hospitalityTypes';
import { menuCategories, menuItems } from '../data/menuPalace';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { palette, radius, spacing } from '../theme/nocturneTokens';

export function CulinaryConsole() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useVaultState<MenuCategory>(vaultKeys.menuCategory, 'Breakfast');
  const [cart, setCart] = useVaultState<CartEntry[]>(vaultKeys.cart, []);
  const [note, setNote] = useVaultState(vaultKeys.cartNote, '');
  const [cartOpen, setCartOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const filtered = useMemo(
    () => menuItems.filter(item => item.category === selectedCategory),
    [selectedCategory],
  );

  const count = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  const addItem = (item: MenuItem, quantity: number) => {
    setCart(current => {
      const existing = current.find(entry => entry.itemId === item.id);
      if (existing) {
        return current.map(entry =>
          entry.itemId === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        );
      }
      return [...current, { itemId: item.id, quantity }];
    });
  };

  const increase = (id: string) => {
    setCart(current =>
      current.map(entry =>
        entry.itemId === id ? { ...entry, quantity: entry.quantity + 1 } : entry,
      ),
    );
  };

  const decrease = (id: string) => {
    setCart(current =>
      current.flatMap(entry => {
        if (entry.itemId !== id) {
          return [entry];
        }
        const next = entry.quantity - 1;
        return next <= 0 ? [] : [{ ...entry, quantity: next }];
      }),
    );
  };

  const remove = (id: string) => {
    setCart(current => current.filter(entry => entry.itemId !== id));
  };

  const submit = () => {
    setCart([]);
    setCartOpen(false);
    setConfirmation(true);
  };

  return (
    <PremiumDarkBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: insets.top + 14 + spacing.androidTopGap,
            paddingBottom: insets.bottom + 142 + spacing.navBottomGap + spacing.androidBottomGap,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.kicker}>Signature Restaurant</Text>
            <Text style={styles.title}>Dining Made Effortless</Text>
          </View>
          <Pressable onPress={() => setCartOpen(true)} style={styles.cartButton}>
            <Text style={styles.cartIcon}>🛎️</Text>
            <View style={styles.cartCountPill}>
              <Text style={styles.cartCountText}>{count}</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.stickyBar}>
          <MenuCategorySwitcher
            categories={menuCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>

        <View style={styles.menuList}>
          {filtered.map(item => (
            <MenuItemCard key={item.id} item={item} onAdd={addItem} />
          ))}
        </View>
      </ScrollView>

      <CartSheet
        visible={cartOpen}
        cart={cart}
        note={note}
        onNoteChange={setNote}
        onIncrease={increase}
        onDecrease={decrease}
        onRemove={remove}
        onClose={() => setCartOpen(false)}
        onSubmit={submit}
      />

      <ConfirmationModal
        visible={confirmation}
        title="Order Submitted"
        message="Your order has been sent to the restaurant."
        onClose={() => setConfirmation(false)}
      />
    </PremiumDarkBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: spacing.pageX,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  headerText: {
    flex: 1,
  },
  kicker: {
    color: palette.softGold,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  title: {
    color: palette.textPrimary,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900',
  },
  cartButton: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18,44,85,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.2)',
    gap: 2,
  },
  cartIcon: {
    fontSize: 22,
  },
  cartCountPill: {
    minWidth: 30,
    height: 22,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'rgba(217,164,65,0.14)',
    borderWidth: 1,
    borderColor: palette.primaryGold,
  },
  cartCountText: {
    color: palette.champagneGold,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  stickyBar: {
    marginHorizontal: -spacing.pageX,
    paddingHorizontal: spacing.pageX,
    paddingVertical: 10,
    backgroundColor: palette.graphite,
  },
  menuList: {
    gap: 14,
  },
});
