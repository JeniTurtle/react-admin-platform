/**
 * 所有对Cookie的操作, 都应该放在这里
 */

import Cookie from 'universal-cookie'
import { COOKIE_GT_KEY } from '@/config'

const cookie = new Cookie();

export const getCookieToken = () => {
    const token = cookie.get(COOKIE_GT_KEY);
    return token
};

export const setCookieToken = (token) => {
    cookie.set(COOKIE_GT_KEY, token, {
        path: '/',
        expires: new Date(Date.now() + 3600 * 1000 * 24)
    })
};

export const removeCookieToken = () => {
    cookie.remove(COOKIE_GT_KEY, { path: '/' })
};
