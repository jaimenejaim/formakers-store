const fs = require('fs');

module.exports = (app) => {
    // Read each file in the routes directory
    fs.readdirSync(__dirname).forEach(route => {
        // Strip the .js suffix
        route = route.split('.')[0];
        // Ignore index (i.e. this file)
        if (route === 'index') return;

        app.use('/' + route, require('./'+route+'.js'));
    });
};