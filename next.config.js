module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/webmail",
        destination: "https://gator3215.hostgator.com:2096/",
        permanent: true,
      },
    ];
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "fr", "es"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "fr",
  },
};
