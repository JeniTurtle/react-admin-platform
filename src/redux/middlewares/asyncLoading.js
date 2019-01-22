import NProgress from 'nprogress'
import { deepGet } from '@/common/utils/functions'
import actions from '../models/global'

import { ASYNC_PHASES } from 'redux-action-tools'

export default function loadingMiddleWare({ dispatch }) {
    return (next) => (action) => {
        const asyncPhase = deepGet(action, 'meta.asyncPhase');

        if (asyncPhase) {
            const omitLoading = deepGet(action, 'meta.omitLoading');
            if (!omitLoading) {
                const loading = asyncPhase === ASYNC_PHASES.START;
                loading ? NProgress.start() : NProgress.done();
                dispatch(actions.loading(loading))
            }
        }
        return next(action)
    }
}