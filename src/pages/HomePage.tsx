import { ArrowRight, Calendar, Sprout } from 'lucide-react';
import {
  NURSERY_IMAGES,
  NURSERY_INFO,
  NURSERY_INVENTORY,
  NURSERY_TESTIMONIALS,
  type NurseryItem,
  type PageRoute,
} from '../data/nurseryData';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onInspectSpec: (itemId: string) => void;
  onToggleShortlist: (itemId: string) => void;
  shortlistIds: string[];
}

const FEATURED_IDS = ['bloodgood-japanese-maple', 'arbequina-olive', 'pollinator-meadow-seed-kit'];

export function HomePage({
  onNavigate,
  onInspectSpec,
  onToggleShortlist,
  shortlistIds,
}: HomePageProps) {
  const featuredItems: NurseryItem[] = FEATURED_IDS.map((id) =>
    NURSERY_INVENTORY.find((item) => item.id === id)
  ).filter((item): item is NurseryItem => Boolean(item));

  return (
    <div className="space-y-20">
      {/* Section 1: Architectural Hero Split + 4-Column Proof Strip */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-5">
              <p className="text-xs font-medium text-[#4A5D50] tracking-wide">
                Willamette Valley Nursery · Field-Grown Stock &amp; Seeds
              </p>
              <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-semibold tracking-tight text-[#16241B] text-balance">
                Trees and heirloom seeds grown for your soil.
              </h1>
              <p className="text-[15px] sm:text-base text-[#4A5D50] leading-relaxed max-w-prose">
                Browse live nursery inventory, compare root-to-canopy maintenance guides, and reserve a guided store visit for personalized garden planning.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('inventory')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5137]"
              >
                Explore Nursery Inventory
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#16241B] hover:text-[#1F5137] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#4A5D50]" />
                Schedule Store Visit
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[280px] sm:min-h-[380px] rounded-xl overflow-hidden border border-[#E2E8E2] bg-[#EFF3EF]">
              <SafeImage
                src={NURSERY_IMAGES.heroCourtyard}
                alt="Alder & Canopy Nursery glass greenhouse and specimen trees in cedar planters"
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Nursery Proof Strip */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 border-t border-b border-[#E2E8E2] py-6">
          <div className="space-y-1">
            <div className="font-mono text-2xl font-medium text-[#16241B] tabular-nums">
              18 Acres
            </div>
            <div className="text-xs text-[#4A5D50]">
              Field-hardened growing beds
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-2xl font-medium text-[#16241B] tabular-nums">
              120+
            </div>
            <div className="text-xs text-[#4A5D50]">
              Native trees, fruit &amp; seed lines
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-2xl font-medium text-[#16241B] tabular-nums">
              94%
            </div>
            <div className="text-xs text-[#4A5D50]">
              First-year transplant survival rate
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-2xl font-medium text-[#16241B] tabular-nums">
              45 Min
            </div>
            <div className="text-xs text-[#4A5D50]">
              1-on-1 garden planning visits
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Growing Philosophy & Guided Visit Process */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-medium text-[#4A5D50]">How We Grow &amp; Consult</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#16241B] tracking-tight text-balance">
              Root strength before canopy height.
            </h2>
            <p className="text-sm text-[#4A5D50] leading-relaxed">
              Every tree at {NURSERY_INFO.brandName} is raised in air-pruned containers or open field loam to eliminate circling roots, then paired with a site-specific keeping plan when you visit.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 space-y-3">
              <div className="font-mono text-xs font-medium text-[#1F5137] tabular-nums">01.</div>
              <h3 className="text-base font-semibold text-[#16241B]">
                Conditioned Root Systems
              </h3>
              <p className="text-sm text-[#4A5D50] leading-relaxed">
                Breathable nursery pots and mycorrhizal inoculants build dense fibrous feeder roots that establish rapidly after planting.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 space-y-3">
              <div className="font-mono text-xs font-medium text-[#1F5137] tabular-nums">02.</div>
              <h3 className="text-base font-semibold text-[#16241B]">
                Specimen-Level Care Guides
              </h3>
              <p className="text-sm text-[#4A5D50] leading-relaxed">
                Each tree and seed kit ships with exact mature spread, soil pH targets, seasonal pruning timing, and watering basin geometry.
              </p>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 space-y-3">
              <div className="font-mono text-xs font-medium text-[#1F5137] tabular-nums">03.</div>
              <h3 className="text-base font-semibold text-[#16241B]">
                Slot-Booked Store Visits
              </h3>
              <p className="text-sm text-[#4A5D50] leading-relaxed">
                Reserve plants from our live catalog and book a quiet 30–45 minute slot with a horticulturist for personalized garden planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Seasonal Specimens */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8E2] pb-5">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#4A5D50]">Current Nursery Highlights</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#16241B] tracking-tight">
              Ready for autumn and spring planting.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('inventory')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1F5137] hover:text-[#163B28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            View all 9 catalog items
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.map((item) => {
            const isShortlisted = shortlistIds.includes(item.id);
            return (
              <article
                key={item.id}
                className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="aspect-[4/3] bg-[#EFF3EF] overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt={`${item.name} (${item.botanicalName})`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#4A5D50]">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.sunlight}</span>
                    </div>
                    <h3 className="text-base font-semibold text-[#16241B]">
                      {item.name}
                    </h3>
                    <p className="text-xs italic text-[#4A5D50]">{item.botanicalName}</p>
                    <p className="text-sm text-[#4A5D50] leading-relaxed">
                      {item.shortSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8E2] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-base font-medium text-[#16241B] tabular-nums">
                        ${item.price}
                      </span>
                      <span className="text-xs text-[#4A5D50] tabular-nums">
                        {item.stockStatus} · {item.stockCount} available
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onInspectSpec(item.id)}
                        className="px-3 py-2 text-xs font-medium text-[#16241B] bg-[#EFF3EF] hover:bg-[#E2E8E2] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Care &amp; Specs
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleShortlist(item.id)}
                        className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isShortlisted
                            ? 'bg-[#16241B] text-white'
                            : 'bg-[#1F5137] text-white hover:bg-[#163B28]'
                        }`}
                      >
                        {isShortlisted ? 'Reserved' : 'Reserve for Visit'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 4: Customer Outcomes & Direct Store Visit Invitation */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#EFF3EF] border border-[#E2E8E2] rounded-xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E2E8E2]">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1F5137]">
                <Sprout className="w-4 h-4" />
                <span>Personalized Garden Planning</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#16241B] tracking-tight text-balance">
                Walk the rows with a horticulturist before you dig.
              </h2>
              <p className="text-sm text-[#4A5D50] leading-relaxed">
                Bring rough yard dimensions or sun exposure notes to a scheduled visit. We help match rootstock, mature canopy width, and companion seed mixes to your property.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Store Visit Slot
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NURSERY_TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 space-y-4"
              >
                <p className="text-sm text-[#16241B] leading-relaxed">
                  “{item.quote}”
                </p>
                <footer className="pt-3 border-t border-[#E2E8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div>
                    <span className="font-semibold text-[#16241B]">{item.author}</span>
                    <span className="text-[#4A5D50]"> · {item.role}</span>
                  </div>
                  <span className="font-mono text-[#1F5137] tabular-nums">
                    {item.outcomeMetric}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
