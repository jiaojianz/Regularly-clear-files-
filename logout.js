const path = require('path')
const config = require('./config')
const Service = require('node-windows').Service

const svc = new Service({
    name: config.serverName,
    description: config.serverDescribtion,
    script: path.resolve('./bin/www'), // C:\project\research-development-intranet\bin\www
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
})

svc.on('uninstall', function () {
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
})

svc.uninstall()