// Nico Vermaas - 28 oct 2019
// This is the reducer for the global state providor.

// possible actions
export const SET_STATUS = 'SET_STATUS'
export const SET_HIPSLIST = 'SET_HIPSLIST'

export const initialState = {
        status: "unfetched",
        hipslist: undefined,
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

        default:
            return state;
    }
};