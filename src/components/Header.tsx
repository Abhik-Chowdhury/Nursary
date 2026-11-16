import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { type PageRoute } from '../data/nurseryData';

interface HeaderProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  shortlistCount: number;
}

const NAV_ITEMS: Array<{ id: PageRoute; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'care', label: 'Care & Specs' },
  { id: 'contact', label: 'Visit & Contact' },
];

export function Header({ activePage, onNavigate, shortlistCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAF8]/95 backdrop-blur-sm border-b border-[#E2E8E2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-xl font-semibold tracking-tight text-[#16241B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5137] cursor-pointer"
        >
          Alder &amp; Canopy
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F5137] ${
                  isActive
                    ? 'text-[#16241B] font-semibold'
                    : 'text-[#4A5D50] hover:text-[#16241B]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#1F5137] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F5137]"
          >
            {shortlistCount > 0 ? `Book Visit (${shortlistCount})` : 'Book Store Visit'}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#16241B] hover:bg-[#EFF3EF] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1F5137]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8E2] bg-[#FFFFFF] px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EFF3EF] text-[#16241B] font-semibold'
                    : 'text-[#4A5D50] hover:bg-[#F8FAF8] hover:text-[#16241B]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="w-full mt-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors cursor-pointer"
          >
            {shortlistCount > 0 ? `Book Store Visit (${shortlistCount})` : 'Book Store Visit'}
          </button>
        </div>
      )}
    </header>
  );
}
