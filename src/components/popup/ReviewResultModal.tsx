import { REVIEW_VARIANT_CONFIG, ReviewVariant } from "./reviewVariantConfig";

interface Props {
  open: boolean;
  onClose: () => void;
  variant: ReviewVariant;
  feedback?: string; // ganti dari comment menjadi feedback
}

const ReviewResultModal: React.FC<Props> = ({
  open,
  onClose,
  variant,
  feedback, // gunakan feedback
}) => {
  if (!open) return null;

  const config = REVIEW_VARIANT_CONFIG[variant];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-white z-10"
        >
          ✕
        </button>

        <div
          className={`py-4 text-center text-white font-semibold border-b-4 ${config.headerBg} ${config.headerBorder}`}
        >
          Hasil Review
        </div>

        <div className="flex flex-col items-center justify-center py-14">
          {config.icon && (
            <img src={config.icon} className="w-20 h-20 mb-6" />
          )}
          <h2 className="text-lg font-semibold text-[#071424]">
            {config.title}
          </h2>
        </div>

        {config.showComment && feedback && ( // tampilkan hanya jika ada feedback
          <div className={`${config.headerBg} px-6 py-6 text-white`}>
            <div className="flex items-center gap-2 mb-2">
              <span>💬</span>
              <p className="font-semibold text-sm">Tanggapan Perusahaan</p>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              {feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResultModal;
