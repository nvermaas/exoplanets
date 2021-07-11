import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'

import welcome_logo from '../assets/welcome-logo.jpg';

export default function WelcomeCard(props) {

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <h2>Welcome to this ReactJS/<a href="https://aladin.u-strasbg.fr/aladin.gml#AladinLite">AladinLight</a> demo app.</h2>
                    <Table>
                        <img src={welcome_logo} />

                    </Table>
                    <Card.Text>
                        <p>See how actions in the left information panel effect the right Aladin panel, and vice versa.</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

