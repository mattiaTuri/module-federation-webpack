const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "angularremote": "http://localhost:4201/remoteEntry.js",  
    "reactapp": "http://localhost:4202/remoteEntry.js"
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    react: { singleton: true, strictVersion: true, requiredVersion: "^19.0.0"},
    'react-dom': { singleton: true, strictVersion: true, requiredVersion: "^19.0.0"},
  },

});
