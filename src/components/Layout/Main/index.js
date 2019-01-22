import { IS_PRODUCTION } from '@/config'

// 为了让webpack在生产环境不打包进去
if (IS_PRODUCTION) {
    module.exports = require('./Main')
} else {
    module.exports = require('./MainDev')
}
