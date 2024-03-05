import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  console.log(document.location);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>);
};

