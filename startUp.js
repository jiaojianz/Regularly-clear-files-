const path = require('path')
const Service = require('node-windows').Service

const svc = new Service({
    name: 'File Action',
    description: 'file action',
    // script: 'C:\\project\\wang-f\\auto-file\\bin\\www',
    script: path.resolve('./bin/www'),
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
})

svc.on('install', function () {
  svc.start()
})

svc.install()