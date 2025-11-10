export const routes = {
  publicRoutes: {
    home: "/",
    faqs: "/faqs",
    pricing: "/pricing",
    contactUs: "/contact-us",
    adminLogin: "/admin/login",
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
