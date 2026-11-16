export type PageRoute = 'home' | 'inventory' | 'care' | 'contact';

export type InventoryCategory =
  | 'Specimen Trees'
  | 'Fruit & Nut Trees'
  | 'Evergreens & Hedges'
  | 'Heirloom Seeds';

export type SunlightRequirement = 'Full Sun' | 'Part Shade' | 'Sun to Part Shade';

export interface SeasonalMaintenance {
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  window: string;
  taskTitle: string;
  instructions: string;
}

export interface KeepingTechnique {
  number: string;
  title: string;
  metric: string;
  detail: string;
}

export interface NurseryItem {
  id: string;
  name: string;
  botanicalName: string;
  category: InventoryCategory;
  price: number;
  unitLabel: string;
  stockCount: number;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Seasonal Batch';
  sunlight: SunlightRequirement;
  image: string;
  shortSummary: string;
  bestFor: string;
  specs: {
    matureHeight: string;
    canopySpread: string;
    hardinessZones: string;
    soilPreference: string;
    rootContainer: string;
    wateringCadence: string;
    growthRate: string;
    phRange: string;
  };
  maintenanceSteps: SeasonalMaintenance[];
  keepingTechniques: KeepingTechnique[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  outcomeMetric: string;
}

export interface ConsultationOption {
  id: string;
  title: string;
  duration: string;
  description: string;
}

export const NURSERY_IMAGES = {
  heroCourtyard: '/src/assets/images/hero_nursery_courtyard_1794837988542.jpg',
  japaneseMaple: '/src/assets/images/tree_japanese_maple_1794837989071.jpg',
  arbequinaOlive: '/src/assets/images/tree_olive_arbequina_1794837989638.jpg',
  meyerLemon: '/src/assets/images/tree_meyer_lemon_1794837990842.jpg',
  heirloomSeeds: '/src/assets/images/seeds_heirloom_collection_1794837991426.jpg',
  carePlanting: '/src/assets/images/care_pruning_planting_1794837991335.jpg',
} as const;

export const NURSERY_INFO = {
  brandName: 'Alder & Canopy',
  fullName: 'Alder & Canopy Nursery',
  address: '418 Meadowbrook Lane, Willamette Valley, OR 97301',
  hours: 'Tue – Sun, 08:30 AM – 05:30 PM (Closed Mondays)',
  phoneDisplay: '+1 (555) 019-4820',
  whatsappDigits: '15550194820',
  email: 'hello@alderandcanopy.com',
  loadingNote: 'Covered drive-up loading bay and free burlap root-ball wrapping for all vehicle sizes.',
};

export const NURSERY_INVENTORY: NurseryItem[] = [
  {
    id: 'bloodgood-japanese-maple',
    name: 'Bloodgood Japanese Maple',
    botanicalName: "Acer palmatum 'Atropurpureum'",
    category: 'Specimen Trees',
    price: 185,
    unitLabel: '15-gal root-pruned container',
    stockCount: 11,
    stockStatus: 'In Stock',
    sunlight: 'Part Shade',
    image: NURSERY_IMAGES.japaneseMaple,
    shortSummary: 'Layered burgundy canopy that shifts to luminous scarlet in autumn; ideal for courtyards and filtered shade borders.',
    bestFor: 'Courtyards, entry walkways, and dappled woodland gardens',
    specs: {
      matureHeight: '15 – 20 ft',
      canopySpread: '15 – 18 ft',
      hardinessZones: 'USDA Zones 5 – 8',
      soilPreference: 'Moist, organically rich, well-draining loam',
      rootContainer: '15-Gallon Air-Pruned Pot (4.5 ft tall)',
      wateringCadence: 'Deep soak 2× weekly (Yr 1), 1× weekly established',
      growthRate: 'Slow to Moderate (8 – 12 in / yr)',
      phRange: '5.5 – 6.5 (Slightly Acidic)',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'March – April',
        taskTitle: 'Leaf-Out Inspection & Compost Top-Dress',
        instructions: 'Apply a 1-inch ring of aged leaf mold around the drip line without burying the trunk flare. Hold nitrogen fertilizers until full leaf expansion.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Afternoon Shade & Deep Root Hydration',
        instructions: 'Deliver 8–10 gallons slowly at the outer canopy drip line during heat waves over 88°F. Mist-free morning watering prevents leaf scorch.',
      },
      {
        season: 'Autumn',
        window: 'October – November',
        taskTitle: 'Moisture Retention Before Frost',
        instructions: 'Water deeply once before first hard freeze so overwintering roots remain hydrated. Rake fallen foliage only if fungal spots were noted.',
      },
      {
        season: 'Winter',
        window: 'January – February',
        taskTitle: 'Structural Silhouette Pruning',
        instructions: 'During full dormancy, remove crossing interior twigs and dead wood to reveal the sculptural branch architecture. Never prune during sap rise.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Root Flare Elevation',
        metric: '1.5 in above grade',
        detail: 'Set the top of the root ball 1.5 inches above surrounding soil grade so settling never buries the basal collar or invites crown rot.',
      },
      {
        number: '02',
        title: 'Wind-Shear Microclimate',
        metric: 'East or North aspect',
        detail: 'Position away from hot west-facing masonry walls and drying afternoon gusts to protect delicate palmate leaf margins.',
      },
      {
        number: '03',
        title: 'Pine Bark Mulch Ring',
        metric: '3 in depth · 4 in clear',
        detail: 'Maintain a 3-inch fine pine-bark collar extending 36 inches outward while keeping a 4-inch bare ring around the bark.',
      },
      {
        number: '04',
        title: 'Mycorrhizal Root Inoculation',
        metric: 'Zero-salt bio-drench',
        detail: 'Drench the planting pit with endomycorrhizal fungal spores at installation to accelerate feeder root bonding in clay-loam soils.',
      },
    ],
  },
  {
    id: 'arbequina-olive',
    name: 'Arbequina Olive Tree',
    botanicalName: "Olea europaea 'Arbequina'",
    category: 'Fruit & Nut Trees',
    price: 165,
    unitLabel: '15-gal field-hardened pot',
    stockCount: 14,
    stockStatus: 'In Stock',
    sunlight: 'Full Sun',
    image: NURSERY_IMAGES.arbequinaOlive,
    shortSummary: 'Self-fertile Mediterranean olive with fine silvery-sage foliage, gnarled early character, and generous autumn oil-grade fruit.',
    bestFor: 'Sunny gravel gardens, terrace planters, and dry slopes',
    specs: {
      matureHeight: '15 – 22 ft',
      canopySpread: '12 – 15 ft',
      hardinessZones: 'USDA Zones 7b – 11',
      soilPreference: 'Fast-draining sandy or mineral loam',
      rootContainer: '15-Gallon Breathable Pot (5 ft tall)',
      wateringCadence: 'Deep soak every 10–14 days once established',
      growthRate: 'Moderate (12 – 18 in / yr)',
      phRange: '6.5 – 7.8 (Neutral to Alkaline)',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'April – May',
        taskTitle: 'Airflow Thinning & Blossom Check',
        instructions: 'Thin vertical water sprouts before flower panicles open to allow wind pollination and reduce peacock-spot humidity pockets.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Deficit Irrigation Rhythm',
        instructions: 'Allow the top 4 inches of soil to dry fully between deep irrigations. Over-watering causes yellow leaf drop and soft rank shoots.',
      },
      {
        season: 'Autumn',
        window: 'October – November',
        taskTitle: 'Fruit Harvest & Copper Shield',
        instructions: 'Harvest green-to-violet olives by hand in late October. Apply an organic copper spray prior to prolonged winter rains.',
      },
      {
        season: 'Winter',
        window: 'December – February',
        taskTitle: 'Freeze Collar Wrapping',
        instructions: 'When night temperatures dip below 20°F, wrap the lower trunk with breathable burlap and mulch the root zone with crushed gravel.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Crushed Pumice Drainage',
        metric: '30% mineral grit',
        detail: 'Blend 30% coarse pumice or decomposed granite into heavy clay backfill or mound the planting berm 8 inches high to eliminate standing water.',
      },
      {
        number: '02',
        title: 'Container Overwintering',
        metric: 'Terracotta breathability',
        detail: 'For patio specimens, choose unglazed terracotta with oversized drainage holes and elevate pots on stone feet during winter.',
      },
      {
        number: '03',
        title: 'Open-Goblet Scaffold',
        metric: '3–4 primary limbs',
        detail: 'Train three to four outward-facing scaffold branches at 45-degree angles so sunlight penetrates the center of the evergreen crown.',
      },
      {
        number: '04',
        title: 'Lean Mineral Feeding',
        metric: 'Low-N spring compost',
        detail: 'Feed sparingly with low-nitrogen fish hydrolysate or composted mineral rock in April; excess nitrogen reduces fruit set.',
      },
    ],
  },
  {
    id: 'dwarf-meyer-lemon',
    name: 'Improved Meyer Lemon',
    botanicalName: 'Citrus × meyeri',
    category: 'Fruit & Nut Trees',
    price: 98,
    unitLabel: '7-gal grafted semi-dwarf',
    stockCount: 6,
    stockStatus: 'Limited Stock',
    sunlight: 'Full Sun',
    image: NURSERY_IMAGES.meyerLemon,
    shortSummary: 'Fragrant evergreen citrus producing thin-skinned, sweet-tart lemons nearly year-round in bright patios or sunrooms.',
    bestFor: 'South-facing patios, sunny courtyards, and conservatory pots',
    specs: {
      matureHeight: '6 – 10 ft',
      canopySpread: '5 – 8 ft',
      hardinessZones: 'USDA Zones 8b – 11 (Patio in 4–8a)',
      soilPreference: 'Coarse bark-based citrus mix, rapid drainage',
      rootContainer: '7-Gallon Grafted Dwarf Rootstock',
      wateringCadence: 'Water deeply when top 2 inches feel dry',
      growthRate: 'Moderate (10 – 14 in / yr)',
      phRange: '6.0 – 6.8 (Mildly Acidic)',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'March – May',
        taskTitle: 'Citrus Micronutrient Feed',
        instructions: 'Apply chelated iron, zinc, and organic citrus granular feed as spring blossoms flush. Remove any rootstock suckers below the graft union.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Consistent Moisture & Scale Watch',
        instructions: 'Keep container moisture steady to prevent fruit splitting. Wipe undersides of leaves with neem oil mist if soft scale appears.',
      },
      {
        season: 'Autumn',
        window: 'September – November',
        taskTitle: 'Cold-Night Transition',
        instructions: 'Before frost arrives, acclimate patio trees indoors over 7 days into a bright south window or unheated greenhouse above 38°F.',
      },
      {
        season: 'Winter',
        window: 'December – February',
        taskTitle: 'Bright Rest & Harvest',
        instructions: 'Harvest fully golden fruit; reduce watering by 40% during cool winter daylight and keep away from dry forced-air heating vents.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Graft Union Clearance',
        metric: '4 in above soil',
        detail: 'Always locate the diagonal bud-union scar on the lower trunk and keep soil and mulch well below it so the dwarfing rootstock never sprouts.',
      },
      {
        number: '02',
        title: '5-1-1 Bark Potting Matrix',
        metric: '5 parts pine bark',
        detail: 'Pot in 5 parts aged pine bark fines, 1 part peat/coir, and 1 part coarse perlite to maintain oxygen around shallow citrus feeder roots.',
      },
      {
        number: '03',
        title: 'First-Year Blossom Thinning',
        metric: 'Max 4 fruits Yr 1',
        detail: 'Pinch off half of early pea-sized fruitlets during the first summer after transplanting so energy builds woody scaffold branches.',
      },
      {
        number: '04',
        title: 'Humidity Pebble Tray',
        metric: '45% – 55% indoor RH',
        detail: 'When overwintering indoors, rest the pot over a wide gravel water tray (above water level) to stop winter leaf drop.',
      },
    ],
  },
  {
    id: 'serviceberry-autumn-brilliance',
    name: 'Autumn Brilliance Serviceberry',
    botanicalName: 'Amelanchier × grandiflora',
    category: 'Specimen Trees',
    price: 155,
    unitLabel: '10-gal multi-stem clump',
    stockCount: 9,
    stockStatus: 'In Stock',
    sunlight: 'Sun to Part Shade',
    image: NURSERY_IMAGES.carePlanting,
    shortSummary: 'Four-season native multi-stem tree offering white April blossoms, edible June berries, smooth gray bark, and copper-red fall foliage.',
    bestFor: 'Native backyard sanctuaries, songbird habitats, and lawn anchors',
    specs: {
      matureHeight: '18 – 24 ft',
      canopySpread: '15 – 20 ft',
      hardinessZones: 'USDA Zones 4 – 9',
      soilPreference: 'Adaptable loam; tolerates clay if uncompacted',
      rootContainer: '10-Gallon Multi-Stem Specimen (5.5 ft)',
      wateringCadence: '10 gal weekly through first two summers',
      growthRate: 'Moderate (14 – 18 in / yr)',
      phRange: '5.5 – 7.0',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'March – April',
        taskTitle: 'Blossom Pollinator Support',
        instructions: 'Avoid broad-spectrum sprays during April bloom so native mason bees pollinate the early white flower clusters.',
      },
      {
        season: 'Summer',
        window: 'June – July',
        taskTitle: 'Berry Harvest & Basal Sucker Trim',
        instructions: 'Share purple-blue June berries with songbirds or harvest early. Snip unwanted pencil-thin root suckers at soil level.',
      },
      {
        season: 'Autumn',
        window: 'October – November',
        taskTitle: 'Leaf Mulch Retention',
        instructions: 'Leave fallen foliage under the canopy bed as natural winter insulation and organic humus.',
      },
      {
        season: 'Winter',
        window: 'January – February',
        taskTitle: 'Multi-Stem Bark Highlight',
        instructions: 'Selectively prune lower twiggy growth to showcase the smooth silver-gray multi-stem trunks against winter evergreens.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Wide Saucer Planting Pit',
        metric: '3× root-ball width',
        detail: 'Dig a shallow, wide saucer 3× wider than the pot rather than deep; Serviceberry feeder roots spread laterally in the top 10 inches.',
      },
      {
        number: '02',
        title: 'Unwrapped Burlap & Twine',
        metric: '100% collar cleared',
        detail: 'Remove all nursery twine, tags, and top-third burlap collars before backfilling with native unamended site soil.',
      },
      {
        number: '03',
        title: '2-Year Drip Basin',
        metric: '30 in earth berm',
        detail: 'Form a temporary 3-inch soil berm at the root-ball perimeter to hold slow hose water until roots anchor into native soil.',
      },
      {
        number: '04',
        title: 'Understory Companion Guild',
        metric: 'Ferns & native sedge',
        detail: 'Underplant with Sword Ferns or Carex sedges to shade the shallow root zone naturally and cut summer water demand by 30%.',
      },
    ],
  },
  {
    id: 'italian-cypress-totem',
    name: 'Slender Italian Cypress',
    botanicalName: "Cupressus sempervirens 'Stricta'",
    category: 'Evergreens & Hedges',
    price: 135,
    unitLabel: '10-gal 6 ft column',
    stockCount: 18,
    stockStatus: 'In Stock',
    sunlight: 'Full Sun',
    image: NURSERY_IMAGES.heroCourtyard,
    shortSummary: 'Architectural evergreen exclamation mark with tight vertical foliage that frames driveways, walls, and Mediterranean borders.',
    bestFor: 'Driveway avenues, narrow side yards, and formal architectural framing',
    specs: {
      matureHeight: '30 – 40 ft',
      canopySpread: '3 – 5 ft',
      hardinessZones: 'USDA Zones 7 – 11',
      soilPreference: 'Well-drained mineral or sandy loam',
      rootContainer: '10-Gallon Container (6 ft tall)',
      wateringCadence: 'Deep soak weekly Yr 1; drought-hardy Yr 3+',
      growthRate: 'Moderate (18 – 24 in / yr)',
      phRange: '6.0 – 8.0',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'April – May',
        taskTitle: 'Leader Inspection & Light Tip Trim',
        instructions: 'Ensure a single central vertical leader remains dominant. Lightly shear stray lateral tips only if needed.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Spider Mite Washdown',
        instructions: 'Blast foliage briskly with a morning hose jet every 3 weeks during dry dust periods to deter spruce spider mites.',
      },
      {
        season: 'Autumn',
        window: 'October',
        taskTitle: 'Pre-Winter Wind Tie Check',
        instructions: 'Inspect any loose vertical branches and gently bind spreading limbs with breathable cotton tape before winter storms.',
      },
      {
        season: 'Winter',
        window: 'December – February',
        taskTitle: 'Snow Load Shake-Off',
        instructions: 'After wet heavy snow, gently brush upward from beneath branches with a soft broom to keep the tight columnar profile.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Strict Sunlight Spacing',
        metric: '5 – 6 ft centers',
        detail: 'Space columnar trees at least 5 feet apart and away from deep eave shade so inner needles never thin out.',
      },
      {
        number: '02',
        title: 'Avoid Overhead Lawn Sprinklers',
        metric: 'Drip-line only',
        detail: 'Keep foliage dry at dusk; wet needles combined with lawn fertilizer invite Seiridium canker.',
      },
      {
        number: '03',
        title: 'Two-Point Flexible Staking',
        metric: 'Remove after 12 mos',
        detail: 'Use two opposing wooden stakes with wide webbing straps allowing 2 inches of trunk sway to stimulate strong caliper taper.',
      },
      {
        number: '04',
        title: 'Gravel & Stone Mulch',
        metric: '2 in crushed basalt',
        detail: 'Mulch with mineral gravel rather than damp wood chips around Mediterranean conifers to keep the root collar dry.',
      },
    ],
  },
  {
    id: 'honeycrisp-semi-dwarf-apple',
    name: 'Honeycrisp Heritage Apple',
    botanicalName: "Malus domestica 'Honeycrisp' (M.7)",
    category: 'Fruit & Nut Trees',
    price: 118,
    unitLabel: '7-gal feathered whip',
    stockCount: 8,
    stockStatus: 'In Stock',
    sunlight: 'Full Sun',
    image: NURSERY_IMAGES.meyerLemon,
    shortSummary: 'Crisp, aromatic late-season eating apple grafted on hardy M.7 semi-dwarf rootstock for backyard orchards.',
    bestFor: 'Edible gardens, espalier sunny fences, and home orchards',
    specs: {
      matureHeight: '12 – 15 ft',
      canopySpread: '10 – 12 ft',
      hardinessZones: 'USDA Zones 3 – 8',
      soilPreference: 'Fertile, deep, well-drained loam',
      rootContainer: '7-Gallon Branched Orchard Tree',
      wateringCadence: '15 gal weekly during fruit swell (Jun – Aug)',
      growthRate: 'Moderate (12 – 18 in / yr)',
      phRange: '6.2 – 6.8',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'March – May',
        taskTitle: 'Dormant Oil & Cluster Thinning',
        instructions: 'Apply horticultural dormant oil at silver-tip bud stage. Thin developing apple clusters to one king fruit per spur in late May.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Calcium Hydration & Water Sprouts',
        instructions: 'Maintain even moisture to prevent bitter-pit calcium deficiency and snap off vertical watersprouts in July.',
      },
      {
        season: 'Autumn',
        window: 'September – October',
        taskTitle: 'Harvest & Orchard Floor Clean',
        instructions: 'Harvest when background skin shifts from green to creamy yellow. Clear dropped fruit thoroughly to break pest cycles.',
      },
      {
        season: 'Winter',
        window: 'January – February',
        taskTitle: 'Modified Central Leader Pruning',
        instructions: 'Prune on dry sunny days to maintain 45-degree fruiting tiers spaced 18 inches vertically along the central leader.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Cross-Pollination Pairing',
        metric: 'Within 50 ft radius',
        detail: 'Plant alongside a mid-season pollinator such as Fuji, Gala, or Crabapple within 50 feet for reliable spring fruit set.',
      },
      {
        number: '02',
        title: 'Vole & Rabbit Trunk Guard',
        metric: '12 in mesh collar',
        detail: 'Wrap the base with breathable hardware-cloth mesh each autumn to protect sweet cambium bark from winter rodents.',
      },
      {
        number: '03',
        title: 'Compost & Calcium Balance',
        metric: 'Gypsum + aged compost',
        detail: 'Top-dress in April with 1 cup agricultural gypsum and 2 inches of finished compost to support crisp cell-wall density.',
      },
      {
        number: '04',
        title: 'Espalier Wire Training',
        metric: '3 horizontal wires',
        detail: 'Train young flexible limbs horizontally along stainless fence wires to save space and maximize sun-ripened fruit spurs.',
      },
    ],
  },
  {
    id: 'pacific-wax-myrtle',
    name: 'Pacific Wax Myrtle',
    botanicalName: 'Morella californica',
    category: 'Evergreens & Hedges',
    price: 88,
    unitLabel: '5-gal lush privacy shrub',
    stockCount: 22,
    stockStatus: 'In Stock',
    sunlight: 'Sun to Part Shade',
    image: NURSERY_IMAGES.arbequinaOlive,
    shortSummary: 'Fast-establishing native evergreen privacy screen with aromatic glossy foliage and purple winter berries for birds.',
    bestFor: 'Natural privacy hedges, windbreaks, and coastal-tough borders',
    specs: {
      matureHeight: '12 – 20 ft',
      canopySpread: '8 – 12 ft',
      hardinessZones: 'USDA Zones 7 – 10',
      soilPreference: 'Tolerates sandy, clay, or lean native soils',
      rootContainer: '5-Gallon Full Multi-Branch Shrub',
      wateringCadence: 'Weekly Yr 1; twice monthly Yr 2+',
      growthRate: 'Fast (24 – 36 in / yr)',
      phRange: '5.5 – 7.5',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'April – May',
        taskTitle: 'Tip Pinching for Density',
        instructions: 'Hand-pinch or lightly prune growing tips after spring flush to encourage tight, opaque privacy branching.',
      },
      {
        season: 'Summer',
        window: 'July – August',
        taskTitle: 'Deep Monthly Soak',
        instructions: 'Give established hedges one deep slow soak per month during dry spells to keep glossy foliage vibrant.',
      },
      {
        season: 'Autumn',
        window: 'October',
        taskTitle: 'Selective Height Shaping',
        instructions: 'Use hand bypass pruners rather than hedge shears for a natural undulating screen that preserves winter berries.',
      },
      {
        season: 'Winter',
        window: 'December – February',
        taskTitle: 'Mulch Replenishment',
        instructions: 'Top up wood-chip pathways around the hedge base; native nitrogen-fixing roots thrive without synthetic fertilizer.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Staggered Hedge Spacing',
        metric: '4 ft on-center',
        detail: 'Stagger plants in a gentle zig-zag 4 feet apart for a living privacy wall that closes visually within 18 months.',
      },
      {
        number: '02',
        title: 'Zero-Fertilizer Root Symbiosis',
        metric: 'Frankia N-fixing',
        detail: 'Avoid high-phosphorus lawn fertilizers; Wax Myrtle hosts beneficial root bacteria that fix atmospheric nitrogen naturally.',
      },
      {
        number: '03',
        title: 'Bypass Pruner Cuts',
        metric: 'Cut above leaf nodes',
        detail: 'Make selective thinning cuts inside the canopy rather than shearing flat walls to prevent scorched cut leaves.',
      },
      {
        number: '04',
        title: 'Arborist Wood-Chip Bed',
        metric: '4 in coarse chips',
        detail: 'Blanket the entire hedge strip in 4 inches of coarse ramial wood chips to mimic forest-edge moisture retention.',
      },
    ],
  },
  {
    id: 'pollinator-meadow-seed-kit',
    name: 'Pollinator & Understory Seed Kit',
    botanicalName: 'Asclepias, Festuca & California Poppy',
    category: 'Heirloom Seeds',
    price: 28,
    unitLabel: '6 kraft packets + cedar stakes',
    stockCount: 34,
    stockStatus: 'In Stock',
    sunlight: 'Full Sun',
    image: NURSERY_IMAGES.heirloomSeeds,
    shortSummary: 'Six regionally tested heirloom packets covering 180 sq ft of tree-ring wildflowers, native bunchgrasses, and bee forage.',
    bestFor: 'Orchard understories, sunny borders, and dry meadow strips',
    specs: {
      matureHeight: '12 – 36 in',
      canopySpread: 'Covers 180 sq ft',
      hardinessZones: 'USDA Zones 4 – 10',
      soilPreference: 'Unamended mineral soil, light rake contact',
      rootContainer: '6 Seed Packets (88%+ Germination Tested)',
      wateringCadence: 'Gentle mist daily for 14 days until sprouted',
      growthRate: 'Germination in 10 – 21 days',
      phRange: '6.0 – 7.5',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'March – May',
        taskTitle: 'Surface Rake & Mist Seeding',
        instructions: 'Scratch top 1/4 inch of bare soil, broadcast seed mixed with dry sand for even scatter, press firmly with a board, and keep evenly damp.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Taper Water After Bloom',
        instructions: 'Once perennials reach 6 inches, taper irrigation to once every 10 days so deep taproots outcompete shallow weeds.',
      },
      {
        season: 'Autumn',
        window: 'October – November',
        taskTitle: 'Cold-Stratify Meadow Sowings',
        instructions: 'Sow second wave before winter rains; natural freeze-thaw cycles crack hard wildflower seed coats for early spring germination.',
      },
      {
        season: 'Winter',
        window: 'January – February',
        taskTitle: 'Leave Hollow Stems Standing',
        instructions: 'Wait until late February before cutting dried meadow stalks back to 4 inches so overwintering solitary bees emerge safely.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: 'Seed-to-Soil Compression',
        metric: '1/8 in max depth',
        detail: 'Never bury fine wildflower seeds deeply; press them gently into raked soil by walking over a flat plank so light triggers sprouting.',
      },
      {
        number: '02',
        title: 'Sand Carrier Blend',
        metric: '1:4 seed-to-sand',
        detail: 'Mix tiny seeds with 4 parts dry builder sand in a bucket and sow half north-south, half east-west for seamless meadow density.',
      },
      {
        number: '03',
        title: 'Skip Nitrogen Compost',
        metric: 'Lean soil wins',
        detail: 'Avoid rich manure or fertilizer on meadow beds; native wildflowers thrive in lean mineral soil that slows aggressive annual weeds.',
      },
      {
        number: '04',
        title: 'Stale Seedbed Prep',
        metric: '10-day pre-water',
        detail: 'Water the cleared bed 10 days prior to sowing, hoe off the first flush of weed seedlings cleanly, then sow immediately.',
      },
    ],
  },
  {
    id: 'conifer-heirloom-seed-pack',
    name: 'Heirloom Timber & Pine Seed Pack',
    botanicalName: 'Pinus ponderosa & Pseudotsuga menziesii',
    category: 'Heirloom Seeds',
    price: 34,
    unitLabel: 'Stratified tree seed duo + guide',
    stockCount: 16,
    stockStatus: 'Seasonal Batch',
    sunlight: 'Full Sun',
    image: NURSERY_IMAGES.heirloomSeeds,
    shortSummary: 'Viability-tested Ponderosa Pine and Douglas Fir tree seeds with cold-stratification protocol for home seedling propagation.',
    bestFor: 'Family heritage tree growing, acreage windbreaks, and bonsai starts',
    specs: {
      matureHeight: '60 – 100 ft (container-adjustable)',
      canopySpread: '20 – 30 ft at maturity',
      hardinessZones: 'USDA Zones 4 – 8',
      soilPreference: 'Sharp sandy-bark conifer propagation mix',
      rootContainer: '60 Viable Seeds + Deep Root-Trainer Cells',
      wateringCadence: 'Keep propagation medium lightly damp, never soggy',
      growthRate: '6 – 10 in first year',
      phRange: '5.5 – 6.5',
    },
    maintenanceSteps: [
      {
        season: 'Spring',
        window: 'March – April',
        taskTitle: 'Post-Stratification Sowing',
        instructions: 'Sow chilled seeds 1/4 inch deep in tall root-trainer pots filled with 50/50 bark fines and perlite. Place in bright filtered sun.',
      },
      {
        season: 'Summer',
        window: 'June – August',
        taskTitle: 'Dappled Sun & Root Air-Pruning',
        instructions: 'Elevate seedling trays on wire mesh benches so emerging taproots air-prune cleanly instead of circling plastic bottoms.',
      },
      {
        season: 'Autumn',
        window: 'October',
        taskTitle: 'Outdoor Hardening & Bud Set',
        instructions: 'Keep seedlings outdoors to experience crisp autumn nights that trigger protective terminal bud formation.',
      },
      {
        season: 'Winter',
        window: 'November – February',
        taskTitle: 'Cold Frame & Stratification Prep',
        instructions: 'Sink potted seedlings to pot rims in sawdust or leaves outdoors; chill fresh seed batches in damp peat at 38°F for 45 days.',
      },
    ],
    keepingTechniques: [
      {
        number: '01',
        title: '45-Day Cold Stratification',
        metric: '36°F – 40°F moist',
        detail: 'Wrap seeds in lightly damp (not dripping) unmilled sphagnum or paper towel inside a vented fridge bag for 45 days to break dormancy.',
      },
      {
        number: '02',
        title: 'Deep Root-Trainer Pots',
        metric: '7 in vertical depth',
        detail: 'Conifer seedlings send down an immediate vertical taproot; use deep narrow sleeves rather than shallow flat seed trays.',
      },
      {
        number: '03',
        title: 'Granite Grit Top Collar',
        metric: '1/4 in chicken grit',
        detail: 'Top-dress seed cells with fine crushed granite grit to stabilize stems and eliminate damping-off collar rot.',
      },
      {
        number: '04',
        title: 'First Transplant Timing',
        metric: 'Autumn Year 2',
        detail: 'Transplant young conifers into permanent field spots in late October of Year 2 while soil stays warm and winter rain begins.',
      },
    ],
  },
];

