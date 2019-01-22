import configDev from './config.dev'
import configProd from './config.prod'

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? configProd : configDev;

export default {
    IS_PRODUCTION: isProduction,
    COOKIE_GT_KEY: 'EX_GT',
    HEAD_GT_KEY: 'Authorization',
    ...config
};