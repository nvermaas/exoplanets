// Nico Vermaas - 2 jul 2021
// This is the reducer for the global state provider.

// possible actions
export const SET_STATUS_ASTEROIDS = 'SET_STATUS_ASTEROIDS'
export const SET_FETCHED_ASTEROIDS = 'SET_FETCHED_ASTEROIDS'
export const SET_STATUS_EXOPLANETS = 'SET_STATUS_EXOPLANETS'
export const SET_FETCHED_EXOPLANETS = 'SET_FETCHED_EXOPLANETS'
export const SET_FILTERED_EXOPLANETS = 'SET_FILTERED_EXOPLANETS'

export const SET_SELECTED = 'SET_SELECTED'

export const ALADIN_RA = 'ALADIN_RA'
export const ALADIN_DEC = 'ALADIN_DEC'
export const ALADIN_FOV = 'ALADIN_FOV'
export const ALADIN_MODE = 'ALADIN_MODE'
export const ALADIN_RELOAD = 'ALADIN_RELOAD'

export const initialState = {
        status_asteroids : "unfetched",
        fetched_asteroids: undefined,

        status_exoplanets : "unfetched",
        fetched_exoplanets: undefined,
        filtered_exoplanets: undefined,
        selected : undefined,

        aladin_ra: "90.0",
        aladin_dec: "0.0",
        aladin_fov: "30",
        aladin_mode: "rectangle",
        aladin_highlight: undefined
}

export const reducer = (state, action) => {
    switch (action.type) {

        case SET_STATUS_ASTEROIDS:
            return {
                ...state,
                status_asteroids: action.status_asteroids
            };

        case SET_FETCHED_ASTEROIDS:
            return {
                ...state,
                fetched_asteroids: action.fetched_asteroids
            };

        case SET_STATUS_EXOPLANETS:
            return {
                ...state,
                status_exoplanets: action.status_exoplanets
            };

        case SET_FETCHED_EXOPLANETS:
            return {
                ...state,
                fetched_exoplanets: action.fetched_exoplanets
            };

        case SET_FILTERED_EXOPLANETS:
            return {
                ...state,
                filtered_exoplanets: action.filtered_exoplanets
            };

        case SET_SELECTED:
            return {
                ...state,
                selected: action.selected
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

        case ALADIN_RELOAD:

            return {
                ...state,
                aladin_reload: action.aladin_reload
            };

        default:
            return state;
    }
};