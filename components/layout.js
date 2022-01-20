import Head from 'next/head';
import Navbar from './navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Head>
      <title>TAKA</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Navbar />
      <div className='page-content'>
        {children}
      </div>
    </div>
  )
}
