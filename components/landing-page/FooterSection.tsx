import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Icons } from "../custom/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const quickMenu = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Menu", href: "/menu" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reserve Table", href: "/reserve-table" },
];

const locations = [
  { name: "San Francisco", href: "#" },
  { name: "Newport Beach", href: "#" },
  { name: "Sun City", href: "#" },
];

const policy = [
  { name: "Reserve Policy", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Image Used Policy", href: "#" },
];

const galleryImages = [
  "/images/gallery/coffee-cup-with-chocolate-cake.svg",
  "/images/gallery/counter-with-espresso-machine-cafe.svg",
  "/images/gallery/hot-coffee-with-girl.svg",
  "/images/gallery/hot-coffee-with-girl.svg",
  "/images/gallery/hot-coffee-with-girl.svg",
  "/images/gallery/shop-process-making-coffee-is-shown.svg",
];

const FooterSection = () => {
  return (
    <footer className="w-full bg-[#E2E2E2] dark:bg-[#222831] text-[#2A2A2F] dark:text-[#FEFEFF] ">
      <div className="max-w-[1320px] mx-auto px-6 py-10 md:py-14">
        {/* ======= Footer Top ======= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Quick Menu */}
          <div>
            <h3 className="font-normal text-[15px] font-jost">Quick Menu</h3>
            <div className="w-[31px] my-[15px]">
              <Separator className="bg-primary h-[2px]" />
            </div>
            <ul className="md:space-y-6 space-y-4">
              {quickMenu.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-base font-jost hover:text-primary font-normal text-[#101020] dark:text-[#FEFEFF]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-normal text-[15px] font-jost">Our Locations</h3>
            <div className="w-[31px] my-[15px]">
              <Separator className="bg-primary h-[2px]" />
            </div>
            <ul className="md:space-y-6 space-y-4">
              {locations.map((loc, i) => (
                <li key={i}>
                  <Link
                    href={loc.href}
                    className="text-base font-jost hover:text-primary font-normal text-[#101020] dark:text-[#FEFEFF]"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-normal text-[15px] font-jost">Policy</h3>
            <div className="w-[31px] my-[15px]">
              <Separator className="bg-primary h-[2px]" />
            </div>
            <ul className="md:space-y-6 space-y-4">
              {policy.map((pol, i) => (
                <li key={i}>
                  <Link
                    href={pol.href}
                    className="text-base font-jost hover:text-primary font-normal text-[#101020] dark:text-[#FEFEFF]"
                  >
                    {pol.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-normal text-[15px] font-jost">Gallery</h3>
            <div className="w-[31px] my-[15px]">
              <Separator className="bg-primary h-[2px]" />
            </div>

            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {galleryImages.map((img, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4">
                      <div className="relative aspect-[74/67] overflow-hidden bg-white">
                        <Image
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          width={50}
                          height={50}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex items-center justify-between mt-5">
                  {/* See more link */}
                  <div className="">
                    <Link
                      href="/gallery"
                      className="text-[13px] font-jost font-normal hover:text-primary "
                    >
                      See more
                    </Link>
                  </div>
                  <div className="absolute -right-7">
                    <CarouselPrevious className="absolute left-auto right-10  bg-transparent hover:bg-transparent cursor-pointer dark:bg-transparent border-none dark:hover:bg-transparent" />
                    <CarouselNext className="absolute  right-3 bg-transparent hover:bg-transparent cursor-pointer dark:bg-transparent border-none dark:hover:bg-transparent" />
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>

        {/* ======= Footer Bottom ======= */}
        <div className=" mt-6 pt-6 text-center">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <h2 className="text-[31px] font-bold font-think uppercase mb-1">
              NEBER
            </h2>
            <p className="text-sm font-normal font-jost mb-4">
              Brewed with love, served with a smile.
            </p>
            <div className="w-[31px] my-[13px] ">
              <Separator className="bg-primary h-[2px]" />
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="#"
                className="p-2 bg-[#FAF8F5] dark:bg-[#181C20] text-[#1B2A41] dark:text-[#FEFEFF] rounded-full hover:bg-primary"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-[#FAF8F5] dark:bg-[#181C20] text-[#1B2A41] dark:text-[#FEFEFF] rounded-full hover:bg-primary"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-[#FAF8F5] dark:bg-[#181C20] text-[#1B2A41] dark:text-[#FEFEFF] rounded-full hover:bg-primary"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div className="mb-4">
            <Separator className="bg-[#FAF8F5] h-[1px] dark:bg-[#181C20]" />
          </div>

          {/* Copyright */}
          <p className="text-[13px] font-normal font-jost">
            © {new Date().getFullYear()} Neber | Powered by{" "}
            <span className="">Rootstream</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
