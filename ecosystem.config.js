module.exports = {
  apps: [
    {
      name: "SSK Avenues",
      script: "./build/index.js",
      exec_mode: "fork",
      source_map_support: false,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
