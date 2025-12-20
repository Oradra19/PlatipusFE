import CheckIcon from "../../assets/centang2.png";
import RejectIcon from "../../assets/gagal.png";
import PendingIcon from "../../assets/pending.svg";

export type ReviewVariant =
  | "accepted-normal"
  | "accepted-fasttrack"
  | "rejected-normal"
  | "rejected-fasttrack"
  | "pending";

export const REVIEW_VARIANT_CONFIG = {
  "accepted-normal": {
    title: "Proposal Diterima",
    headerBg: "bg-[#071424]",
    headerBorder: "border-yellow-500",
    icon: CheckIcon,
    showComment: false,
  },
  "accepted-fasttrack": {
    title: "Proposal Diterima",
    headerBg: "bg-[#071424]",
    headerBorder: "border-yellow-500",
    icon: CheckIcon,
    showComment: true, // menampilkan feedback
  },
  "rejected-normal": {
    title: "Proposal Ditolak",
    headerBg: "bg-[#8B0000]",
    headerBorder: "border-transparent",
    icon: RejectIcon,
    showComment: false,
  },
  "rejected-fasttrack": {
    title: "Proposal Ditolak",
    headerBg: "bg-[#8B0000]",
    headerBorder: "border-transparent",
    icon: RejectIcon,
    showComment: true, // menampilkan feedback
  },
  pending: {
    title: "Menunggu Review",
    headerBg: "bg-gray-500",
    headerBorder: "border-transparent",
    icon: PendingIcon,
    showComment: false,
  },
};

// Ubah parameter kedua dari submissionType menjadi isFastTrack (boolean)
export const mapReviewVariant = (
  status?: string,
  isFastTrack?: boolean
): ReviewVariant => {
  const s = status?.toUpperCase();

  if (s === "PENDING") return "pending";

  if (s === "ACCEPTED") {
    return isFastTrack ? "accepted-fasttrack" : "accepted-normal";
  }

  if (s === "REJECTED") {
    return isFastTrack ? "rejected-fasttrack" : "rejected-normal";
  }

  return "pending";
};
