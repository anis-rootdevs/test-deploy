import Image from "next/image";

interface MenuItemCardProps {
  image: string;
  title: string;
  description: string;
  price: string | number;
  className?: string;
  imageClassName?: string;
  onClickCard?: () => void;
  priceClassName?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  image,
  title,
  description,
  price,
  className = "",
  imageClassName = "",
  onClickCard,
  priceClassName,
}) => {
  const formattedPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : price;

  return (
    <div
      className={`h-[164px] overflow-hidden group cursor-pointer  ${className}`}
      onClick={onClickCard}
    >
      <div className="p-0">
        <div className="flex items-center gap-4">
          {/* Image Section */}
          <div className="relative  flex-shrink-0 h-[164px] w-[150px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={100}
              height={100}
              className={`object-cover h-full w-full transition-transform  ${imageClassName}`}
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex items-start justify-between px-4">
            {/* Title and Price Row */}
            <div className="flex flex-col items-start justify-between gap-2 mb-2">
              <h3 className="font-jost font-medium  text-base md:text-[20px]">
                {title}
              </h3>
              {/* Description */}
              <p className="font-jost text-sm md:text-base  line-clamp-2">
                {description}
              </p>
            </div>

            <span
              className={`font-jost font-semibold  text-base md:text-[20px] whitespace-nowrap ${priceClassName}`}
            >
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
