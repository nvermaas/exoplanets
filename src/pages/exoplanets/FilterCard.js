import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import YearButton from './YearButton'
import GotoButton from './GotoButton'
import YearFilterButton from './YearFilterButton'

export default function FilterCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>

                    <tbody>
                    <tr>
                        <td><YearFilterButton year="All" /></td>

                        <td><GotoButton ra="90" dec="30" /></td>
                        <td><GotoButton ra="60" dec="30" /></td>
                    </tr>
                    </tbody>

            </Card>
        </div>
    );

}

