const dotenv = require('dotenv');
module.exports = {
  reactStrictMode: true,
  env: dotenv.config().parsed,
  images: {
    domains: ["s3-ap-southeast-2.amazonaws.com", "api.okas.site","api.okasre.com.au", "propertyphotos.vaultre.com.au","staffphotos.vaultre.com.au"],
  },
}