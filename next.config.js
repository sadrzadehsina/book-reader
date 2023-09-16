/** @type {import('next').NextConfig} */

const path =require('path')
const Dotenv = require('dotenv-webpack')

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
      })
    ]
    return config;
  }
}

module.exports = nextConfig
