import Head from 'next/head';
import Navbar from './navbar';
import SideMenu from '../layout/sideMenu';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <SideMenu />
      <Navbar />
      <div className='page-content'>
        {children}
      </div>
      <Footer />
    </>
  )
}
