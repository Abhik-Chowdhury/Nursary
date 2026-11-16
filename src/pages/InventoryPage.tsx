import { useMemo, useState } from 'react';
import { ArrowRight, Check, Search, X } from 'lucide-react';
import {
  NURSERY_INVENTORY,
  type InventoryCategory,
  type PageRoute,
  type SunlightRequirement,
} from '../data/nurseryData';
import { SafeImage } from '../components/SafeImage';

interface InventoryPageProps {
  shortlistIds: string[];
  onToggleShortlist: (itemId: string) => void;
  onInspectSpec: (itemId: string) => void;
  onNavigate: (page: PageRoute) => void;
}

const CATEGORIES: Array<'All' | InventoryCategory> = [
  'All',
  'Specimen Trees',
  'Fruit & Nut Trees',
  'Evergreens & Hedges',
  'Heirloom Seeds',
];

const SUNLIGHT_OPTIONS: Array<'All' | SunlightRequirement> = [
  'All',
  'Full Sun',
  'Part Shade',
  'Sun to Part Shade',
];

export function InventoryPage({
  shortlistIds,
  onToggleShortlist,
  onInspectSpec,
  onNavigate,
}: InventoryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | InventoryCategory>('All');
  const [selectedSun, setSelectedSun] = useState<'All' | SunlightRequirement>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return NURSERY_INVENTORY.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSun = selectedSun === 'All' || item.sunlight === selectedSun;
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.botanicalName.toLowerCase().includes(query) ||
        item.bestFor.toLowerCase().includes(query);
      return matchesCat && matchesSun && matchesSearch;
    });
  }, [selectedCategory, selectedSun, searchQuery]);

  const shortlistedItems = useMemo(
    () => NURSERY_INVENTORY.filter((item) => shortlistIds.includes(item.id)),
    [shortlistIds]
  );

  const shortlistTotal = useMemo(
    () => shortlistedItems.reduce((sum, item) => sum + item.price, 0),
    [shortlistedItems]
  );

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSun('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 space-y-10">
      {/* Page Intro */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2E8E2] pb-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-[#4A5D50]">
            Live Nursery Inventory · Reserve Plants for In-Store Pickup &amp; Planning
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#16241B] text-balance">
            Field-grown trees, shrubs &amp; heirloom seeds.
          </h1>
          <p className="text-sm sm:text-base text-[#4A5D50] leading-relaxed">
            Inspect botanical specifications or reserve items onto your Visit List so our horticulturists can stage your specimens before you arrive.
          </p>
        </div>

        {/* Visit List Summary Card */}
        <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0 lg:min-w-[340px]">
          <div className="space-y-0.5">
            <div className="text-xs font-medium text-[#4A5D50]">Your Visit List</div>
            <div className="text-sm font-semibold text-[#16241B] font-mono tabular-nums">
              {shortlistedItems.length} {shortlistedItems.length === 1 ? 'item' : 'items'} · ${shortlistTotal}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Visit Slot
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Segmented Category Filter */}
          <div
            role="group"
            aria-label="Filter inventory by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFF3EF] rounded-lg"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FFFFFF] text-[#16241B] shadow-sm'
                      : 'text-[#4A5D50] hover:text-[#16241B]'
                  }`}
                >
                  {category === 'All' ? 'All Stock' : category}
                </button>
              );
            })}
          </div>

          {/* Search Input + Sunlight Select */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#4A5D50] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search species or garden use..."
                aria-label="Search plants and seeds"
                className="w-full pl-9 pr-8 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] placeholder:text-[#4A5D50]/70 focus:outline-none focus:border-[#1F5137]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A5D50] hover:text-[#16241B] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              aria-label="Filter by sunlight requirement"
              value={selectedSun}
              onChange={(e) => setSelectedSun(e.target.value as 'All' | SunlightRequirement)}
              className="px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137] cursor-pointer"
            >
              {SUNLIGHT_OPTIONS.map((sun) => (
                <option key={sun} value={sun}>
                  {sun === 'All' ? 'All Sunlight' : sun}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#4A5D50]">
          <span className="font-mono tabular-nums">
            Showing {filteredItems.length} of {NURSERY_INVENTORY.length} nursery offerings
          </span>
          {(selectedCategory !== 'All' || selectedSun !== 'All' || searchQuery !== '') && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[#1F5137] hover:underline font-medium cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Inventory Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-12 text-center space-y-3">
          <h2 className="font-display text-xl font-semibold text-[#16241B]">
            No matching plants or seeds found
          </h2>
          <p className="text-sm text-[#4A5D50] max-w-md mx-auto">
            Try clearing your search term or selecting a broader sunlight level. Looking for a specific cultivar? Message our nursery team on the Visit &amp; Contact page.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 px-4 py-2 text-xs font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors cursor-pointer"
          >
            Show All Inventory
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
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
                    <h2 className="font-sans text-base font-semibold text-[#16241B]">
                      {item.name}
                    </h2>
                    <p className="text-xs italic text-[#4A5D50]">
                      {item.botanicalName} · {item.unitLabel}
                    </p>
                    <p className="text-sm text-[#4A5D50] leading-relaxed">
                      {item.shortSummary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8E2] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-base font-medium text-[#16241B] tabular-nums">
                        ${item.price}
                      </span>
                      <span
                        className={`text-xs font-medium tabular-nums ${
                          item.stockStatus === 'Limited Stock'
                            ? 'text-[#9A4E1C]'
                            : 'text-[#1F5137]'
                        }`}
                      >
                        {item.stockStatus} · {item.stockCount} left
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onInspectSpec(item.id)}
                        className="px-3 py-2 text-xs font-medium text-[#16241B] bg-[#EFF3EF] hover:bg-[#E2E8E2] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Specs &amp; Care
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleShortlist(item.id)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isShortlisted
                            ? 'bg-[#16241B] text-white'
                            : 'bg-[#1F5137] text-white hover:bg-[#163B28]'
                        }`}
                      >
                        {isShortlisted && <Check className="w-3.5 h-3.5" />}
                        {isShortlisted ? 'Added to Visit' : 'Add to Visit List'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
