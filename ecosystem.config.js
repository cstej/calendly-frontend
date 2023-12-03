module.exports = {
  apps: [
    {
      name: "schedule.veblika.com",
      script: "npm",
      args: "start",
      cwd: "/var/www/Calendly", // Replace this with the actual path to your Next.js app
      watch: true,
      ignore_watch: ["node_modules", "build"],
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
