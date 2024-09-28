import React from "react";
import { NavLink } from "react-router-dom";

const dashboardNav = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Reports",
        path: "/dashboard/reports",
      },
      {
        name: "Manage Products",
        path: "/dashboard/manage-products",
      },
      {
        name: "Manage Transactions",
        path: "/dashboard/manage-transactions",
      }
    ],
  },
];

const Sidebar = () => {
  return (
    <>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2 ml-1 sm:ml-3">
                {dashboardNav.map((section) => (
                  <React.Fragment key={section.label}>
                    <div className="font-semibold text-sm">
                      <p>{section.label}</p>
                    </div>
                    {section.items.map((menu) =>
                      menu.sub_menu ? ("") : (
                        <li key={menu.name}>
                          <NavLink
                            to={menu.path}
                            className={({ isActive }) =>
                              `flex items-center p-2 text-md rounded-lg group ${
                                isActive
                                  ? "text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 font-semibold"
                                  : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`
                            }
                          >
                            <span className="ml-3">{menu.name}</span>
                          </NavLink>
                        </li>
                      )
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};



export default Sidebar;
