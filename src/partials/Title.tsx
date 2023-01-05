import React from 'react';
import Head from 'next/head'

// import { Container } from './styles';

export default function Title({page}) {

  return (
    <Head>
      <title>{page} | EAD Tua Morada</title>
    </Head>
  );
}
