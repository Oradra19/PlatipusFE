import { mockProposal, type EventData } from "./mockEvent";

const STORAGE_KEY = "eo_events_data";

// Load data awal (gabung mock data + local storage)
export const getEvents = (): EventData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Jika kosong, inisialisasi dengan mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProposal));
  return mockProposal;
};

// Tambah Event Baru
export const addEvent = (newEvent: EventData) => {
  const events = getEvents();
  const updatedEvents = [newEvent, ...events];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents));
};

// Update Event
export const updateEvent = (updatedEvent: EventData) => {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }
};

// Get Single Event
export const getEventById = (id: string): EventData | undefined => {
  const events = getEvents();
  return events.find((e) => e.id === id);
};