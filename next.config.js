 const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  sw: 'pwabuilder-sw.js'
}); 

/** @type {import('next').NextConfig} */
 const nextConfig = withPWA({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ava/login",
        permanent: true,
      },
       {
        source: "/ava",
        destination: "/ava/meus-cursos",
        permanent: false,
      },
    ];
  },
}); 

module.exports = nextConfig;
