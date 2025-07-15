import { Outlet } from 'react-router';
import NavBar from '../widgets/navbar/NavBar';

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
        <NavBar />
      </main>
    </>
  );
}
