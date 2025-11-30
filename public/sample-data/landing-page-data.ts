import { routes } from "@/config/routes";
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  Settings2,
} from "lucide-react";
import { BsShop } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import { MdLibraryBooks } from "react-icons/md";
import { PiHamburgerDuotone } from "react-icons/pi";
import { SiCodechef } from "react-icons/si";
import { TbCategory, TbSlideshow } from "react-icons/tb";

// nav items
export const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Home2",
    href: "/home2",
  },
  {
    label: "Our Story",
    href: "/our-story",
  },
  {
    label: "Menu",
    href: "/menu",
  },
  {
    label: "Locations",
    href: "/locations",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Reserve Table",
    href: "/reserve-table",
  },
];
// feature products
export const customCategories = [
  { id: "2", name: "Article", slug: "article" },
  { id: "3", name: "Blog", slug: "blog" },
  { id: "4", name: "Cooking Tips", slug: "cookingtips" },
  { id: "5", name: "BreadMaking", slug: "breadmaking" },
  { id: "6", name: "Baker’sGuide", slug: "bakersguide" },
  { id: "7", name: "ArtisanBread", slug: "artisanbread" },
  { id: "8", name: "BakingSecrets", slug: "bakingsecrets" },
];

// menu items
export const menuItems = [
  {
    id: 1,
    name: "Caramel Latte",
    price: 6.99,
    description: "Espresso, steamed milk, caramel syrup, whipped cream",
    image: "/images/menu-items/caramel-lattle.svg",
    category: "sweets",
  },
  {
    id: 2,
    name: "Croissant",
    price: 3.5,
    description: "Buttery, flaky, baked fresh daily",
    image: "/images/menu-items/croissant-menu.svg",
    category: "sweets",
  },
  {
    id: 3,
    name: "The Aroma Bliss Platter",
    price: 9.9,
    description:
      "Croissant, chocolate muffin, buttery cookies, signature latte",
    image: "/images/menu-items/coffee-ice.svg",
    category: "coffee",
  },
  {
    id: 4,
    name: "Cold Brew",
    price: 2.25,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/iced-coffee.svg",
    category: "coffee",
  },
  {
    id: 5,
    name: "Cold Brew",
    price: 5.5,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/coffee-toast.svg",
    category: "snacks",
  },
  {
    id: 6,
    name: "Morning Boost",
    price: 4.5,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/morning-bost.svg",
    category: "snacks",
  },
  {
    id: 7,
    name: "Cold Coffee",
    price: 3.5,
    description: "Buttery, flaky, baked fresh daily",
    image: "/images/menu-items/croissant-menu.svg",
    category: "drinks",
  },
  {
    id: 8,
    name: "Hoe Brew",
    price: 5.5,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/coffee-toast.svg",
    category: "drinks",
  },
];

// visit page
export const visitProductData = {
  name: "THE AROMA BLISS PLATTER",
  description:
    "Croissant, Chocolate Muffin, Buttery Cookies, and a Signature Latte — all in one perfect cozy platter.",
  price: "$ 9.90",
  link: "#visit",
};
export const visitProductData2 = {
  name: "THE AROMA BLISS PLATTER",
  description:
    "Croissant, Chocolate Muffin, Buttery Cookies, and a Signature Latte — all in one perfect cozy platter.",
  link: "#visit",
};
export const visitProductDetails = {
  title: "CRAVING SOMETHING NEW?",
  description:
    "Our latest cozy platter brings freshly baked treats and a steaming cup of signature coffee together. Every bite and sip is made to warm your day.",
  image: "/images/visit-us/close-up-coffee-table.svg",
};
export const visitProductDetails2 = {
  title: "CRAVING SOMETHING NEW?",
  description:
    "Our latest cozy platter brings freshly baked treats and a steaming cup of signature coffee together. Every bite and sip is made to warm your day.",
  image: "/images/visit-us/high-angle-view-coffee-table.svg",
  price: "$ 9.90",
};

// cafes location
export const cafesLocationData = [
  {
    id: 1,
    title: "Brew & Bite Café – Dhanmondi",
    address: "House 27, Road 16 (New), Dhanmondi, Dhaka",
    phone: "+880 1712 345 678",
    image: "/images/locations/doughnut-pastry-bar-coffee-location.svg",
    openingHours: [
      { days: "Sunday to Thursday", hours: "10 AM - 9 PM" },
      { days: "Friday & Saturday", hours: "11 AM - 11 PM" },
    ],
  },
  {
    id: 2,
    title: "Brew & Bite Café – Gulshan",
    address: "House 45, Road 11, Gulshan-1, Dhaka",
    phone: "+880 1712 345 679",
    image: "/images/locations/doughnut-pastry-bar-coffee-location.svg",
    openingHours: [
      { days: "Sunday to Thursday", hours: "9 AM - 10 PM" },
      { days: "Friday & Saturday", hours: "10 AM - 12 AM" },
    ],
  },
];

