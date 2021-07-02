// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

// possible actions
export const SET_STATUS = 'SET_STATUS'
export const SET_HIPSLIST = 'SET_HIPSLIST'

export const SET_STATUS_DATA = 'SET_STATUS_DATA'
export const SET_FETCHED_DATA = 'SET_FETCHED_DATA'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_MODE = 'ALADIN_MODE'
export const ALADIN_HIGHLIGHT = 'ALADIN_HIGHLIGHT'

export const initialState = {
        status: "unfetched",
        hipslist: undefined,

        status_data : "unfetched",
        fetched_data: undefined,

        aladin_ra: "84.17",
        aladin_dec: "8.92",
        aladin_fov: "10",
        aladin_mode: "rectangle",
        aladin_highlight: undefined
}

export const reducer = (state, action) => {
    switch (action.type) {

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case SET_HIPSLIST:
            return {
                ...state,
                hipslist: action.hipslist,
            };

        case SET_STATUS_DATA:
            return {
                ...state,
                status_data: action.status_data
            };

        case SET_FETCHED_DATA:
            return {
                ...state,
                fetched_data: action.fetched_data
            };

        case ALADIN_RA:
            return {
                ...state,
                aladin_ra: action.aladin_ra
            };

        case ALADIN_DEC:
            return {
                ...state,
                aladin_dec: action.aladin_dec
            };

        case ALADIN_FOV:
            return {
                ...state,
                aladin_fov: action.aladin_fov
            };

        case ALADIN_MODE:

            return {
                ...state,
                aladin_mode: action.aladin_mode
            };

        case ALADIN_HIGHLIGHT:

            return {
                ...state,
                aladin_highlight: action.aladin_highlight
            };

        default:
            return state;
    }
};