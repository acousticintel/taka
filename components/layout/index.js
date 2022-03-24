import Head from "next/head";
import Navbar from "./navbar";
import Footer from "./footer";
import Banner from "./banner";
import SideMenu from "../layout/sideMenu";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>TAKA</title>
      </Head>
      <SideMenu />
      <Navbar />
      <Banner/>
      <div className="page-content">{children}</div>
      <Footer/>
    </>
  );
}
