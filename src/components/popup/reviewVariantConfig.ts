import CheckIcon from "../../assets/centang2.png";
import RejectIcon from "../../assets/gagal.png";

export type ReviewVariant =
  | "accepted-normal"
  | "accepted-fasttrack"
  | "rejected-normal"
  | "rejected-fasttrack";

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
    showComment: true,
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
    showComment: true,
  },
};
