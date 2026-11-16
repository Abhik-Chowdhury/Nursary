import { NURSERY_INFO, type NurseryItem } from '../data/nurseryData';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${NURSERY_INFO.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function formatShortlistSummary(items: NurseryItem[]): string {
  if (items.length === 0) return 'None selected yet';
  return items.map((item) => `• ${item.name} (${item.botanicalName}) — $${item.price}`).join('\n');
}

export function buildCareWhatsAppMessage(item: NurseryItem, customQuestion?: string): string {
  const base = `Hello ${NURSERY_INFO.brandName} team, I am reviewing the ${item.name} (${item.botanicalName}) specs on your website.`;
  if (customQuestion && customQuestion.trim().length > 0) {
    return `${base}\n\nCare question: ${customQuestion.trim()}`;
  }
  return `${base}\n\nCould you share planting suitability or current container photos?`;
}

export function buildBookingWhatsAppMessage(params: {
  bookingCode: string;
  name: string;
  phone: string;
  dateLabel: string;
  timeLabel: string;
  consultationTitle: string;
  shortlist: NurseryItem[];
  notes: string;
}): string {
  const lines = [
    `Hello ${NURSERY_INFO.brandName}, I booked a store visit (${params.bookingCode}).`,
    `Name: ${params.name}`,
    `Phone: ${params.phone}`,
    `Slot: ${params.dateLabel} at ${params.timeLabel}`,
    `Session: ${params.consultationTitle}`,
  ];
  if (params.shortlist.length > 0) {
    lines.push('', 'Reserved Visit List:', formatShortlistSummary(params.shortlist));
  }
  if (params.notes.trim()) {
    lines.push('', `Garden Notes: ${params.notes.trim()}`);
  }
  return lines.join('\n');
}

export function buildInquiryWhatsAppMessage(params: {
  name: string;
  topic: string;
  plantName: string;
  message: string;
}): string {
  return [
    `Hello ${NURSERY_INFO.brandName}, I have a ${params.topic} inquiry.`,
    `Name: ${params.name}`,
    params.plantName ? `Plant / Seed: ${params.plantName}` : null,
    `Message: ${params.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}
