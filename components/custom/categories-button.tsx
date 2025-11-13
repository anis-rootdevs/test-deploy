// Reusable Category Filter Component
interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  activeCategory?: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const CategoriesButton = ({
  categories,
  onCategoryChange,
  activeCategory,
  className = "",
  activeClassName = "bg-primary text-[#1B2A41]",
  inactiveClassName = "font-medium font-jost border border-[#E2E2E2] hover:border-primary text-base hover:text-primary",
}: CategoryFilterProps) => {
  return (
    <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-6 py-2.5 rounded font-medium text-sm md:text-base  duration-300 capitalize cursor-pointer
            ${activeCategory === category ? activeClassName : inactiveClassName}
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoriesButton;
