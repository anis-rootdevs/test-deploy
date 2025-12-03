export const routes = {
  publicRoutes: {
    home: "/",
    menu: "/menu",
    gallery: "/gallery",
    locations: "/locations",
    reserveTable: "/reserve-table",
    ourStory: "/our-story",
    adminLogin: "/admin/login",
    policy: "/policy",
  },
  privateRoutes: {
    admin: {
      dashboard: "/admin/dashboard",
      banner: {
        home: "/admin/dashboard/banner",
        create: "/admin/dashboard/banner/create",
        edit: (id: string) => `/admin/dashboard/banner/edit/${id}`,
      },
      products: {
        home: "/admin/dashboard/products",
        create: "/admin/dashboard/products/create",
        edit: (id: string) => `/admin/dashboard/products/edit/${id}`,
      },
      categories: "/admin/dashboard/categories",

      gallery: "/admin/dashboard/gallery",
      outlets: "/admin/dashboard/outlets",
      reserve: "/admin/dashboard/reserve",
      chef: "/admin/dashboard/chef",

      showcase: {
        shopShowcase: "/admin/dashboard/shop",
        storyShowcase: "/admin/dashboard/story",
        offerShowcase: "/admin/dashboard/offer",
        reservationShowcase: "/admin/dashboard/reservation",
      },
      notification: `/admin/notification`,
      contact: `/admin/contact`,
      newsletter: `/admin/newsletter`,
      settings: `/admin/settings`,
    },
  },
};
