import React from 'react';
import { Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { ALADIN_RA, ALADIN_DEC, ALADIN_RELOAD } from '../../contexts/GlobalStateReducer'

import { getMoveIcon } from '../../utils/styling'

export default function GotoButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = () => {

        my_dispatch({type: ALADIN_RA, aladin_ra: props.ra})
        my_dispatch({type: ALADIN_DEC, aladin_dec: props.dec})
        my_dispatch({type: ALADIN_RELOAD, aladin_reload: !my_state.aladin_reload})
    }


    return <Button variant="outline-primary" onClick={() => handleClick(props.ra,props.dec)}>{getMoveIcon()}&nbsp;{props.ra}&nbsp;{props.dec}</Button>

}