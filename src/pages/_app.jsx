import Head from "next/head";
import React, { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '~/contexts/AuthContext';
import '../styles/ReactToastify.css';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "~/assets/css/nextjs-argon-dashboard.css";
import "~/assets/plugins/nucleo/css/nucleo.css";

export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/pwabuilder-sw.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return (<AuthProvider>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>smartEAD</title>
    </Head>
    <Component {...pageProps} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </AuthProvider>)



}
