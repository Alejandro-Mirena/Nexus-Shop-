interface Review {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

const ReviewCard = ({ name, comment, rating }: Review) => {
  return (
    <div className="min-w-75 md:min-w-100 snap-center bg-white rounded-3xl p-6 shadow-sm border border-[#E8E8ED]">
      <span className="font-semibold text-[#1D1D1F]">{name}</span>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#6E6E73] mb-4 leading-relaxed">
          “{comment}”
        </p>
      </div>
      <span className="text-yellow-400 text-sm">{"★".repeat(rating)}</span>
    </div>
  );
};

export default ReviewCard;
