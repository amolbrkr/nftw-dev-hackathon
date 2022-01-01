/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
      "storage.opensea.io",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/assets",
        permanent: true,
      },
    ];
  },
};
