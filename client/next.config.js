/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID:
      "658166146383-a8vflhb8rgo3tjhh7g4itn8fa63609s2.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
  },
  headers: {
    "Access-Control-Allow-Origin":
      "krayo-test-project-production.up.railway.app",
  },
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
    responseLimit: false,
  },
};

module.exports = nextConfig;
