import { Home } from "lucide-react";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import { FaImages } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";

export default function NotFoundDemo() {
  const quickLinks = [
    {
      icon: Home,
      title: "Homepage",
      href: "/",
      bgColor: "bg-primary",
      iconColor: "text-white",
    },
    {
      icon: FaHistory,
      title: "Our Story",
      href: "/our-story",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: FaImages,
      title: "Our Gallery",
      href: "/gallery",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: GiKnifeFork,
      title: "Reserve Table",
      href: "/reserve-table",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-primary  mb-4">
            404 Not Found
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            Whoops! That page doesn't exist.
          </p>
        </div>

        {/* Search Bar */}
        {/* <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. Flowbite, components"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-600 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-primary hover:bg-primary dark:bg-primary dark:hover:bg-primary text-white font-medium rounded-lg transition-colors">
              Submit
            </button>
          </div>
        </div> */}

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-200 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`${link.bgColor} rounded-lg p-4 mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className={`h-6 w-6 ${link.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    {link.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
