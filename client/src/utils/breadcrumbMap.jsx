export const breadcrumbMap = {
  "/dashboard": [
    { label: "Dashboard", path: "/dashboard" },
  ],

  "/create": [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Create Poll", path: "/create" },
  ],

  "/poll/:slug": [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Poll", path: null },
  ],

  "/poll/:slug/results": [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Results", path: null },
  ],

  "/dashboard/poll/:pollId/analytics": [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Analytics", path: null },
  ],
};