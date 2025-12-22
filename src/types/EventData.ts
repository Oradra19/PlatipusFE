export interface EventData {
  id: string;
  title: string;
  location: string;
  date: string;
  audience: string;
  tags: string[];
  logo: string | null;
  image?: string;
  description?: string;
  proposalUrl?: string;
  isFastTrack: boolean;
  proposalSponsorId?: string;
  isFromIncoming: boolean;
  eventSponsorId?: string;
  proposalStatus?: "PENDING" | "APPROVED" | "REJECTED";
  eoName?: string;
  eoPhoto?: string;
  category?: string;
}
