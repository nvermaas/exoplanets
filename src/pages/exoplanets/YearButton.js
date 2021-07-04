import React from 'react';
import { Button } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_FILTERED_EXOPLANETS} from '../../contexts/GlobalStateReducer'

import { getClockIcon } from '../../utils/styling'
import { filterYear } from '../../utils/selection'

export default function YearButton(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = () => {
        let filtered_exoplanets
        if (props.year === 'All') {
            filtered_exoplanets = my_state.fetched_exoplanets
        } else {
            filtered_exoplanets = filterYear(my_state.fetched_exoplanets, props.year)
        }
        my_dispatch({type: SET_FILTERED_EXOPLANETS, filtered_exoplanets: filtered_exoplanets})
    }


    return <Button variant="outline-primary" onClick={() => handleClick(props.year)}>{getClockIcon()}&nbsp;{props.year}</Button>

}