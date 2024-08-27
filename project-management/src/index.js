import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import "./assets/css/index.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";
import { ToastProvider } from "./context/ToastContext";
import { Button, ConfigProvider, Input, Select, theme } from "antd";

// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm
          algorithm: theme.darkAlgorithm,

          // 2. Combine dark algorithm and compact algorithm
          components: {
            Select: {
              selectorBg: "#24262d",
            },
            Input: {
              colorBgContainer:"#24262d",
            },
            DatePicker: {
              colorBgContainer:"#24262d",
            },
            Modal:{
              contentBg: "#1a1c23",
              headerBg: "#1a1c23",
            },
            Card:{
              colorBgContainer : "#1a1c23"
            },
            Table:{
              colorBgContainer: "#1a1c23"
            },
            Button:{
              colorPrimary:"#7e3af2"
            }
          },
        }}
      >
        <Windmill dark usePreferences>
          <ToastProvider>
            <App />
          </ToastProvider>
        </Windmill>
      </ConfigProvider>
    </Suspense>
  </SidebarProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
