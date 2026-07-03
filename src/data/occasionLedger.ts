import { occasionArt } from '../assets/grandImageRegistry';
import { OccasionItem } from './hospitalityTypes';

export const occasionItems: OccasionItem[] = [
  {
    id: 'sunset-lounge-evening',
    name: 'Sunset Lounge Evening',
    hours: '6:30 PM - 9:00 PM',
    location: 'Rooftop Lounge',
    short: 'Cocktails with sunset skyline views',
    image: occasionArt.rooftopAmberEvening,
    paragraphs: [
      'Enjoy a relaxing evening overlooking the city skyline as the sun sets. Comfortable lounge seating, handcrafted cocktails, and soft ambient lighting create the perfect atmosphere. Local musicians perform a carefully selected acoustic set throughout the evening. Guests can unwind, socialize, or simply enjoy the breathtaking scenery.',
      'The menu features signature drinks inspired by Canadian ingredients alongside gourmet appetizers. Friendly staff provide attentive service while maintaining a calm and elegant environment. Whether you are celebrating or relaxing after a busy day, this event offers a memorable experience. Reservations are recommended for premium seating.',
    ],
  },
  {
    id: 'chef-signature-dinner',
    name: 'Chef\'s Signature Dinner',
    hours: '7:00 PM - 9:30 PM',
    location: 'Signature Restaurant',
    short: 'Exclusive seasonal tasting menu',
    image: occasionArt.chefSignatureSalon,
    paragraphs: [
      'Experience a specially curated multi-course dinner prepared by our executive chef using fresh seasonal ingredients. Every course showcases modern Canadian cuisine with elegant presentation and balanced flavors. Guests receive detailed introductions to each dish throughout the evening. The intimate setting creates a refined dining experience.',
      'Wine pairings are available to complement every course. Locally sourced ingredients highlight the region\'s culinary traditions while introducing contemporary techniques. The menu changes regularly to reflect seasonal availability. Advance reservations are highly recommended.',
    ],
  },
  {
    id: 'live-jazz-night',
    name: 'Live Jazz Night',
    hours: '8:00 PM - 10:00 PM',
    location: 'Lobby Lounge',
    short: 'Smooth jazz and crafted cocktails',
    image: occasionArt.jazzBlueLounge,
    paragraphs: [
      'Enjoy an evening of live jazz performed by talented local musicians in our elegant lobby lounge. Relax with handcrafted cocktails while listening to timeless classics and contemporary arrangements. Comfortable seating and warm lighting create an inviting atmosphere. The performance is suitable for guests of all ages.',
      'Premium wines and light appetizers are available throughout the evening. Friendly service and exceptional acoustics enhance the overall experience. Whether you are a jazz enthusiast or simply looking for a relaxing night, this event offers the perfect setting. No reservation is required.',
    ],
  },
  {
    id: 'canadian-wine-tasting',
    name: 'Canadian Wine Tasting',
    hours: '5:30 PM - 7:00 PM',
    location: 'Wine Cellar',
    short: 'Premium regional wine selection',
    image: occasionArt.cellarVintageSelection,
    paragraphs: [
      'Discover award winning Canadian wines during a guided tasting hosted by our sommelier. Learn about different wine regions, production methods, and ideal food pairings. Each tasting includes carefully selected cheeses and artisan crackers. Guests are encouraged to ask questions throughout the session.',
      'The relaxed atmosphere makes this experience enjoyable for both beginners and wine enthusiasts. Limited seating ensures personalized attention for every guest. Exclusive bottle discounts are available after the event. Reservations are required.',
    ],
  },
  {
    id: 'morning-yoga-session',
    name: 'Morning Yoga Session',
    hours: '8:00 AM - 9:00 AM',
    location: 'Wellness Studio',
    short: 'Gentle morning relaxation class',
    image: occasionArt.wellnessMorningStretch,
    paragraphs: [
      'Start your morning with a guided yoga session designed to improve flexibility and reduce stress. Professional instructors lead participants through movements suitable for all skill levels. Large windows provide natural light and calming views. Yoga mats and refreshments are provided.',
      'The class focuses on breathing techniques, balance, and gentle stretching. Guests leave feeling refreshed and energized for the day ahead. Comfortable athletic clothing is recommended. Advance registration is appreciated.',
    ],
  },
  {
    id: 'poolside-dj-session',
    name: 'Poolside DJ Session',
    hours: '2:00 PM - 5:00 PM',
    location: 'Outdoor Pool Deck',
    short: 'Relaxing poolside music atmosphere',
    image: occasionArt.poolsideRhythmAfternoon,
    paragraphs: [
      'Spend the afternoon enjoying upbeat music performed by our resident DJ beside the outdoor pool. Comfortable loungers, refreshing beverages, and attentive service create the perfect vacation atmosphere. Guests can swim, relax, or socialize throughout the event. Family friendly playlists keep the mood enjoyable.',
      'Fresh cocktails, smoothies, and light snacks are available from the pool bar. Staff organize casual games and entertainment during selected hours. The event combines relaxation with lively summer energy. The program is offered weather permitting.',
    ],
  },
  {
    id: 'golden-hour-cocktail-experience',
    name: 'Golden Hour Cocktail Experience',
    hours: '5:00 PM - 6:30 PM',
    location: 'Terrace Bar',
    short: 'Signature cocktails at sunset',
    image: occasionArt.terraceGoldenCocktail,
    paragraphs: [
      'Celebrate golden hour with handcrafted signature cocktails prepared by expert bartenders. Seasonal ingredients and premium spirits create unique flavors inspired by Canadian hospitality. Comfortable outdoor seating offers panoramic sunset views. Elegant background music enhances the relaxing atmosphere.',
      'Guests may also enjoy gourmet appetizers specially paired with featured drinks. The menu changes throughout the season to showcase fresh ingredients. Friendly staff provide personalized recommendations. Reservations are optional.',
    ],
  },
  {
    id: 'seafood-grill-night',
    name: 'Seafood Grill Night',
    hours: '6:30 PM - 9:30 PM',
    location: 'Garden Terrace',
    short: 'Fresh seafood buffet experience',
    image: occasionArt.gardenSeafoodGrill,
    paragraphs: [
      'Enjoy an outdoor seafood buffet featuring Atlantic salmon, lobster, shrimp, scallops, and fresh seasonal vegetables. Live cooking stations prepare each dish to order for maximum freshness. Guests can sample a variety of regional specialties throughout the evening. Comfortable outdoor seating creates a welcoming atmosphere.',
      'Local chefs demonstrate grilling techniques while interacting with guests. Fresh desserts and premium beverages complete the dining experience. The event is ideal for families, couples, and groups alike. Reservations are recommended.',
    ],
  },
  {
    id: 'local-art-exhibition',
    name: 'Local Art Exhibition',
    hours: '11:00 AM - 6:00 PM',
    location: 'Gallery Hall',
    short: 'Canadian artists showcase work',
    image: occasionArt.galleryDesignWalk,
    paragraphs: [
      'Explore a carefully curated exhibition featuring paintings, photography, and sculpture created by local Canadian artists. Each display celebrates regional landscapes, culture, and creativity. Informational panels provide background on every featured artist. Guests are free to browse at their own pace.',
      'Selected works are available for purchase directly from participating artists. Guided tours are offered during the afternoon. The exhibition changes throughout the year with new collections. Admission is complimentary.',
    ],
  },
  {
    id: 'weekend-family-brunch',
    name: 'Weekend Family Brunch',
    hours: '10:00 AM - 1:00 PM',
    location: 'Main Restaurant',
    short: 'Family buffet and activities',
    image: occasionArt.familyBrunchSalon,
    paragraphs: [
      'Gather with family for a generous brunch buffet featuring breakfast favorites, fresh pastries, seafood, desserts, and seasonal specialties. Dedicated children\'s stations include pancakes, fruit, and interactive treats. Live cooking stations prepare omelets and waffles to order. Comfortable seating accommodates families of all sizes.',
      'Children can enjoy supervised games and creative activities nearby. Adults may relax with specialty coffee, fresh juices, or sparkling beverages. The welcoming atmosphere makes this event suitable for every generation. Reservations are encouraged.',
    ],
  },
  {
    id: 'piano-lounge-evening',
    name: 'Piano Lounge Evening',
    hours: '7:00 PM - 9:00 PM',
    location: 'Grand Lobby',
    short: 'Elegant live piano performance',
    image: occasionArt.pianoGrandLobby,
    paragraphs: [
      'Relax in the grand lobby while a professional pianist performs timeless classics and contemporary favorites. Comfortable seating and soft lighting create an intimate atmosphere for conversation and relaxation. Guests can enjoy premium cocktails and desserts throughout the evening. The performance complements the luxurious surroundings.',
      'The music program changes daily with guest requests welcomed throughout the performance. Friendly service ensures a memorable experience from beginning to end. It is perfect for couples or guests seeking a peaceful evening. No reservation is required.',
    ],
  },
  {
    id: 'romantic-terrace-dinner',
    name: 'Romantic Terrace Dinner',
    hours: '7:30 PM - 10:00 PM',
    location: 'Sky Terrace',
    short: 'Candlelit dinner with views',
    image: occasionArt.terraceRomanceTable,
    paragraphs: [
      'Enjoy a romantic candlelit dinner beneath the evening sky with panoramic views and attentive personal service. The specially designed menu features premium steaks, seafood, handcrafted desserts, and carefully selected wines. Soft live music enhances the intimate atmosphere throughout the evening. Every table is arranged for privacy and comfort.',
      'Guests celebrating anniversaries or special occasions may request personalized touches in advance. Professional staff ensure every detail is carefully prepared. The experience combines exceptional cuisine with unforgettable scenery. Reservations are required due to limited seating.',
    ],
  },
];

export function occasionById(id: string) {
  return occasionItems.find(event => event.id === id);
}
