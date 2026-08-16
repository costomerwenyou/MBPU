module.exports = {
  apps: [
    {
      name: 'mb-pu-backend',
      cwd: './backend',
      script: 'dist/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'mb-pu-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run start -- -p 3000',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