export const CONSULTATION_OPTIONS: ConsultationOption[] = [
  {
    id: 'selection',
    title: 'Tree & Seed Selection Walk',
    duration: '30 min',
    description: 'Walk the nursery rows with a horticulturist to hand-tag your specimen trees and verify vehicle fit.',
  },
  {
    id: 'garden-planning',
    title: 'Personalized Garden Planning',
    duration: '45 min',
    description: 'Bring yard photos or rough dimensions for custom canopy placement, sun-map matching, and seed pairing.',
  },
  {
    id: 'care-clinic',
    title: 'Soil & Maintenance Clinic',
    duration: '30 min',
    description: 'Bring a jar of site soil or leaf sample for drainage testing, pruning timing, and root-care coaching.',
  },
];

export const NURSERY_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'We brought rough yard measurements to our 45-minute slot. Instead of guessing, we left with two Bloodgood maples, an olive tree, and a clear watering schedule—every tree thrived through summer.',
    author: 'Elena & David Mercer',
    role: 'Homeowners, Cedar Hills',
    outcomeMetric: '3 Specimen Trees · 100% First-Year Survival',
  },
  {
    id: 't2',
    quote: 'Having the botanical specs and root-flare instructions paired directly with live stock saved our courtyard renovation. Their WhatsApp desk answered a leaf-drop question in ten minutes.',
    author: 'Marcus Lindholm',
    role: 'Principal Architect, Studio Lindholm',
    outcomeMetric: '14 Courtyard Cypress · Zero Transplant Loss',
  },
];

export function getUpcomingVisitDates(): Array<{ iso: string; label: string; dayName: string }> {
  const dates: Array<{ iso: string; label: string; dayName: string }> = [];
  const start = new Date();
  let offset = 1;
  while (dates.length < 6) {
    const d = new Date(start);
    d.setDate(start.getDate() + offset);
    // Nursery closed Mondays (day === 1)
    if (d.getDay() !== 1) {
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ iso, label, dayName });
    }
    offset += 1;
  }
  return dates;
}

export const VISIT_TIME_SLOTS = [
  { id: '09:00', label: '09:00 AM', remaining: 2 },
  { id: '10:30', label: '10:30 AM', remaining: 1 },
  { id: '13:00', label: '01:00 PM', remaining: 3 },
  { id: '15:30', label: '03:30 PM', remaining: 2 },
];
