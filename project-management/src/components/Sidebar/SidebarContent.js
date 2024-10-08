import React from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";
import Cookie from "js-cookie";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const roles = JSON.parse(Cookie.get("role"));
  const displayRoute = (rolesRequires) => {
    if (!roles || !Array.isArray(roles)) {
      return false; // roles is undefined or not an array
    }
    return rolesRequires.some((role) => roles.includes(role));
  };
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a
        className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="#"
      >
        Windmill
      </a>
      <ul className="mt-6">
        {routes.map((route) => {
          return route.role == null || displayRoute(route.role) ? (
            route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              <li className="relative px-6 py-3" key={route.name}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? "text-gray-800 dark:text-gray-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                          aria-hidden="true"
                        ></span>
                      )}
                      <Icon
                        className="w-5 h-5"
                        aria-hidden="true"
                        icon={route.icon}
                      />
                      <span className="ml-4">{route.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            )
          ) : null;
        })}
      </ul>
      <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
