import { IS_PRODUCTION } from '@/config'

// 为了让webpack在生产环境不打包进去
if (IS_PRODUCTION) {
    module.exports = require('./configureStore.prod.js')
} else {
    module.exports = require('./configureStore.dev.js')
}
