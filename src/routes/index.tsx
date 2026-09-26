import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";

// Simple pages
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import UsersPage from "@/pages/UsersPage";
import ProfilePage from "@/pages/ProfilePage";

// Complex pages (Network)
/* import { BoxesPage } from "@/pages/network/BoxesPage";
import { PortsPage } from "@/pages/network/PortsPage";
import { CablesPage } from "@/pages/network/CablesPage";
import { NodesPage } from "@/pages/network/NodesPage"; */

export const router = createBrowserRouter([
  // Rutas Públicas / Auth
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Rutas Protegidas (Requieren Login)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "users", element: <UsersPage /> },
          { path: "profile", element: <ProfilePage /> },
          /*{ path: "clients", element: <ClientsPage /> }, */

          // Subrutas del módulo Network (GIS)
          {
            path: "network",
            children: [
              /* { path: "boxes", element: <BoxesPage /> },
              { path: "ports", element: <PortsPage /> },
              { path: "cables", element: <CablesPage /> },
              { path: "nodes", element: <NodesPage /> }, */
            ],
          },
        ],
      },
    ],
  },

  // Ruta 404 (Not Found)
  {
    path: "*",
    element: <div className="p-8 text-center">404 | Página no encontrada</div>,
  },
]);
