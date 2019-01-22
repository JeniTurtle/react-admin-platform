import { createAsyncAction, createReducer } from 'redux-action-tools'
import { jsonp } from '@/common/request/axiosFetch'
import { getActionTypes } from '@/common/utils/functions'
import globalActions from './global'

const initialState = {
    weatherInfo: null
};

const actionTypes = getActionTypes(
    {
        WEATHER_INFO: null,
    },
    'THIRD_PARTY_API'
);

const { WEATHER_INFO } = actionTypes;

const getWeather = createAsyncAction(
    WEATHER_INFO,
    (input, dispatch) => {
        const city = '烟台';
        const api = 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2';
        return jsonp(api, {
            success: res => {
                if (res.status == 'success') {
                    try {
                        return res.results[0].weather_data[0];
                    } catch (e) {
                        throw new Error('天气数据获取失败')
                    }
                }
            },
            fail: error => {
                dispatch(globalActions.error(error))
            }
        });
    }
);

const setWeatherInfo = (state, { payload }) => {
    return {
        ...state,
        weatherInfo: payload
    }
};

const reducers = createReducer()
    .when(WEATHER_INFO, getWeather)
    .done(setWeatherInfo)
    .build({ ...initialState });

const actions = {
    getWeather,
};

export {
    actions as default,
    initialState,
    reducers,
    actionTypes,
}