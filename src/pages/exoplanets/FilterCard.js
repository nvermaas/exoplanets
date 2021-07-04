import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';

import YearButton from './YearButton'
import GotoButton from './GotoButton'

export default function FilterCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <div className="App">
            <Card>

                    <tbody>
                    <tr>
                        <td><YearButton year="All" /></td>
                        <td><YearButton year="2000" /></td>
                        <td><YearButton year="2005" /></td>
                        <td><YearButton year="2010" /></td>
                        <td><YearButton year="2015" /></td>
                        <td><YearButton year="2016" /></td>
                        <td><YearButton year="2017" /></td>
                        <td><YearButton year="2018" /></td>
                        <td><YearButton year="2019" /></td>
                        <td><YearButton year="2020" /></td>
                        <td><YearButton year="2021" /></td>
                        <td><GotoButton ra="90" dec="30" /></td>
                        <td><GotoButton ra="60" dec="30" /></td>
                    </tr>
                    </tbody>

            </Card>
        </div>
    );

}

