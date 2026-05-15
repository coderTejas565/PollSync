import { Link, useLocation } from "react-router-dom";

const matchPath = (pattern, pathname) => {
  const patternParts = pattern.split("/");
  const pathParts = pathname.split("/");

  if (patternParts.length !== pathParts.length) return false;

  return patternParts.every((part, i) => {
    return part.startsWith(":") || part === pathParts[i];
  });
};

const getBreadcrumbs = (pathname) => {
  const routes = {
    "/dashboard": [
      { label: "Dashboard", path: "/dashboard" },
    ],

    "/create": [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Create Poll", path: null },
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

  for (const route in routes) {
    if (matchPath(route, pathname)) {
      return routes[route];
    }
  }

  return [];
};

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (!breadcrumbs.length) return null;

  return (
    <div className="px-6 py-3 text-sm text-gray-500 flex gap-2">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center gap-2">
          
          {crumb.path ? (
            <Link
              to={crumb.path}
              className="text-[#097FE8] hover:underline"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">
              {crumb.label}
            </span>
          )}

          {index !== breadcrumbs.length - 1 && (
            <span>/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;