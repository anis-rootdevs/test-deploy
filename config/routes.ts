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
      faq: {
        home: `/admin/faqs`,
      },
      notification: `/admin/notification`,
      contact: `/admin/contact`,
      newsletter: `/admin/newsletter`,
      settings: `/admin/settings`,
    },
  },
};
