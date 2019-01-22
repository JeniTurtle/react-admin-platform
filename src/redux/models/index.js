import { combineReducers } from 'redux'
import { reducers as globalReducers } from './global'
import { reducers as authReducers } from './auth'
import { reducers as userReducers } from './user'
import { reducers as thirdReducers } from './thirdPartyApi'

const rootReducers = combineReducers({
    auth: authReducers,
    global: globalReducers,
    user: userReducers,
    thirdParty: thirdReducers,
});

export default rootReducers
