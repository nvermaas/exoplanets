import React from 'react';
import { Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    ALADIN_RA,
    ALADIN_DEC,
    SHOW_PLANETLIST,
    ALADIN_RELOAD,
    SET_SELECTED_EXOPLANET,
} from '../../contexts/GlobalStateReducer'

import { getMoveIcon } from '../../utils/styling'

export default function GotoButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = () => {

        my_dispatch({type: ALADIN_RA, aladin_ra: props.ra})
        my_dispatch({type: ALADIN_DEC, aladin_dec: props.dec})
        //my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
        my_dispatch({type: SHOW_PLANETLIST, show_planetlist: false})
        my_dispatch({type: SET_SELECTED_EXOPLANET, selected_exoplanet: props.pl_name})
    }


    return <Button variant="outline-danger" onClick={() => handleClick(props.pl_name, props.ra,props.dec)}>{getMoveIcon()}&nbsp;{props.pl_name}</Button>

}