import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import GotoButton from './GotoButton'
import YearFilterButton from './YearFilterButton'
import SearchButton from './SearchButton'
import PlanetListCard from './PlanetListCard'

export default function FilterCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>

                <Card.Body>
                    <tr><td><h5>Selected Planets: {my_state.filtered_exoplanets.length}</h5></td></tr>
                    <tr><td><YearFilterButton year="All" /></td></tr>
                    <table>
                        <tbody>
                            <tr><td><SearchButton default="search planet name" /></td></tr>
                        </tbody>
                    </table>
                    <PlanetListCard/>
                </Card.Body>
            </Card>
        </div>
    );

}

