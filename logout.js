const path = require('path')
const Service = require('node-windows').Service

const svc = new Service({
    name: 'File Action',
    description: 'file action',
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