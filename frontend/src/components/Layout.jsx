import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = ({ isLoggedIn, isAdmin }) => {
  return (
    <>
    <div className='layout'>

      <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      
      <main>
        <Outlet />
      </main>

      <Footer/>

    </div>

    </>
  );
};

export default Layout;
