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
        edit: (id: string | number) => `/admin/dashboard/banner/edit/${id}`,
      },

      categories: "/admin/dashboard/categories",
      products: "/admin/dashboard/products",
      outlets: "/admin/dashboard/outlets",
      notification: `/admin/notification`,
      contact: `/admin/contact`,
      newsletter: `/admin/newsletter`,
      settings: `/admin/settings`,
    },
  },
};