export const galleryItems = [
  {
    src: "/images/gallery/close-up-iced-coffee-glass-table-restaurant.svg",
    quote: "Delicious coffee and freshly baked treats.",
    author: "– Rafiul H.",
  },
  {
    src: "/images/gallery/group-people-counter-shop.svg",
    quote: "Nice service and warm vibes!",
    author: "– Aisha R.",
  },
  {
    src: "/images/gallery/cropped-hands-people-gesturing-cappuccino-table.svg",
    quote: "Perfect spot to catch up with friends.",
    author: "– Nabila K.",
  },
  {
    src: "/images/gallery/midsection-woman-holding-coffee-cup-table.svg",
    quote: "Perfect self-love time with a cup of coffee.",
    author: "– Maya S.",
  },
  {
    src: "/images/gallery/coffee-cup.svg",
    quote: "Love the ambiance and friendly staff!",
    author: "– Sohana T.",
  },
];

export const popularMenuItems = [
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

// admin dashboard menu items
// This is sample data.
export const adminDashboardMenu = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Cafe Shop",
      logo: GalleryVerticalEnd,
      // plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Banner",
      url: routes.privateRoutes.admin.banner.home,
      icon: TbSlideshow,
    },
    {
      title: "Categories",
      url: routes.privateRoutes.admin.categories,
      icon: TbCategory,
    },
    {
      title: "Products",
      url: routes.privateRoutes.admin.products,
      icon: PiHamburgerDuotone,
    },
    {
      title: "Outlets",
      url: routes.privateRoutes.admin.outlets,
      icon: BsShop,
    },
    {
      title: "Gallery",
      url: routes.privateRoutes.admin.gallery,
      icon: FaImages,
    },
    {
      title: "Reserve Table",
      url: routes.privateRoutes.admin.reserve,
      icon: MdLibraryBooks,
    },
    {
      title: "Chef Shape",
      url: routes.privateRoutes.admin.chefShape,
      icon: SiCodechef,
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export const chefs = [
  {
    id: 1,
    image: "/images/chef-shape/chef-arif.svg",
    name: "CHEF ARIF RAHMAN",
    tagline: "CRAFTING COMFORT WITH EVERY CREATION.",
  },
  {
    id: 2,
    image: "/images/chef-shape/chef-rafiul.svg",
    name: "CHEF SARAH MITCHELL",
    tagline: "PASSION MEETS PERFECTION IN EVERY DISH.",
  },
  // {
  //   id: 3,
  //   image: "/images/chef-shape/chef-rafiul.svg",
  //   name: "CHEF MITCHELL SARAH ",
  //   tagline: "PASSION MEETS PERFECTION IN EVERY DISH.",
  // },
  // {
  //   id: 4,
  //   image: "/images/chef-shape/chef-arif.svg",
  //   name: "CHEF ARIF RAHMAN",
  //   tagline: "CRAFTING COMFORT WITH EVERY CREATION.",
  // },
];

// footer section link
export const quickMenu = [
  { name: "Home", href: routes.publicRoutes.home },
  { name: "Our Story", href: routes.publicRoutes.ourStory },
  { name: "Menu", href: routes.publicRoutes.menu },
  { name: "Gallery", href: routes.publicRoutes.gallery },
  { name: "Reserve Table", href: routes.publicRoutes.reserveTable },
];

export const locations = [
  { name: "San Francisco", href: routes.publicRoutes.locations },
  { name: "Newport Beach", href: routes.publicRoutes.locations },
  { name: "Sun City", href: routes.publicRoutes.locations },
];

export const policy = [
  { name: "Reserve Policy", href: routes.publicRoutes.policy },
  { name: "Privacy Policy", href: routes.publicRoutes.policy },
  { name: "Image Used Policy", href: routes.publicRoutes.policy },
];

export const galleryImages = [
  "/images/gallery/coffee-cup-with-chocolate-cake.svg",
  "/images/gallery/counter-with-espresso-machine-cafe.svg",
  "/images/gallery/hot-coffee-with-girl.svg",
  "/images/gallery/hot-coffee-with-girl.svg",
  "/images/gallery/hot-coffee-with-girl.svg",
  "/images/gallery/shop-process-making-coffee-is-shown.svg",
];

// our story value
export const valueItems = [
  {
    title: "Quality Beans",
    description: "Ethically sourced and freshly roasted for a richer taste.",
    image: "/images/story/beans.svg",
  },
  {
    title: "Warm Atmosphere",
    description: "A cozy space for comfort, connection, and calm.",
    image: "/images/story/atmosphere.svg",
  },
  {
    title: "Crafted with Care",
    description: "Every drink and bite is made by hand, with love.",
    image: "/images/story/care.svg",
  },
  {
    title: "Sustainable Choice",
    description: "We believe good coffee should be kind to the planet.",
    image: "/images/story/boiledCup.svg",
  },
];
