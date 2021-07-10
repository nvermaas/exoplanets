import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import GotoButton from './GotoButton'

export default function PlanetListCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    if (!my_state.show_planetlist) {
        return null
    }

    let render_planets = my_state.filtered_exoplanets.map( (planet) => {
            return <GotoButton pl_name={planet.pl_name} ra={planet.ra} dec={planet.dec}/>
        }
    )

    return (
        <div className="App">
            <Card>
                <Table striped bordered hover size="sm">
                    <tbody>
                    {render_planets}
                    </tbody>
                </Table>
            </Card>
        </div>
    );

}

