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
        source: "/acesso",
        destination: "/acesso/aluno",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/acesso",
        permanent: false,
      },
    ];
  },
});



module.exports = nextConfig;
