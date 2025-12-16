export interface EventData {
  id: string;
  title: string;
  location: string;
  date: string;
  audience: string;
  tags: string[];
  logo: string;
  image?: string;
  isFastTrack: boolean;
  proposalId?: string;
  sponsorProfileId?: string;
}
