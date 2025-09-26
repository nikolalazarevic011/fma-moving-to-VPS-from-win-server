module.exports = {
  apps: [
    {
      name: 'fma-nextjs',
      script: 'server.js',
      cwd: '/home/faithmina/preview-nikola.faithministriesalliance.org', // Update this path
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      max_memory_restart: '1G',
      restart_delay: 1000,
      watch: false,
      ignore_watch: [
        'node_modules',
        '.next',
        'logs',
        'triggers'
      ],
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};