// import "@/styles/globals.css";
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Nunito } from '@next/font/google';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => (
          <div className="content-wrapper">
            <ToastContainer />
            <Layout className={nunito.className}>
              <style jsx global>{`
                html,
                body,
                h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                p {
                  font-family: ${nunito.style.fontFamily};
                }
              `}</style>
              <Component {...pageProps} />
            </Layout>
          </div>
        )}
      </PersistGate>
    </Provider>
  );
}
