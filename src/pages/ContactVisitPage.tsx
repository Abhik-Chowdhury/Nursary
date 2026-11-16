import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Calendar, Check, Clock, Copy, MapPin, MessageCircle, Phone, Trash2 } from 'lucide-react';
import {
  CONSULTATION_OPTIONS,
  getUpcomingVisitDates,
  NURSERY_INFO,
  NURSERY_INVENTORY,
  VISIT_TIME_SLOTS,
  type PageRoute,
} from '../data/nurseryData';
import {
  buildBookingWhatsAppMessage,
  buildInquiryWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

interface ContactVisitPageProps {
  shortlistIds: string[];
  onToggleShortlist: (itemId: string) => void;
  onClearShortlist: () => void;
  onNavigate: (page: PageRoute) => void;
}

interface ConfirmedBooking {
  bookingCode: string;
  name: string;
  phone: string;
  email: string;
  dateLabel: string;
  timeLabel: string;
  consultationTitle: string;
  notes: string;
  itemNames: string[];
}

const BOOKING_STORAGE_KEY = 'alder_canopy_latest_booking';

export function ContactVisitPage({
  shortlistIds,
  onToggleShortlist,
  onClearShortlist,
  onNavigate,
}: ContactVisitPageProps) {
  const upcomingDates = useMemo(() => getUpcomingVisitDates(), []);
  const shortlistedItems = useMemo(
    () => NURSERY_INVENTORY.filter((item) => shortlistIds.includes(item.id)),
    [shortlistIds]
  );

  // Appointment scheduler state
  const [consultationId, setConsultationId] = useState(CONSULTATION_OPTIONS[1].id);
  const [selectedDateIso, setSelectedDateIso] = useState(upcomingDates[0]?.iso ?? '');
  const [selectedTimeId, setSelectedTimeId] = useState(VISIT_TIME_SLOTS[1].id);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [yardNotes, setYardNotes] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(() => {
    try {
      const saved = localStorage.getItem(BOOKING_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ConfirmedBooking) : null;
    } catch {
      return null;
    }
  });

  // WhatsApp Inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryTopic, setInquiryTopic] = useState('Care & Maintenance Guidance');
  const [inquiryPlant, setInquiryPlant] = useState(NURSERY_INVENTORY[0].name);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (copiedMessage) {
      const timer = setTimeout(() => setCopiedMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedMessage]);

  const activeDateObj =
    upcomingDates.find((d) => d.iso === selectedDateIso) ?? upcomingDates[0];
  const activeTimeObj =
    VISIT_TIME_SLOTS.find((t) => t.id === selectedTimeId) ?? VISIT_TIME_SLOTS[0];
  const activeConsultation =
    CONSULTATION_OPTIONS.find((c) => c.id === consultationId) ?? CONSULTATION_OPTIONS[0];

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (visitorName.trim().length < 2) {
      setBookingError('Please enter your full name so we can reserve your consultation.');
      return;
    }
    const digits = visitorPhone.replace(/\D/g, '');
    if (digits.length < 7) {
      setBookingError('Please enter a valid phone or WhatsApp number (at least 7 digits).');
      return;
    }
    if (visitorEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail.trim())) {
      setBookingError('Please enter a valid email address or leave email blank.');
      return;
    }

    const code = `AC-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: ConfirmedBooking = {
      bookingCode: code,
      name: visitorName.trim(),
      phone: visitorPhone.trim(),
      email: visitorEmail.trim(),
      dateLabel: `${activeDateObj.dayName}, ${activeDateObj.label}`,
      timeLabel: activeTimeObj.label,
      consultationTitle: activeConsultation.title,
      notes: yardNotes.trim(),
      itemNames: shortlistedItems.map((i) => i.name),
    };

    try {
      localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage quota issues
    }
    setConfirmedBooking(record);
  };

  const formattedInquiryPreview = buildInquiryWhatsAppMessage({
    name: inquiryName.trim() || 'Prospective Gardener',
    topic: inquiryTopic,
    plantName: inquiryPlant,
    message:
      inquiryMessage.trim() ||
      'Looking for advice on sunlight placement and watering cadence.',
  });

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    setInquiryError('');

    if (inquiryName.trim().length < 2) {
      setInquiryError('Please enter your name before opening WhatsApp support.');
      return;
    }
    if (inquiryMessage.trim().length < 8) {
      setInquiryError('Please describe your plant question or yard dimensions (at least 8 characters).');
      return;
    }

    setInquirySubmitted(true);
  };

  const handleCopyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(formattedInquiryPreview);
      setCopiedMessage(true);
    } catch {
      setCopiedMessage(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-2 border-b border-[#E2E8E2] pb-8 max-w-2xl">
        <p className="text-xs font-medium text-[#4A5D50]">
          Store Visit Scheduling &amp; Real-Time WhatsApp Support
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#16241B] text-balance">
          Book your nursery slot or ask a horticulturist.
        </h1>
        <p className="text-sm sm:text-base text-[#4A5D50] leading-relaxed">
          Reserve a 1-on-1 store visit to inspect specimen trees and seeds in person, or message our care desk directly on WhatsApp for real-time planting guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Store Visit Appointment Scheduler */}
        <section className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8E2] pb-4">
            <div className="space-y-1">
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#16241B]">
                Store Visit &amp; Garden Planning Slot
              </h2>
              <p className="text-xs text-[#4A5D50]">
                No deposit required · Your Visit List trees will be staged for inspection
              </p>
            </div>
            <Calendar className="w-5 h-5 text-[#1F5137] shrink-0" />
          </div>

          {confirmedBooking ? (
            <div className="bg-[#EFF3EF] border border-[#E2E8E2] rounded-xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F5137]">
                    <Check className="w-4 h-4" />
                    <span>Visit Confirmed · {confirmedBooking.bookingCode}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#16241B]">
                    We have reserved your slot, {confirmedBooking.name}.
                  </h3>
                </div>
              </div>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-b border-[#E2E8E2] py-4">
                <div>
                  <dt className="text-xs text-[#4A5D50]">Consultation</dt>
                  <dd className="font-medium text-[#16241B]">
                    {confirmedBooking.consultationTitle}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#4A5D50]">Date &amp; Time</dt>
                  <dd className="font-mono text-xs sm:text-sm font-medium text-[#16241B] tabular-nums">
                    {confirmedBooking.dateLabel} · {confirmedBooking.timeLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#4A5D50]">Contact Number</dt>
                  <dd className="font-mono text-xs sm:text-sm text-[#16241B] tabular-nums">
                    {confirmedBooking.phone}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#4A5D50]">Staged Plants &amp; Seeds</dt>
                  <dd className="text-xs text-[#16241B]">
                    {confirmedBooking.itemNames.length > 0
                      ? confirmedBooking.itemNames.join(', ')
                      : 'Open nursery walk'}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl(
                    buildBookingWhatsAppMessage({
                      bookingCode: confirmedBooking.bookingCode,
                      name: confirmedBooking.name,
                      phone: confirmedBooking.phone,
                      dateLabel: confirmedBooking.dateLabel,
                      timeLabel: confirmedBooking.timeLabel,
                      consultationTitle: confirmedBooking.consultationTitle,
                      shortlist: shortlistedItems,
                      notes: confirmedBooking.notes,
                    })
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send Slot Details to WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setConfirmedBooking(null)}
                  className="px-4 py-2.5 text-xs font-medium text-[#16241B] bg-[#FFFFFF] border border-[#E2E8E2] hover:bg-[#F8FAF8] rounded-lg transition-colors cursor-pointer"
                >
                  Modify or Book Another Slot
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} noValidate className="space-y-6">
              {/* Step 1: Consultation Type */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-[#16241B]">
                  1. Select Consultation Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CONSULTATION_OPTIONS.map((option) => {
                    const active = consultationId === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setConsultationId(option.id)}
                        className={`text-left p-3.5 rounded-lg border transition-colors cursor-pointer space-y-1 ${
                          active
                            ? 'bg-[#EFF3EF] border-[#1F5137]'
                            : 'bg-[#FFFFFF] border-[#E2E8E2] hover:border-[#4A5D50]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#16241B]">
                            {option.title}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-[#1F5137] tabular-nums">
                          {option.duration}
                        </div>
                        <p className="text-[11px] text-[#4A5D50] leading-snug">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[#16241B]">
                    2. Choose Visit Day (Closed Mondays)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {upcomingDates.map((d) => {
                      const active = d.iso === selectedDateIso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => setSelectedDateIso(d.iso)}
                          className={`p-2 rounded-lg border text-center transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#1F5137] text-white border-[#1F5137]'
                              : 'bg-[#FFFFFF] text-[#16241B] border-[#E2E8E2] hover:border-[#1F5137]'
                          }`}
                        >
                          <div className="text-[11px] opacity-80">{d.dayName}</div>
                          <div className="font-mono text-xs font-medium tabular-nums">
                            {d.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[#16241B]">
                    3. Choose Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {VISIT_TIME_SLOTS.map((slot) => {
                      const active = slot.id === selectedTimeId;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeId(slot.id)}
                          className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#1F5137] text-white border-[#1F5137]'
                              : 'bg-[#FFFFFF] text-[#16241B] border-[#E2E8E2] hover:border-[#1F5137]'
                          }`}
                        >
                          <div className="font-mono text-xs font-medium tabular-nums">
                            {slot.label}
                          </div>
                          <div className="text-[11px] opacity-80 tabular-nums">
                            {slot.remaining} {slot.remaining === 1 ? 'slot' : 'slots'} open
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Staged Visit List Preview */}
              <div className="bg-[#F8FAF8] border border-[#E2E8E2] rounded-lg p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#16241B]">
                    Reserved Plants &amp; Seeds ({shortlistedItems.length})
                  </span>
                  <div className="flex items-center gap-3">
                    {shortlistedItems.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearShortlist}
                        className="text-xs text-[#4A5D50] hover:text-[#16241B] cursor-pointer"
                      >
                        Clear all
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onNavigate('inventory')}
                      className="text-xs font-medium text-[#1F5137] hover:underline cursor-pointer"
                    >
                      {shortlistedItems.length > 0 ? 'Edit in Inventory' : 'Add from Inventory'}
                    </button>
                  </div>
                </div>

                {shortlistedItems.length === 0 ? (
                  <p className="text-xs text-[#4A5D50]">
                    No items reserved yet. You can walk the nursery open-ended or pre-tag specimens on the Inventory page.
                  </p>
                ) : (
                  <ul className="divide-y divide-[#E2E8E2]">
                    {shortlistedItems.map((item) => (
                      <li
                        key={item.id}
                        className="py-2 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <span className="font-medium text-[#16241B]">{item.name}</span>
                          <span className="text-[#4A5D50]"> · ${item.price}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleShortlist(item.id)}
                          aria-label={`Remove ${item.name} from visit list`}
                          className="text-[#4A5D50] hover:text-[#16241B] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Visitor Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="visitor-name" className="block text-xs font-medium text-[#16241B]">
                    Full Name <span className="text-[#9A4E1C]">*</span>
                  </label>
                  <input
                    id="visitor-name"
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Elena Mercer"
                    className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="visitor-phone" className="block text-xs font-medium text-[#16241B]">
                    Phone / WhatsApp Number <span className="text-[#9A4E1C]">*</span>
                  </label>
                  <input
                    id="visitor-phone"
                    type="tel"
                    required
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="(555) 234-5678"
                    className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="visitor-email" className="block text-xs font-medium text-[#16241B]">
                  Email Address (for care sheet PDF)
                </label>
                <input
                  id="visitor-email"
                  type="email"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="yard-notes" className="block text-xs font-medium text-[#16241B]">
                  Garden Planning Notes (Sun exposure, soil type, or vehicle size)
                </label>
                <textarea
                  id="yard-notes"
                  rows={3}
                  value={yardNotes}
                  onChange={(e) => setYardNotes(e.target.value)}
                  placeholder="West-facing front yard, clay loam, looking for 2 shade trees + pollinator seed mix."
                  className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                />
              </div>

              {bookingError && (
                <div
                  role="alert"
                  className="px-3.5 py-2.5 text-xs font-medium text-[#9A4E1C] bg-[#FDF4EF] border border-[#F2D3C2] rounded-lg"
                >
                  {bookingError}
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors cursor-pointer"
              >
                Confirm Store Visit Slot
              </button>
            </form>
          )}
        </section>

        {/* Right Column: Real-Time WhatsApp Support & Nursery Location */}
        <aside className="lg:col-span-5 space-y-6">
          {/* WhatsApp Care & Inquiry Form */}
          <div className="bg-[#FFFFFF] border border-[#E2E8E2] rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E2E8E2] pb-4">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-semibold text-[#16241B]">
                  WhatsApp Care &amp; Stock Inquiry
                </h2>
                <p className="text-xs text-[#4A5D50]">
                  Real-time support from our nursery desk during open hours
                </p>
              </div>
              <MessageCircle className="w-5 h-5 text-[#1F5137] shrink-0" />
            </div>

            <form onSubmit={handleInquirySubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="inq-name" className="block text-xs font-medium text-[#16241B]">
                  Your Name <span className="text-[#9A4E1C]">*</span>
                </label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="Marcus Lindholm"
                  className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="inq-topic" className="block text-xs font-medium text-[#16241B]">
                    Inquiry Topic
                  </label>
                  <select
                    id="inq-topic"
                    value={inquiryTopic}
                    onChange={(e) => setInquiryTopic(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                  >
                    <option value="Care & Maintenance Guidance">Care &amp; Maintenance Guidance</option>
                    <option value="Live Stock & Container Size">Live Stock &amp; Container Size</option>
                    <option value="Garden Planning Question">Garden Planning Question</option>
                    <option value="Bulk / Landscape Order">Bulk / Landscape Order</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="inq-plant" className="block text-xs font-medium text-[#16241B]">
                    Related Tree or Seed
                  </label>
                  <select
                    id="inq-plant"
                    value={inquiryPlant}
                    onChange={(e) => setInquiryPlant(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                  >
                    {NURSERY_INVENTORY.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                    <option value="General Garden Advice">General Garden Advice</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-message" className="block text-xs font-medium text-[#16241B]">
                  Question or Care Symptom <span className="text-[#9A4E1C]">*</span>
                </label>
                <textarea
                  id="inq-message"
                  rows={3}
                  required
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Ask about frost protection, soil pH, or hold availability for pickup..."
                  className="w-full px-3 py-2 text-sm bg-[#FFFFFF] border border-[#E2E8E2] rounded-lg text-[#16241B] focus:outline-none focus:border-[#1F5137]"
                />
              </div>

              {inquiryError && (
                <div
                  role="alert"
                  className="px-3.5 py-2.5 text-xs font-medium text-[#9A4E1C] bg-[#FDF4EF] border border-[#F2D3C2] rounded-lg"
                >
                  {inquiryError}
                </div>
              )}

              {inquirySubmitted && (
                <div className="p-3.5 text-xs text-[#16241B] bg-[#EFF3EF] border border-[#E2E8E2] rounded-lg space-y-2.5">
                  <div className="font-semibold text-[#1F5137]">
                    Inquiry prepared for our nursery care desk:
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-[11px] text-[#4A5D50] bg-[#FFFFFF] border border-[#E2E8E2] rounded p-2.5">
                    {formattedInquiryPreview}
                  </pre>
                  <a
                    href={buildWhatsAppUrl(formattedInquiryPreview)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Open in WhatsApp
                  </a>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#1F5137] hover:bg-[#163B28] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Prepare WhatsApp Inquiry
                </button>
                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-[#16241B] bg-[#EFF3EF] hover:bg-[#E2E8E2] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedMessage ? 'Copied Message' : 'Copy Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Direct Nursery Location & Hours Card */}
          <div className="bg-[#EFF3EF] border border-[#E2E8E2] rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[#16241B]">
              Visit {NURSERY_INFO.fullName}
            </h3>
            <ul className="space-y-3 text-xs text-[#4A5D50]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1F5137] shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-[#16241B]">{NURSERY_INFO.address}</div>
                  <div className="mt-0.5">{NURSERY_INFO.loadingNote}</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#1F5137] shrink-0 mt-0.5" />
                <div className="font-mono tabular-nums text-[#16241B]">
                  {NURSERY_INFO.hours}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#1F5137] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono tabular-nums text-[#16241B]">
                    {NURSERY_INFO.phoneDisplay}
                  </span>
                  <span> · {NURSERY_INFO.email}</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
