import React, { ReactNode, useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { arrivalArt } from '../assets/grandImageRegistry';
import { CartEntry, MenuCategory, MenuItem, OccasionItem, TabKey, TaxiClass } from '../data/hospitalityTypes';
import { menuItemById } from '../data/menuPalace';
import { useVaultState, vaultKeys } from '../storage/cellarVault';
import { palette, radius, shadow, spacing } from '../theme/nocturneTokens';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const timerChoiceOptions = [
  'Not set',
  ...Array.from({ length: 48 }, (_, index) => {
    const hours = `${Math.floor(index / 2)}`.padStart(2, '0');
    const minutes = index % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
  }),
];

export function PremiumDarkBackground({ children, style }: ScreenProps) {
  return (
    <View style={[styles.background, style]}>
      <View style={[styles.glow, styles.goldGlow]} />
      <View style={[styles.glow, styles.blueGlow]} />
      {children}
    </View>
  );
}

export function PremiumGlowCard({ children, style }: ScreenProps) {
  return <View style={[styles.glowCard, style]}>{children}</View>;
}

function ButtonSurface({ title, onPress, disabled, style, kind }: ButtonProps & { kind: 'gold' | 'blue' | 'graphite' }) {
  const surface =
    kind === 'gold' ? styles.goldButton : kind === 'blue' ? styles.blueButton : styles.graphiteButton;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        surface,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.buttonText, kind === 'graphite' && styles.graphiteButtonText]} numberOfLines={1} adjustsFontSizeToFit>
        {title}
      </Text>
    </Pressable>
  );
}

export function PrimaryGoldButton(props: ButtonProps) {
  return <ButtonSurface {...props} kind="gold" />;
}

export function SecondaryBlueButton(props: ButtonProps) {
  return <ButtonSurface {...props} kind="blue" />;
}

export function GraphiteButton(props: ButtonProps) {
  return <ButtonSurface {...props} kind="graphite" />;
}

