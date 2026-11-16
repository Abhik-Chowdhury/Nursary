import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import {
  NURSERY_IMAGES,
  NURSERY_INVENTORY,
  type PageRoute,
} from '../data/nurseryData';
import { SafeImage } from '../components/SafeImage';
import { buildCareWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface SpecsCarePageProps {
  selectedItemId: string;
  onSelectItem: (itemId: string) => void;
  shortlistIds: string[];
  onToggleShortlist: (itemId: string) => void;
  onNavigate: (page: PageRoute) => void;
}

export function SpecsCarePage({
  selectedItemId,
  onSelectItem,
  shortlistIds,
  onToggleShortlist,
  onNavigate,
}: SpecsCarePageProps) {
  const activeItem =
    NURSERY_INVENTORY.find((item) => item.id === selectedItemId) ?? NURSERY_INVENTORY[0];
  const isShortlisted = shortlistIds.includes(activeItem.id);

  const specRows: Array<{ label: string; value: string }> = [
    { label: 'Botanical Name', value: activeItem.botanicalName },
    { label: 'Mature Height', value: activeItem.specs.matureHeight },
    { label: 'Canopy Spread', value: activeItem.specs.canopySpread },
    { label: 'Hardiness Zones', value: activeItem.specs.hardinessZones },
    { label: 'Sunlight Exposure', value: activeItem.sunlight },
    { label: 'Soil & Drainage', value: activeItem.specs.soilPreference },
    { label: 'Target Soil pH', value: activeItem.specs.phRange },
    { label: 'Container / Root Spec', value: activeItem.specs.rootContainer },
    { label: 'Watering Cadence', value: activeItem.specs.wateringCadence },
    { label: 'Annual Growth Rate', value: activeItem.specs.growthRate },
  ];

  const careWhatsAppHref = buildWhatsAppUrl(buildCareWhatsAppMessage(activeItem));

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 space-y-14">
      {/* Specimen Switcher Header */}
      <div className="space-y-4 border-b border-[#E2E8E2] pb-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium text-[#4A5D50]">
            Botanical Specifications, Seasonal Maintenance &amp; Keeping Techniques
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#16241B] text-balance">
            Tree &amp; seed care manual.
          </h1>
          <p className="text-sm sm:text-base text-[#4A5D50] leading-relaxed">
            Select any tree, hedge, or seed kit below to inspect site specifications, seasonal upkeep tasks, and field-tested planting techniques.
          </p>
        </div>

        {/* Horizontal Specimen Selector */}
        <div
          role="tablist"
          aria-label="Select tree or seed specification"
          className="flex flex-wrap gap-2 pt-2"
        >
          {NURSERY_INVENTORY.map((item) => {
            const isActive = item.id === activeItem.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectItem(item.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1F5137] text-white border-[#1F5137]'
                    : 'bg-[#FFFFFF] text-[#4A5D50] border-[#E2E8E2] hover:border-[#16241B] hover:text-[#16241B]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contiguous Specimen Overview & Technical Spec Table */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E2E8E2] bg-[#EFF3EF]">
            <SafeImage
              src={activeItem.image}
              alt={`${activeItem.name} specimen`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-xs text-[#4A5D50]">{activeItem.category}</div>
                <div className="font-mono text-2xl font-medium text-[#16241B] tabular-nums">
                  ${activeItem.price}
                </div>
              </div>
              <span className="text-xs font-medium text-[#1F5137] tabular-nums">
                {activeItem.stockStatus} · {activeItem.stockCount} available
              </span>
            </div>

            <div className="text-xs text-[#4A5D50]">
              Best suited for: <span className="text-[#16241B] font-medium">{activeItem.bestFor}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onToggleShortlist(activeItem.id)}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#16241B] text-white'
                    : 'bg-[#1F5137] text-white hover:bg-[#163B28]'
                }`}
              >
                {isShortlisted && <Check className="w-3.5 h-3.5" />}
                {isShortlisted ? 'Added to Visit List' : 'Reserve for Store Visit'}
              </button>

              <a
                href={careWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#1F5137] bg-[#EFF3EF] hover:bg-[#E2E8E2] rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="text-xs text-[#4A5D50]">
              {activeItem.category} · {activeItem.unitLabel}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#16241B] tracking-tight">
              {activeItem.name}
            </h2>
            <p className="text-sm text-[#4A5D50] leading-relaxed">
              {activeItem.shortSummary}
            </p>
          </div>

          {/* Tabular Botanical Specifications */}
          <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 bg-[#EFF3EF] border-b border-[#E2E8E2] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#16241B]">
                Botanical &amp; Site Specifications
              </h3>
              <span className="text-xs font-mono text-[#4A5D50] tabular-nums">
                {activeItem.specs.hardinessZones}
              </span>
            </div>
            <dl className="divide-y divide-[#E2E8E2]">
              {specRows.map((row) => (
                <div
                  key={row.label}
                  className="px-5 py-3 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm"
                >
                  <dt className="sm:col-span-4 text-xs font-medium text-[#4A5D50]">
                    {row.label}
                  </dt>
                  <dd className="sm:col-span-8 text-[#16241B] font-mono text-xs sm:text-[13px] tabular-nums">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 01. Regular Seasonal Maintenance Steps */}
      <section className="space-y-6">
        <div className="space-y-1.5 border-b border-[#E2E8E2] pb-4">
          <div className="font-mono text-xs font-medium text-[#1F5137] tabular-nums">
            01. Annual Care Calendar
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#16241B] tracking-tight">
            Regular maintenance steps for {activeItem.name}.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeItem.maintenanceSteps.map((step) => (
            <div
              key={step.season}
              className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1F5137]">{step.season}</span>
                <span className="font-mono text-[#4A5D50] tabular-nums">{step.window}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#16241B]">
                {step.taskTitle}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4A5D50] leading-relaxed">
                {step.instructions}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 02. Keeping & Establishment Techniques */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <div className="font-mono text-xs font-medium text-[#1F5137] tabular-nums">
              02. Nursery Field Techniques
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#16241B] tracking-tight">
              Keeping &amp; root-establishment protocol.
            </h2>
            <p className="text-sm text-[#4A5D50] leading-relaxed">
              Most young tree losses come from planting too deep or watering shallowly at the trunk. Follow these four nursery-verified keeping practices.
            </p>
          </div>

          <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#E2E8E2] bg-[#EFF3EF]">
            <SafeImage
              src={NURSERY_IMAGES.carePlanting}
              alt="Horticulturist shaping fine bark mulch around exposed tree root flare"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1F5137] hover:text-[#163B28] transition-colors cursor-pointer"
          >
            Bring soil photos to a guided consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {activeItem.keepingTechniques.map((tech) => (
            <div
              key={tech.number}
              className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-medium text-[#1F5137] tabular-nums">
                    {tech.number}.
                  </span>
                  <span className="font-mono text-[#4A5D50] tabular-nums">
                    {tech.metric}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#16241B]">
                  {tech.title}
                </h3>
                <p className="text-sm text-[#4A5D50] leading-relaxed">
                  {tech.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
