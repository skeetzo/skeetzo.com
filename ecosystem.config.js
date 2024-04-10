let app = "skeetzo",
    host = ["ecco","echo"],
    port = 3000,
    repo = "git@github.com:skeetzo/skeetzo.com.git";

module.exports = {
  
  // Applications //
  
  apps : [{
    name      : app,
    script    : 'npm',
    args      : ['start'],
    cwd       : `/var/www/apps/${app}/source`,
    env: {
      NODE_ENV: 'development',
      PORT: port
    },
    env_staging : {
      NODE_ENV : "staging",
      PORT: port
    },
    env_production : {
      NODE_ENV: 'production',
      PORT: port
    }
  }],

  // Deployment //

  deploy : {

    "development" : {
      host : host,
      ref  : "origin/development",
      repo : repo,
      path : `/var/www/apps/${app}`,
      // "pre-setup" : "npm install -g yarn",
      // "post-setup" : "bin/setup-local.sh",
      // "pre-deploy" : 'npm i',
      "post-deploy" : `npm i && pm2 startOrRestart ecosystem.config.js --env development --only ${app}`,
      env  : {
        NODE_ENV: "development",
        FORCE_COLOR: true
      }
    },
    "staging" : {
      host : host,
      ref  : "origin/staging",
      repo : repo,
      path : `/var/www/${app}`,
      "post-deploy" : `npm i && pm2 startOrRestart ecosystem.config.js --env staging --only ${app}`,
      env  : {
        NODE_ENV: "staging",
        FORCE_COLOR: true
      }
    },
    "production" : {
      host : host,
      ref  : "origin/production",
      repo : repo,
      path : `/var/www/${app}`,
      "post-deploy" : `npm i && pm2 startOrRestart ecosystem.config.js --env production --only ${app}`,
      env  : {
        NODE_ENV: "production",
        FORCE_COLOR: true
      }
    }
  }
};