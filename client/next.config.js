/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: {
    "Access-Control-Allow-Origin":
      "krayo-test-project-production.up.railway.app",
  },
  // api: {
  //   bodyParser: {
  //     sizeLimit: "5mb", // Set desired value here
  //   },
  //   responseLimit: false,
  // },
};

module.exports = nextConfig;
