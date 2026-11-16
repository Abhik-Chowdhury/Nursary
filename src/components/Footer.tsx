import { MessageCircle } from 'lucide-react';
import { NURSERY_INFO, type PageRoute } from '../data/nurseryData';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickWhatsAppUrl = buildWhatsAppUrl(
    `Hello ${NURSERY_INFO.brandName}, I would like care guidance or stock availability for a garden project.`
  );

  return (
    <footer className="border-t border-[#E2E8E2] bg-[#FFFFFF] mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-3">
            <span className="font-display text-lg font-semibold text-[#16241B] block">
              {NURSERY_INFO.fullName}
            </span>
            <p className="text-sm text-[#4A5D50] max-w-md leading-relaxed">
              Field-grown specimen trees, native hedging, heritage fruit cultivars, and heirloom seeds conditioned for regional soils and long-term garden resilience.
            </p>
            <p className="text-xs text-[#4A5D50]">
              {NURSERY_INFO.address}
            </p>
            <p className="text-xs text-[#4A5D50] font-mono tabular-nums">
              {NURSERY_INFO.hours}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#16241B]">Nursery Pages</h3>
            <ul className="space-y-2 text-sm text-[#4A5D50]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#16241B] transition-colors cursor-pointer"
                >
                  Brand Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-[#16241B] transition-colors cursor-pointer"
                >
                  Plant &amp; Seed Inventory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('care')}
                  className="hover:text-[#16241B] transition-colors cursor-pointer"
                >
                  Tree Specs &amp; Care Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#16241B] transition-colors cursor-pointer"
                >
                  Book Store Visit &amp; Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#16241B]">Real-Time Care Desk</h3>
            <p className="text-sm text-[#4A5D50] font-mono tabular-nums">
              {NURSERY_INFO.phoneDisplay}
            </p>
            <p className="text-sm text-[#4A5D50]">
              {NURSERY_INFO.email}
            </p>
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1F5137] bg-[#EFF3EF] hover:bg-[#E2E8E2] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              Message Nursery on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E2E8E2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4A5D50]">
          <span>© {new Date().getFullYear()} {NURSERY_INFO.fullName}. All rights reserved.</span>
          <span>18 Acres Field-Grown · Willamette Valley Growing Zone</span>
        </div>
      </div>
    </footer>
  );
}
