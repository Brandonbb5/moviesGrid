import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
const Navbar = lazy(() => import('./components/navbar.tsx'));

// RootLayout: Este componente actúa como el contenedor principal para las rutas del router.
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
