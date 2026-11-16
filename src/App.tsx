import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NURSERY_INVENTORY, type PageRoute } from './data/nurseryData';
import { ContactVisitPage } from './pages/ContactVisitPage';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { SpecsCarePage } from './pages/SpecsCarePage';

const SHORTLIST_STORAGE_KEY = 'alder_canopy_visit_shortlist';

const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'Alder & Canopy Nursery – Specimen Trees, Seeds & Garden Planning',
  inventory: 'Plant & Seed Inventory – Alder & Canopy Nursery',
  care: 'Tree Specifications & Maintenance Guide – Alder & Canopy Nursery',
  contact: 'Book Store Visit & WhatsApp Care Desk – Alder & Canopy Nursery',
};

function getInitialRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'inventory' || hash === 'care' || hash === 'contact' || hash === 'home') {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageRoute>(getInitialRoute);
  const [selectedSpecId, setSelectedSpecId] = useState<string>(NURSERY_INVENTORY[0].id);
  const [shortlistIds, setShortlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SHORTLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((id): id is string => typeof id === 'string');
        }
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    document.title = PAGE_TITLES[activePage];
    if (window.location.hash !== `#${activePage}`) {
      window.history.replaceState(null, '', `#${activePage}`);
    }
  }, [activePage]);

  useEffect(() => {
    const onHashChange = () => {
      setActivePage(getInitialRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(shortlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [shortlistIds]);

  const handleNavigate = (page: PageRoute) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectSpec = (itemId: string) => {
    setSelectedSpecId(itemId);
    handleNavigate('care');
  };

  const handleToggleShortlist = (itemId: string) => {
    setShortlistIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleClearShortlist = () => {
    setShortlistIds([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#16241B]">
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        shortlistCount={shortlistIds.length}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onInspectSpec={handleInspectSpec}
            onToggleShortlist={handleToggleShortlist}
            shortlistIds={shortlistIds}
          />
        )}

        {activePage === 'inventory' && (
          <InventoryPage
            shortlistIds={shortlistIds}
            onToggleShortlist={handleToggleShortlist}
            onInspectSpec={handleInspectSpec}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'care' && (
          <SpecsCarePage
            selectedItemId={selectedSpecId}
            onSelectItem={setSelectedSpecId}
            shortlistIds={shortlistIds}
            onToggleShortlist={handleToggleShortlist}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'contact' && (
          <ContactVisitPage
            shortlistIds={shortlistIds}
            onToggleShortlist={handleToggleShortlist}
            onClearShortlist={handleClearShortlist}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
