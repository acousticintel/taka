import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import { ProvideData } from '../context/dataContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ProvideData>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProvideData>
    </SessionProvider>
  )
}

export default MyApp
