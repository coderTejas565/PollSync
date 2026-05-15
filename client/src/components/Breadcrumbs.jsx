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
    <div className="px-6 py-3 bg-[#F8FAFC]/50 border-b border-[#E2E8F0] flex items-center gap-2 text-xs antialiased selection:bg-[#DBEAFE] selection:text-[#097FE8]">
      
      {/* Root Node Icon Anchor */}
      <div className="flex items-center text-[#94A3B8] shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>

      <span className="text-[#E2E8F0] select-none font-medium">/</span>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            
            {crumb.path ? (
              <Link
                to={crumb.path}
                className="text-[#64748B] hover:text-[#097FE8] font-bold uppercase tracking-wider text-[10px] transition-colors underline-offset-4 decoration-[#097FE8]/30 hover:underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-[#0F172A] font-black uppercase tracking-wider text-[10px] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                {crumb.label}
              </span>
            )}

            {!isLast && (
              <span className="text-[#94A3B8] select-none shrink-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;