import { ImageSourcePropType } from 'react-native';

export type MenuCategory = 'Breakfast' | 'Main Courses' | 'Desserts' | 'Drinks';

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  price: number;
  ingredients: string;
  preparation: string;
  image: ImageSourcePropType;
};

export type CartEntry = {
  itemId: string;
  quantity: number;
};

export type OccasionItem = {
  id: string;
  name: string;
  hours: string;
  location: string;
  short: string;
  image: ImageSourcePropType;
  paragraphs: string[];
};

export type TaxiClass = {
  id: string;
  name: string;
  wait: string;
  pricePerKm: string;
  short: string;
  icon: string;
};

export type TabKey = 'Home' | 'Menu' | 'Events' | 'Room' | 'Taxi';

export type DailyPick = {
  date: string;
  id: string;
};