export function BadgeLabel({ label, tone = 'gold' }: { label: string; tone?: 'gold' | 'green' | 'blue' }) {
  const background =
    tone === 'green' ? 'rgba(52,199,123,0.16)' : tone === 'blue' ? 'rgba(18,59,115,0.78)' : 'rgba(217,164,65,0.18)';
  const border = tone === 'green' ? palette.success : tone === 'blue' ? palette.royalBlue : palette.primaryGold;
  const color = tone === 'green' ? palette.success : tone === 'blue' ? palette.textSecondary : palette.champagneGold;
  return (
    <View style={[styles.badge, { backgroundColor: background, borderColor: border }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

export function MenuBackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to guest menu"
      onPress={onPress}
      style={({ pressed }) => [styles.menuBack, pressed && styles.pressed]}
    >
      <Text style={styles.menuBackArrow}>←</Text>
      <View>
        <Text style={styles.menuBackLabel}>GUEST DIRECTORY</Text>
        <Text style={styles.menuBackTitle}>Back to menu</Text>
      </View>
    </Pressable>
  );
}

export function BottomTabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  const insets = useSafeAreaInsets();
  const tabs: { key: TabKey; icon: string }[] = [
    { key: 'Home', icon: '🏛️' },
    { key: 'Menu', icon: '🍽️' },
    { key: 'Events', icon: '✨' },
    { key: 'Room', icon: '💡' },
    { key: 'Taxi', icon: '🚕' },
  ];
  return (
    <View style={[styles.tabBarWrap, { bottom: insets.bottom + spacing.navBottomGap }]}>
      {tabs.map(tab => {
        const isActive = active === tab.key;
        return (
          <Pressable key={tab.key} onPress={() => onChange(tab.key)} style={styles.tabItem}>
            <View style={[styles.tabIconCircle, isActive && styles.tabIconCircleActive]}>
              <Text style={[styles.tabEmoji, isActive && styles.tabEmojiActive]}>{tab.icon}</Text>
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.key}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ReservationCard() {
  const dateOptions = Array.from({ length: 21 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return {
      value: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString('en-CA', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
  });
  const roomOptions = ['1204', '1412', '1608', '1808', '2015', '2210', '2406'];
  const guestOptions = ['1 guest', '2 guests', '3 guests', '4 guests'];
  const defaultCheckIn = dateOptions[0].value;
  const defaultCheckOut = dateOptions[1].value;
  const [room, setRoom] = useVaultState(vaultKeys.reservationRoom, '1808');
  const [checkIn, setCheckIn] = useVaultState(vaultKeys.reservationCheckIn, defaultCheckIn);
  const [checkOut, setCheckOut] = useVaultState(vaultKeys.reservationCheckOut, defaultCheckOut);
  const [guests, setGuests] = useVaultState(vaultKeys.reservationGuests, '2 guests');
  const [confirmed, setConfirmed] = useVaultState(vaultKeys.reservationConfirmed, false);
  const [openField, setOpenField] = useState<'room' | 'checkIn' | 'checkOut' | 'guests' | null>(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const labelForDate = (value: string) =>
    dateOptions.find(option => option.value === value)?.label ?? value;

  const chooseCheckIn = (value: string) => {
    setCheckIn(value);
    if (checkOut <= value) {
      const nextDate = dateOptions.find(option => option.value > value);
      setCheckOut(nextDate?.value ?? value);
    }
    setConfirmed(false);
    setOpenField(null);
  };

  const chooseCheckOut = (value: string) => {
    setCheckOut(value);
    setConfirmed(false);
    setOpenField(null);
  };

  const saveReservation = () => {
    setConfirmed(true);
    setConfirmationVisible(true);
  };

  const bookingCode = `CWG-${room}-${checkIn.slice(5).replace('-', '')}`;

  return (
    <>
      <PremiumGlowCard>
        <SectionHeader title="Your Reservation" action={confirmed ? 'Confirmed' : 'Select your stay'} />
        <Text style={styles.reservationIntro}>
          Choose an available room and stay dates. Your selection is saved on this device.
        </Text>

        <ReservationSelect
          label="Room number"
          value={`Room ${room}`}
          options={roomOptions.map(value => ({ value, label: `Room ${value}` }))}
          open={openField === 'room'}
          onToggle={() => setOpenField(current => (current === 'room' ? null : 'room'))}
          onSelect={value => {
            setRoom(value);
            setConfirmed(false);
            setOpenField(null);
          }}
        />
        <View style={styles.reservationDateRow}>
          <ReservationSelect
            label="Check-in"
            value={labelForDate(checkIn)}
            options={dateOptions}
            open={openField === 'checkIn'}
            onToggle={() => setOpenField(current => (current === 'checkIn' ? null : 'checkIn'))}
            onSelect={chooseCheckIn}
            style={styles.reservationHalf}
          />
          <ReservationSelect
            label="Check-out"
            value={labelForDate(checkOut)}
            options={dateOptions.filter(option => option.value > checkIn)}
            open={openField === 'checkOut'}
            onToggle={() => setOpenField(current => (current === 'checkOut' ? null : 'checkOut'))}
            onSelect={chooseCheckOut}
            style={styles.reservationHalf}
          />
        </View>
        <ReservationSelect
          label="Guests"
          value={guests}
          options={guestOptions.map(value => ({ value, label: value }))}
          open={openField === 'guests'}
          onToggle={() => setOpenField(current => (current === 'guests' ? null : 'guests'))}
          onSelect={value => {
            setGuests(value);
            setConfirmed(false);
            setOpenField(null);
          }}
        />

        {confirmed ? (
          <View style={styles.bookingCodeRow}>
            <Text style={styles.bookingCodeLabel}>BOOKING CODE</Text>
            <Text style={styles.bookingCodeValue}>{bookingCode}</Text>
          </View>
        ) : null}
        <PrimaryGoldButton
          title={confirmed ? 'Update Reservation' : 'Confirm Reservation'}
          onPress={saveReservation}
          style={styles.reservationButton}
        />
      </PremiumGlowCard>
      <ConfirmationModal
        visible={confirmationVisible}
        title="Reservation Confirmed"
        message={`Room ${room} is selected from ${labelForDate(checkIn)} to ${labelForDate(checkOut)} for ${guests}.`}
        onClose={() => setConfirmationVisible(false)}
      />
    </>
  );
}

function ReservationSelect({
  label,
  value,
  options,
  open,
  onToggle,
  onSelect,
  style,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.reservationField, style]}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${label}`}
        onPress={onToggle}
        style={[styles.reservationSelect, open && styles.reservationSelectOpen]}
      >
        <Text style={styles.reservationSelectValue} numberOfLines={1}>{value}</Text>
        <Text style={styles.reservationChevron}>{open ? '↑' : '↓'}</Text>
      </Pressable>
      {open ? (
        <ScrollView nestedScrollEnabled style={styles.reservationDropdown}>
          {options.map(option => (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={[styles.reservationOption, option.label === value && styles.reservationOptionActive]}
            >
              <Text style={styles.reservationOptionText}>{option.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

export function QuickActionButton({
  title,
  subtitle,
  onPress,
  active,
}: {
  title: string;
  subtitle: string;
  onPress?: () => void;
  active?: boolean;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.quickAction, active && styles.quickActionActive]}>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

export function DailyDishCard({ item }: { item: MenuItem }) {
  const discounted = Math.round(item.price * 0.85 * 100) / 100;
  return (
    <PremiumGlowCard>
      <ImageBackground source={item.image} style={styles.dailyImage} imageStyle={styles.dailyImageRadius}>
        <View style={styles.imageShade} />
        <View style={styles.dailyBadgeWrap}>
          <BadgeLabel label="-15% Today" />
        </View>
      </ImageBackground>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCopy} numberOfLines={2}>{item.ingredients}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.oldPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.newPrice}>${discounted.toFixed(2)}</Text>
        </View>
      </View>
    </PremiumGlowCard>
  );
}

export function EventOfTheDayCard({ event, onPress }: { event: OccasionItem; onPress: () => void }) {
  return (
    <PremiumGlowCard>
      <View style={styles.eventDayRow}>
        <Image source={event.image} style={styles.eventDayImage} />
        <View style={styles.eventDayText}>
          <BadgeLabel label="Today" tone="blue" />
          <Text style={styles.cardTitle}>{event.name}</Text>
          <Text style={styles.cardCopy}>{event.hours} · {event.location}</Text>
          <Text style={styles.cardCopy}>{event.short}</Text>
        </View>
      </View>
      <PrimaryGoldButton title="View Event" onPress={onPress} style={styles.compactButton} />
    </PremiumGlowCard>
  );
}

export function MenuCategorySwitcher({
  categories,
  selected,
  onSelect,
}: {
  categories: MenuCategory[];
  selected: MenuCategory;
  onSelect: (category: MenuCategory) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
      {categories.map(category => {
        const active = selected === category;
        return (
          <Pressable key={category} onPress={() => onSelect(category)} style={[styles.categoryPill, active && styles.categoryPillActive]}>
            <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export function QuantitySelector({
  value,
  onIncrease,
  onDecrease,
  min = 1,
}: {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
}) {
  return (
    <View style={styles.quantityWrap}>
      <Pressable onPress={onDecrease} disabled={value <= min} style={[styles.qtyButton, value <= min && styles.qtyDisabled]}>
        <Text style={styles.qtyText}>-</Text>
      </Pressable>
      <Text style={styles.qtyValue}>{value}</Text>
      <Pressable onPress={onIncrease} style={styles.qtyButton}>
        <Text style={styles.qtyText}>+</Text>
      </Pressable>
    </View>
  );
}

export function MenuItemCard({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  return (
    <PremiumGlowCard style={styles.menuCard}>
      <Image source={item.image} style={styles.menuImage} />
      <View style={styles.menuInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardCopy} numberOfLines={2}>{item.ingredients}</Text>
        <View style={styles.menuMetaRow}>
          <Text style={styles.goldMeta}>${item.price.toFixed(2)}</Text>
          <Text style={styles.mutedMeta}>{item.preparation}</Text>
        </View>
        <View style={styles.menuActionRow}>
          <QuantitySelector
            value={quantity}
            onDecrease={() => setQuantity(value => Math.max(1, value - 1))}
            onIncrease={() => setQuantity(value => value + 1)}
          />
          <PrimaryGoldButton title="Add to Cart" onPress={() => onAdd(item, quantity)} style={styles.addButton} />
        </View>
      </View>
    </PremiumGlowCard>
  );
}

export function CartItemRow({
  entry,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  entry: CartEntry;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) {
  const item = menuItemById(entry.itemId);
  if (!item) {
    return null;
  }
  return (
    <View style={styles.cartRow}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartInfo}>
        <Text style={styles.cartName}>{item.name}</Text>
        <Text style={styles.cartMeta}>${item.price.toFixed(2)} each</Text>
        <Pressable onPress={onRemove}>
          <Text style={styles.removeText}>Remove</Text>
        </Pressable>
      </View>
      <QuantitySelector value={entry.quantity} onIncrease={onIncrease} onDecrease={onDecrease} min={0} />
    </View>
  );
}

export function CartSheet({
  visible,
  cart,
  note,
  onNoteChange,
  onIncrease,
  onDecrease,
  onRemove,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  cart: CartEntry[];
  note: string;
  onNoteChange: (text: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const subtotal = cart.reduce((sum, entry) => {
    const item = menuItemById(entry.itemId);
    return item ? sum + item.price * entry.quantity : sum;
  }, 0);
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.sheetBackdrop}>
        <Pressable style={styles.sheetShade} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <SectionHeader title="Your Order" action={`${cart.length} items`} />
          <ScrollView style={styles.cartScroll} contentContainerStyle={styles.cartContent}>
            {cart.length === 0 ? (
              <Text style={styles.emptyText}>Your cart is waiting for a favorite dish.</Text>
            ) : (
              cart.map(entry => (
                <CartItemRow
                  key={entry.itemId}
                  entry={entry}
                  onIncrease={() => onIncrease(entry.itemId)}
                  onDecrease={() => onDecrease(entry.itemId)}
                  onRemove={() => onRemove(entry.itemId)}
                />
              ))
            )}
            <TextInput
              value={note}
              onChangeText={onNoteChange}
              placeholder="Special requests"
              placeholderTextColor={palette.mutedText}
              multiline
              style={styles.requestInput}
            />
          </ScrollView>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <PrimaryGoldButton title="Submit Order" onPress={onSubmit} disabled={cart.length === 0} />
          <GraphiteButton title="Close" onPress={onClose} style={styles.sheetClose} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export function EventCard({ event, onPress }: { event: OccasionItem; onPress: () => void }) {
  return (
    <PremiumGlowCard style={styles.eventCard}>
      <Image source={event.image} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.cardTitle}>{event.name}</Text>
        <Text style={styles.cardCopy}>{event.hours}</Text>
        <Text style={styles.cardCopy}>{event.location}</Text>
        <Text style={styles.eventShort}>{event.short}</Text>
        <SecondaryBlueButton title="See More" onPress={onPress} style={styles.compactButton} />
      </View>
    </PremiumGlowCard>
  );
}

export function EventDetailView({
  event,
  planned,
  onPlan,
  onBack,
}: {
  event: OccasionItem;
  planned: boolean;
  onPlan: () => void;
  onBack: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
      <ImageBackground source={event.image} style={styles.detailHero} imageStyle={styles.detailHeroRadius}>
        <View style={styles.detailShade} />
        <GraphiteButton title="Back" onPress={onBack} style={styles.backButton} />
        <View style={styles.detailHeroText}>
          <BadgeLabel label={event.hours} />
          <Text style={styles.detailTitle}>{event.name}</Text>
          <Text style={styles.detailMeta}>{event.location}</Text>
        </View>
      </ImageBackground>
      <PremiumGlowCard>
        {event.paragraphs.map(paragraph => (
          <Text key={paragraph.slice(0, 20)} style={styles.detailParagraph}>{paragraph}</Text>
        ))}
        <PrimaryGoldButton title={planned ? 'Added to My Plan' : 'Add to My Plan'} onPress={onPlan} />
      </PremiumGlowCard>
    </ScrollView>
  );
}

export function RoomModeSwitcher({
  selected,
  onSelect,
}: {
  selected: 'Climate' | 'Lighting';
  onSelect: (mode: 'Climate' | 'Lighting') => void;
}) {
  return (
    <View style={styles.roomSwitch}>
      {(['Climate', 'Lighting'] as const).map(mode => {
        const active = mode === selected;
        return (
          <Pressable key={mode} onPress={() => onSelect(mode)} style={[styles.roomSwitchItem, active && styles.roomSwitchItemActive]}>
            <Text style={[styles.roomSwitchText, active && styles.roomSwitchTextActive]}>{mode}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ClimateTemperatureControl({
  current,
  desired,
  onDecrease,
  onIncrease,
}: {
  current: number;
  desired: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  const currentLabel = `${current}${String.fromCharCode(176)}C`;
  const desiredLabel = `${desired}${String.fromCharCode(176)}C`;

  return (
    <PremiumGlowCard>
      <View style={styles.tempHeader}>
        <View style={styles.currentTempBox}>
          <Text style={styles.metaLabel}>Current Room</Text>
          <Text style={styles.tempCurrent} numberOfLines={1} adjustsFontSizeToFit>
            {currentLabel}
          </Text>
        </View>
        <View style={styles.desiredBox}>
          <Text style={styles.metaLabel}>Desired</Text>
          <Text style={styles.tempDesired} numberOfLines={1} adjustsFontSizeToFit>
            {desiredLabel}
          </Text>
        </View>
      </View>
      <View style={styles.tempControls}>
        <GraphiteButton title="-" onPress={onDecrease} style={styles.tempButton} />
        <PrimaryGoldButton title="+" onPress={onIncrease} style={styles.tempButton} />
      </View>
    </PremiumGlowCard>
  );
}

function OptionGrid<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: T[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <View style={styles.optionGrid}>
      {options.map(option => {
        const active = option === selected;
        return (
          <Pressable key={option} onPress={() => onSelect(option)} style={[styles.optionChip, active && styles.optionChipActive]}>
            <Text style={[styles.optionText, active && styles.optionTextActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ClimateModeSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return <OptionGrid options={['Cool', 'Heat', 'Fan', 'Auto']} selected={selected} onSelect={onSelect} />;
}

export function FanSpeedSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return <OptionGrid options={['Low', 'Medium', 'High', 'Auto']} selected={selected} onSelect={onSelect} />;
}

export function LightingBrightnessControl({
  power,
  brightness,
  onPower,
  onChange,
}: {
  power: boolean;
  brightness: number;
  onPower: (value: boolean) => void;
  onChange: (value: number) => void;
}) {
  const marks = [20, 40, 60, 80, 100];
  return (
    <PremiumGlowCard>
      <View style={styles.lightPowerRow}>
        <View>
          <Text style={styles.cardTitle}>Main Lighting</Text>
          <Text style={styles.cardCopy}>{power ? 'Room lights are active' : 'Room lights are off'}</Text>
        </View>
        <Switch
          value={power}
          onValueChange={onPower}
          trackColor={{ false: palette.divider, true: palette.royalBlue }}
          thumbColor={power ? palette.softGold : palette.mutedText}
        />
      </View>
      <Text style={styles.metaLabel}>Brightness {brightness}%</Text>
      <View style={styles.brightnessRow}>
        {marks.map(mark => (
          <Pressable
            key={mark}
            onPress={() => onChange(mark)}
            style={[styles.brightnessDot, brightness >= mark && styles.brightnessDotActive]}
          />
        ))}
      </View>
    </PremiumGlowCard>
  );
}

export function LightingModeSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return <OptionGrid options={['Relax', 'Bright', 'Night', 'Reading', 'Ambient']} selected={selected} onSelect={onSelect} />;
}

export function RoomTimerPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const displayValue = value || 'Not set';

  return (
    <View style={styles.timerField}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Pressable
        onPress={() => setOpen(current => !current)}
        style={[styles.timerSelect, open && styles.timerSelectOpen]}
      >
        <Text
          style={[styles.timerSelectText, !value && styles.timerSelectPlaceholder]}
          numberOfLines={1}
        >
          {displayValue}
        </Text>
        <Text style={styles.timerChevron}>{open ? '^' : 'v'}</Text>
      </Pressable>
      {open ? (
        <View style={styles.timerDropdown}>
          <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
            {timerChoiceOptions.map(option => {
              const resolvedValue = option === 'Not set' ? '' : option;
              const active = resolvedValue === value;
              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    onChange(resolvedValue);
                    setOpen(false);
                  }}
                  style={[styles.timerOption, active && styles.timerOptionActive]}
                >
                  <Text style={[styles.timerOptionText, active && styles.timerOptionTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

export function TaxiCategoryCard({
  taxi,
  selected,
  onSelect,
}: {
  taxi: TaxiClass;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <PremiumGlowCard style={[styles.taxiCard, selected && styles.taxiCardSelected]}>
      <View style={styles.taxiIconWrap}>
        <Image source={arrivalArt.laurelEmblem} style={styles.taxiEmblem} />
        <Text style={styles.taxiIcon}>{taxi.icon}</Text>
      </View>
      <View style={styles.taxiInfo}>
        <Text style={styles.cardTitle}>{taxi.name}</Text>
        <Text style={styles.cardCopy}>{taxi.short}</Text>
        <View style={styles.taxiMetaRow}>
          <BadgeLabel label={taxi.wait} tone="blue" />
          <BadgeLabel label={taxi.pricePerKm} />
        </View>
      </View>
      <SecondaryBlueButton title={selected ? 'Selected' : 'Select'} onPress={onSelect} style={styles.taxiSelect} />
    </PremiumGlowCard>
  );
}

export function TaxiBookingModeSelector({
  selected,
  onSelect,
}: {
  selected: 'ASAP' | 'Schedule';
  onSelect: (value: 'ASAP' | 'Schedule') => void;
}) {
  return (
    <View style={styles.roomSwitch}>
      {(['ASAP', 'Schedule'] as const).map(mode => {
        const active = mode === selected;
        return (
          <Pressable key={mode} onPress={() => onSelect(mode)} style={[styles.roomSwitchItem, active && styles.roomSwitchItemActive]}>
            <Text style={[styles.roomSwitchText, active && styles.roomSwitchTextActive]}>{mode}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ConfirmationModal({
  visible,
  title,
  message,
  onClose,
}: {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.confirmCard}>
          <Image source={arrivalArt.laurelEmblem} style={styles.confirmEmblem} />
          <Text style={styles.confirmTitle}>{title}</Text>
          <Text style={styles.confirmMessage}>{message}</Text>
          <PrimaryGoldButton title="Done" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

export const appShell = StyleSheet.create({
  screen: {
    paddingHorizontal: spacing.pageX,
    paddingTop: 14 + spacing.androidTopGap,
  },
  scroll: {
    paddingHorizontal: spacing.pageX,
    paddingTop: 14 + spacing.androidTopGap,
    paddingBottom: 138 + spacing.androidBottomGap,
    gap: 18,
  },
});

const styles = StyleSheet.create({
  menuBack: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    minHeight: 46,
    paddingHorizontal: 13,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.16)',
  },
  menuBackArrow: {
    color: palette.champagneGold,
    fontSize: 22,
    lineHeight: 24,
  },
  menuBackLabel: {
    color: palette.primaryGold,
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '900',
  },
  menuBackTitle: {
    marginTop: 1,
    color: palette.textPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  background: {
    flex: 1,
    backgroundColor: palette.graphite,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.32,
  },
  goldGlow: {
    top: -80,
    right: -80,
    backgroundColor: 'rgba(217,164,65,0.38)',
  },
  blueGlow: {
    bottom: 90,
    left: -110,
    backgroundColor: 'rgba(18,59,115,0.56)',
  },
  glowCard: {
    borderRadius: radius.lg,
    padding: spacing.card,
    backgroundColor: 'rgba(25,29,39,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.12)',
    ...shadow.card,
  },
  button: {
    minHeight: 50,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  goldButton: {
    backgroundColor: palette.primaryGold,
    borderColor: palette.champagneGold,
    ...shadow.gold,
  },
  blueButton: {
    backgroundColor: palette.deepBlue,
    borderColor: palette.royalBlue,
  },
  graphiteButton: {
    backgroundColor: palette.elevatedCard,
    borderColor: palette.divider,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  buttonText: {
    color: palette.textPrimary,
    fontSize: 15,
    fontWeight: '800',
  },
  graphiteButtonText: {
    color: palette.textSecondary,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  sectionTitle: {
    color: palette.textPrimary,
    fontSize: 21,
    fontWeight: '900',
    flex: 1,
  },
  sectionAction: {
    color: palette.softGold,
    fontSize: 12,
    fontWeight: '800',
  },
  tabBarWrap: {
    position: 'absolute',
    left: 18,
    right: 18,
    minHeight: 74,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 7,
    backgroundColor: 'rgba(18,21,28,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadow.card,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(35,41,56,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(43,52,72,0.9)',
  },
  tabIconCircleActive: {
    backgroundColor: 'rgba(217,164,65,0.22)',
    borderColor: palette.primaryGold,
  },
  tabEmoji: {
    fontSize: 18,
    opacity: 0.64,
  },
  tabEmojiActive: {
    opacity: 1,
  },
  tabLabel: {
    color: palette.mutedText,
    fontSize: 11,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: palette.softGold,
  },
  reservationIntro: {
    marginTop: -5,
    marginBottom: 16,
    color: palette.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  reservationDateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  reservationHalf: {
    flex: 1,
    minWidth: 0,
  },
  reservationField: {
    marginBottom: 13,
  },
  reservationSelect: {
    minHeight: 52,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: 'rgba(11,20,38,0.72)',
    borderWidth: 1,
    borderColor: palette.divider,
  },
  reservationSelectOpen: {
    borderColor: palette.primaryGold,
    backgroundColor: 'rgba(217,164,65,0.1)',
  },
  metaLabel: {
    color: palette.mutedText,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  reservationSelectValue: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: 14,
    fontWeight: '900',
  },
  reservationChevron: {
    color: palette.softGold,
    fontSize: 14,
    fontWeight: '900',
  },
  reservationDropdown: {
    maxHeight: 166,
    marginTop: 7,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.deepGraphite,
  },
  reservationOption: {
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,52,72,0.62)',
  },
  reservationOptionActive: {
    backgroundColor: 'rgba(217,164,65,0.16)',
  },
  reservationOptionText: {
    color: palette.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },
  bookingCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 13,
    borderRadius: radius.md,
    backgroundColor: 'rgba(52,199,123,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(52,199,123,0.28)',
  },
  bookingCodeLabel: {
    color: palette.success,
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: '900',
  },
  bookingCodeValue: {
    color: palette.textPrimary,
    fontSize: 13,
    fontWeight: '900',
  },
  reservationButton: {
    marginTop: 2,
  },
  quickAction: {
    flex: 1,
    minHeight: 92,
    borderRadius: radius.lg,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(18,44,85,0.42)',
    borderWidth: 1,
    borderColor: palette.divider,
  },
  quickActionActive: {
    borderColor: palette.primaryGold,
    backgroundColor: 'rgba(217,164,65,0.14)',
  },
  quickTitle: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '900',
  },
  quickSubtitle: {
    color: palette.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  dailyImage: {
    height: 190,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dailyImageRadius: {
    borderRadius: radius.lg,
  },
  imageShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(7,20,38,0.18)',
  },
  dailyBadgeWrap: {
    padding: 12,
  },
  cardBody: {
    paddingTop: 14,
    gap: 8,
  },
  cardTitle: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  cardCopy: {
    color: palette.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  oldPrice: {
    color: palette.mutedText,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    color: palette.softGold,
    fontSize: 20,
    fontWeight: '900',
  },
  eventDayRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  eventDayImage: {
    width: 112,
    height: 132,
    borderRadius: radius.md,
  },
  eventDayText: {
    flex: 1,
    gap: 7,
  },
  compactButton: {
    minHeight: 44,
  },
  categoryRow: {
    gap: 10,
    paddingRight: 20,
  },
  categoryPill: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: 'rgba(25,29,39,0.86)',
    borderWidth: 1,
    borderColor: palette.divider,
  },
  categoryPillActive: {
    backgroundColor: 'rgba(217,164,65,0.18)',
    borderColor: palette.primaryGold,
  },
  categoryText: {
    color: palette.textSecondary,
    fontWeight: '800',
    fontSize: 13,
  },
  categoryTextActive: {
    color: palette.champagneGold,
  },
  quantityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.elevatedCard,
    borderWidth: 1,
    borderColor: palette.divider,
  },
  qtyDisabled: {
    opacity: 0.38,
  },
  qtyText: {
    color: palette.textPrimary,
    fontSize: 20,
    fontWeight: '900',
  },
  qtyValue: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: '900',
    minWidth: 20,
    textAlign: 'center',
  },
  menuCard: {
    flexDirection: 'row',
    gap: 14,
  },
  menuImage: {
    width: 108,
    height: 132,
    borderRadius: radius.md,
  },
  menuInfo: {
    flex: 1,
    gap: 8,
  },
  menuMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  goldMeta: {
    color: palette.softGold,
    fontSize: 17,
    fontWeight: '900',
  },
  mutedMeta: {
    color: palette.mutedText,
    fontSize: 12,
    fontWeight: '800',
  },
  menuActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  addButton: {
    minHeight: 42,
    flex: 1,
  },
  sheetBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  sheet: {
    maxHeight: '88%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 30 : 24,
    backgroundColor: palette.deepGraphite,
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.14)',
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: palette.divider,
    marginBottom: 18,
  },
  cartScroll: {
    maxHeight: 420,
  },
  cartContent: {
    gap: 14,
    paddingBottom: 12,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.divider,
  },
  cartImage: {
    width: 58,
    height: 58,
    borderRadius: radius.sm,
  },
  cartInfo: {
    flex: 1,
    gap: 3,
  },
  cartName: {
    color: palette.textPrimary,
    fontSize: 14,
    fontWeight: '900',
  },
  cartMeta: {
    color: palette.mutedText,
    fontSize: 12,
  },
  removeText: {
    color: palette.alert,
    fontSize: 12,
    fontWeight: '800',
  },
  requestInput: {
    minHeight: 86,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.graphiteCard,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: palette.textPrimary,
    textAlignVertical: 'top',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: palette.divider,
    paddingTop: 14,
    marginBottom: 14,
  },
  subtotalLabel: {
    color: palette.textSecondary,
    fontSize: 16,
    fontWeight: '800',
  },
  subtotalValue: {
    color: palette.softGold,
    fontSize: 22,
    fontWeight: '900',
  },
  sheetClose: {
    marginTop: 10,
  },
  emptyText: {
    color: palette.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 24,
  },
  eventCard: {
    flexDirection: 'row',
    gap: 14,
  },
  eventImage: {
    width: 112,
    height: 142,
    borderRadius: radius.md,
  },
  eventInfo: {
    flex: 1,
    gap: 6,
  },
  eventShort: {
    color: palette.softGold,
    fontSize: 12,
    fontWeight: '800',
  },
  detailContent: {
    gap: 18,
    paddingBottom: 145 + spacing.androidBottomGap,
  },
  detailHero: {
    minHeight: 360,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  detailHeroRadius: {
    borderRadius: radius.xl,
  },
  detailShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(7,20,38,0.32)',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 14,
    minHeight: 40,
  },
  detailHeroText: {
    padding: 18,
    gap: 10,
  },
  detailTitle: {
    color: palette.textPrimary,
    fontSize: 31,
    lineHeight: 36,
    fontWeight: '900',
  },
  detailMeta: {
    color: palette.textSecondary,
    fontSize: 15,
    fontWeight: '800',
  },
  detailParagraph: {
    color: palette.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  roomSwitch: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    padding: 5,
    backgroundColor: palette.deepGraphite,
    borderWidth: 1,
    borderColor: palette.divider,
  },
  roomSwitchItem: {
    flex: 1,
    minHeight: 42,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomSwitchItemActive: {
    backgroundColor: 'rgba(217,164,65,0.18)',
    borderWidth: 1,
    borderColor: palette.primaryGold,
  },
  roomSwitchText: {
    color: palette.textSecondary,
    fontSize: 14,
    fontWeight: '900',
  },
  roomSwitchTextActive: {
    color: palette.champagneGold,
  },
  tempHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 18,
  },
  currentTempBox: {
    flex: 1,
    minWidth: 0,
  },
  tempCurrent: {
    color: palette.textPrimary,
    fontSize: 38,
    fontWeight: '900',
  },
  desiredBox: {
    width: 118,
    borderRadius: radius.md,
    padding: 12,
    backgroundColor: 'rgba(217,164,65,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(217,164,65,0.34)',
  },
  tempDesired: {
    color: palette.softGold,
    fontSize: 28,
    fontWeight: '900',
  },
  tempControls: {
    flexDirection: 'row',
    gap: 12,
  },
  tempButton: {
    flex: 1,
    minHeight: 48,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionChip: {
    minWidth: '47%',
    minHeight: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.deepGraphite,
    borderWidth: 1,
    borderColor: palette.divider,
  },
  optionChipActive: {
    backgroundColor: 'rgba(217,164,65,0.18)',
    borderColor: palette.primaryGold,
  },
  optionText: {
    color: palette.textSecondary,
    fontSize: 14,
    fontWeight: '800',
  },
  optionTextActive: {
    color: palette.champagneGold,
  },
  lightPowerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center',
    marginBottom: 22,
  },
  brightnessRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  brightnessDot: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    backgroundColor: palette.divider,
  },
  brightnessDotActive: {
    backgroundColor: palette.softGold,
  },
  timerField: {
    flex: 1,
    minWidth: '47%',
  },
  timerSelect: {
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.deepGraphite,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  timerSelectOpen: {
    borderColor: palette.primaryGold,
    backgroundColor: 'rgba(217,164,65,0.1)',
  },
  timerSelectText: {
    color: palette.textPrimary,
    fontSize: 14,
    fontWeight: '900',
    flex: 1,
  },
  timerSelectPlaceholder: {
    color: palette.mutedText,
  },
  timerChevron: {
    color: palette.softGold,
    fontSize: 14,
    fontWeight: '900',
  },
  timerDropdown: {
    marginTop: 8,
    maxHeight: 178,
    borderRadius: radius.md,
    backgroundColor: palette.deepGraphite,
    borderWidth: 1,
    borderColor: palette.divider,
    overflow: 'hidden',
  },
  timerOption: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,52,72,0.62)',
  },
  timerOptionActive: {
    backgroundColor: 'rgba(217,164,65,0.16)',
  },
  timerOptionText: {
    color: palette.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },
  timerOptionTextActive: {
    color: palette.champagneGold,
  },
  taxiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  taxiCardSelected: {
    borderColor: palette.primaryGold,
    backgroundColor: 'rgba(35,41,56,0.96)',
  },
  taxiIconWrap: {
    width: 76,
    height: 76,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7,20,38,0.88)',
    overflow: 'hidden',
  },
  taxiEmblem: {
    position: 'absolute',
    width: 76,
    height: 76,
    opacity: 0.18,
  },
  taxiIcon: {
    fontSize: 32,
  },
  taxiInfo: {
    flex: 1,
    gap: 7,
  },
  taxiMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  taxiSelect: {
    width: 84,
    minHeight: 42,
    paddingHorizontal: 8,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.58)',
    padding: 24,
  },
  confirmCard: {
    width: '100%',
    borderRadius: radius.xl,
    padding: 24,
    backgroundColor: palette.deepGraphite,
    borderWidth: 1,
    borderColor: 'rgba(255,229,163,0.22)',
    alignItems: 'center',
    gap: 14,
    ...shadow.card,
  },
  confirmEmblem: {
    width: 76,
    height: 76,
  },
  confirmTitle: {
    color: palette.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  confirmMessage: {
    color: palette.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 6,
  },
});
