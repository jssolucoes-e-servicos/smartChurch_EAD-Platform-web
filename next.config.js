const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  sw: 'pwabuilder-sw.js'
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  /* async redirects() {
    return [
      {
        source: "/app",
        destination: "/app/inicio",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/",
        permanent: false,
      },
    ];
  }, */
});



module.exports = nextConfig;
