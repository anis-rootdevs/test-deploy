import React, { useState } from "react";
import Image from "next/image";

// Types
interface Topping {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface IceLevel {
  id: number;
  label: string;
  icon: string;
  value: number;
}

interface ToppingsSectionProps {
  toppings?: Topping[];
  iceLevels?: IceLevel[];
  onToppingChange?: (toppingIds: number[]) => void;
  onIceLevelChange?: (level: number) => void;
  onSugarLevelChange?: (level: number) => void;
}

const ToppingsSection: React.FC<ToppingsSectionProps> = ({
  toppings = [
    {
      id: 1,
      name: "Bubble",
      price: 0.5,
      image: "/images/menu-items/cold-coffee-topins.svg",
    },
    {
      id: 2,
      name: "Jelly",
      price: 1.5,
      image: "/images/menu-items/cold-coffee-topins.svg",
    },
  ],
  iceLevels = [
    { id: 1, label: "No ice", icon: "☕", value: 0 },
    { id: 2, label: "Less ice", icon: "🧊", value: 25 },
    { id: 3, label: "Normal ice", icon: "🧊", value: 50 },
    { id: 4, label: "More ice", icon: "🧊", value: 75 },
  ],
  onToppingChange,
  onIceLevelChange,
  onSugarLevelChange,
}) => {
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [selectedIceLevel, setSelectedIceLevel] = useState<number>(50);
  const [selectedSugarLevel, setSelectedSugarLevel] = useState<number>(50);

  const handleToppingToggle = (toppingId: number) => {
    const newSelection = selectedToppings.includes(toppingId)
      ? selectedToppings.filter((id) => id !== toppingId)
      : [...selectedToppings, toppingId];

    setSelectedToppings(newSelection);
    onToppingChange?.(newSelection);
  };

  const handleIceLevelClick = (level: number) => {
    setSelectedIceLevel(level);
    onIceLevelChange?.(level);
  };

  const handleSugarLevelClick = (level: number) => {
    setSelectedSugarLevel(level);
    onSugarLevelChange?.(level);
  };

  return (
    <div className="w-full   rounded-lg border border-[#E2E2E2] p-6">
      {/* Toppings Section */}
      <div className="mb-8">
        <h3 className="md:text-xl text-lg font-medium font-jost mb-2.5">
          Toppings
        </h3>
        <div className="border-t border-dashed border-[#1B2A41] pt-4 space-y-3">
          {toppings.map((topping) => (
            <label
              key={topping.id}
              className="flex items-center justify-between cursor-pointer  p-2 rounded transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* <input
                  type="checkbox"
                  checked={selectedToppings.includes(topping.id)}
                  onChange={() => handleToppingToggle(topping.id)}
                  className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                /> */}
                <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100">
                  <img
                    src={topping.image}
                    alt={topping.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="md:text-xl text-base font-jost font-medium">
                  {topping.name}
                </span>
              </div>
              <span className="w-full border-dashed border-t  mx-8"></span>
              <span className="md:text-xl text-base font-jost font-medium">
                ${topping.price.toFixed(2)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Ice Level Section */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-2.5">Ice Level</h3>
        <div className="border-t border-dashed border-[#1B2A41] pt-4">
          <div className="flex justify-between items-center mb-3">
            {iceLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => handleIceLevelClick(level.value)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  selectedIceLevel === level.value
                    ? "scale-110"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <span className="text-2xl">{level.icon}</span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="flex-1 bg-amber-400"></div>
              <div className="flex-1 bg-gray-800"></div>
              <div className="flex-1 bg-blue-400"></div>
              <div className="flex-1 bg-blue-600"></div>
            </div>
            <div
              className="absolute top-0 left-0 h-full w-1 bg-white border-2 border-gray-900 transition-all duration-300"
              style={{
                left: `${selectedIceLevel}%`,
                transform: "translateX(-50%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Sugar Level Section */}
      <div>
        <h3 className="text-xl font-medium mb-2.5">Sugar Level</h3>
        <div className="border-t border-dashed border-[#1B2A41] pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-[13px] font-medium font-jost text-center">
              No sugar
              <br />
              0%
            </span>
            <span className="text-[13px] font-medium font-jost text-center">
              Less sugar
              <br />
              25%
            </span>
            <span className="text-[13px] font-medium font-jost text-center">
              sugar
              <br />
              50%
            </span>
            <span className="text-[13px] font-medium font-jost text-center">
              More sugar
              <br />
              75%
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="relative h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = Math.round((x / rect.width) * 100);
              handleSugarLevelClick(Math.min(100, Math.max(0, percentage)));
            }}
          >
            <div className="absolute inset-0 flex">
              <div className="flex-1 bg-amber-400"></div>
              <div className="flex-1 bg-gray-800"></div>
              <div className="flex-1 bg-blue-400"></div>
              <div className="flex-1 bg-blue-600"></div>
            </div>
            <div
              className="absolute top-0 left-0 h-full w-1 bg-white border-2 border-gray-900 transition-all duration-300"
              style={{
                left: `${selectedSugarLevel}%`,
                transform: "translateX(-50%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ToppingsSection;
