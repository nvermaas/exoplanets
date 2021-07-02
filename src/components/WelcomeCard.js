import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'

import welcome_logo from '../assets/welcome-logo.jpg';

export default function WelcomeCard(props) {

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <h2>Welcome to this ReactJS/Aladin demo app.</h2>
                    <Table>
                        <img src={welcome_logo} />

                    </Table>
                    <Card.Text>

                        <p>This is a demonstration of how <a href="https://aladin.u-strasbg.fr/aladin.gml#AladinLite">Aladin Light</a> can be used in <a href="https://reactjs.org/">ReactJS</a></p>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

