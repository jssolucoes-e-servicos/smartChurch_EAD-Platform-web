import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import '../styles/ReactToastify.css';
import { theme } from '../styles/theme';

import { AuthProvider } from '../contexts/AuthContext';



export default function App({ Component, pageProps }: AppProps) {
  return (
    
      <AuthProvider>
        <ChakraProvider resetCSS theme={theme}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
          <ToastContainer />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>

  )
}
