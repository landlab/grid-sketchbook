module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app\/)/,
        'app.js': /^app\//
      }
    },
    stylesheets: { joinTo: 'app.css' }
  },
  server: {
    hostname: '0.0.0.0',
    port: 8080,
    noPushState: true,
  },
  npm: {
    globals: {
      'io': 'socket.io-client'
    }
  },
  modules: {
    autoRequire: {
      'app.js': ['initialize']
    }
  },
  plugins: {
    babel: {
      pattern: /\.jsx?$/
    },
    eslint: {
      pattern: /^app\/.*\.jsx?$/
    },
    postcss: {
      processors: [
        require('autoprefixer')({ browsers: ['> 5%', 'last 2 versions'] })
      ]
    },
    sass: {
      mode: 'native'
    }
  }
}
