import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import YearButton from './YearButton'
import GotoButton from './GotoButton'

export default function StatusCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>
                <Table striped bordered hover size="sm">
                    <tbody>
                    <tr>
                        <td>{parseInt(my_state.aladin_ra*10)/10},{parseInt(my_state.aladin_dec*10)/10},{parseInt(my_state.aladin_fov*10)/10}</td>
                    </tr>
                    </tbody>
                </Table>
            </Card>
        </div>
    );

}

