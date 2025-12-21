export interface EventData {
  id: string;
  title: string;
  location: string;
  date: string;
  audience: string;
  tags: string[];
  logo: string;
  image?: string;
  description?: string;
  proposalUrl?: string;
  isFastTrack: boolean;
  proposalSponsorId?: string;
  isFromIncoming: boolean;
  eventSponsorId?: string;
}
