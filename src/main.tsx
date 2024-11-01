import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";

import "./index.scss";
import mainStyles from "./main.module.scss";
import commonStyles from "./common-styles/common-styles.module.scss";

import TimersView from "./views/Timers/TimersView.tsx";
import DocumentationView from "./views/DocumentationView";
import NavMenu from "./components/menus/NavMenu/NavMenu.tsx";
import ListMenu from "./components/menus/ListMenu/ListMenu.tsx";

const PageIndex = () => {
  return (
    <main className={`${mainStyles.mainContainer} ${commonStyles.flexVertCenter} ${commonStyles.flexVert} ${commonStyles.flexHorzCenter}`} >
      <NavMenu>
        <ListMenu menuItems={[
            {label: "Timers", link: "/", iconName:"timers"},
            {label: "Documentation", link: "/docs", iconName:"tabata"},
        ]}/>
      </NavMenu>
      <Outlet/>
    </main>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <PageIndex/>,
    children: [
      {
        index: true,
        element: <TimersView/>,
      },
      {
        path: "/docs",
        element: <DocumentationView />,
      },
    ],
  },
]);

// biome-ignore lint/style/noNonNullAssertion: root html element is there
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
