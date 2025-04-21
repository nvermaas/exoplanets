import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_FILTERED_EXOPLANETS} from '../../contexts/GlobalStateReducer'

import { getClockIcon } from '../../utils/styling'
import { filterYear } from '../../utils/selection'

export default function YearFilterButton() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (year) => {
        let filtered_exoplanets
        if (year === 'All') {
            filtered_exoplanets = my_state.fetched_exoplanets
        } else {
            filtered_exoplanets = filterYear(my_state.fetched_exoplanets, year)
        }
        my_dispatch({type: SET_FILTERED_EXOPLANETS, filtered_exoplanets: filtered_exoplanets})
    }


    return <Dropdown>
        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            {getClockIcon()}&nbsp;Year of discovery
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("All")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("1992-1999")}>1992 - 1999</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2000-2004")}>2000 - 2004</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2005-2009")}>2000 - 2009</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2010-2014")}>2000 - 2014</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2015")}>2015</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2016")}>2016</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2017")}>2017</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2018")}>2018</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2019")}>2019</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2020")}>2020</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2021")}>2021</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2022")}>2022</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2023")}>2023</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2024")}>2024</Dropdown.Item>
            <Dropdown.Item onClick={() => handleClick("2025")}>2025</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>


}