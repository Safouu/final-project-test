import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ isLoggedIn, isAdmin }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
