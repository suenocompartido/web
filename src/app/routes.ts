import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";
import { Transparencia } from "./pages/Transparencia";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path: "transparencia", Component: Transparencia },
        { path: "privacidad", Component: PrivacyPolicy },
      ],
    },
  ],
  {
    basename: "/web",
  },
);
