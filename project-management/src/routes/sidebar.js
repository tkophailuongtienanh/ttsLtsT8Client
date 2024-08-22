/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/users", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Người dùng", // name that appear in Sidebar
    role: [6],
  },
  {
    path: "/app/team", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Phòng ban", // name that appear in Sidebar
    role: [6],
  },
  {
    path: "/app/projects", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Dự án", // name that appear in Sidebar
    // role:[6]
  },
  {
    path: "/app/customers", // the url
    icon: "PeopleIcon", // the component being exported from icons/index.js
    name: "Khách hàng", // name that appear in Sidebar
    // role: [6],
  },
  {
    path: "/app/forms",
    icon: "FormsIcon",
    name: "Forms",
  },
  {
    path: "/app/cards",
    icon: "CardsIcon",
    name: "Cards",
  },
  {
    path: "/app/charts",
    icon: "ChartsIcon",
    name: "Charts",
  },
  {
    path: "/app/buttons",
    icon: "ButtonsIcon",
    name: "Buttons",
  },
  {
    path: "/app/modals",
    icon: "ModalsIcon",
    name: "Modals",
  },
  {
    path: "/app/tables",
    icon: "TablesIcon",
    name: "Tables",
  },
  {
    icon: "PagesIcon",
    name: "Pages",
    routes: [
      // submenu
      {
        path: "/login",
        name: "Login",
      },
      {
        path: "/create-account",
        name: "Create account",
      },
      {
        path: "/forgot-password",
        name: "Forgot password",
      },
      {
        path: "/app/404",
        name: "404",
      },
      {
        path: "/app/blank",
        name: "Blank",
      },
    ],
  },
];

export default routes;
