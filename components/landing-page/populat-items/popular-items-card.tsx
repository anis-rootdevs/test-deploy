"use client";
import PopularItemsHome, { MenuItem } from "./popular-items-home";

const PopularItemsCard = () => {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      badge: "Most Loved by You",
      title: "The Aroma Bliss Platter",
      description:
        "Croissant, Chocolate Muffin, Buttery Cookies, Signature Latte",
      price: "$ 10.99",
      images: "/images/popular-items/directly-shot-coffee-cake-table.svg",
    },
    {
      id: 2,
      badge: "Most Loved by You",
      title: "Caramel Latte",
      description: " Espresso, Steamed Milk, Caramel Syrup, Whipped Cream",
      price: "$ 14.99",
      images:
        "/images/popular-items/iced-coffee-with-whipped-cream-chocolate.svg",
    },
    {
      id: 3,
      badge: "Most Loved by You",
      title: "Morning Boost Platter",
      description: "Mini Sandwiches, Fresh Fruit, Cappuccino, Biscotti",
      price: "$ 12.99",
      images: "/images/popular-items/two-coffee-black.svg",
    },
  ];

  const handleExploreClick = () => {
    console.log("Explore More Menu clicked!");
    // Add your navigation logic here
    // router.push('/menu');
  };
  return (
    <div>
      <PopularItemsHome items={menuItems} onExploreClick={handleExploreClick} />
    </div>
  );
};

export default PopularItemsCard;
