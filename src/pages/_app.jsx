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
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "aa8bc1e7-4616-4f17-adc7-740af7a1628e",
        //safari_web_id: "web.onesignal.auto.364542e4-0165-4e49-b6eb-0136f3f4eaa9",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });
    return () => {
      window.OneSignal = undefined;
    };
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
