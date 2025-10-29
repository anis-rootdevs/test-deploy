import Link from "next/link";
import React from "react";

type LinkItem = {
  label: string;
  href: string;
};

interface FooterLinksSectionProps {
  title: string;
  links: LinkItem[];
}

const FooterLinksSection = ({ title, links = [] }: FooterLinksSectionProps) => {
  return (
    <div>
      <h3 className="text-sm helvetica-neue-regular text-center dark:text-[#9CA3AF] text-[#1F1F1F]/60">
        {title}
      </h3>

      <div className="flex items-center justify-between mt-3">
        {links.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-[15px] helvetica-neue-regular dark:text-[#9CA3AF] text-[#1F1F1F]/60  cursor-pointer transition-all duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterLinksSection;
