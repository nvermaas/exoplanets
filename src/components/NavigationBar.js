import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';
import logo from '../logo.ico';
import { NavLink, Link } from "react-router-dom"

import { useGlobalReducer } from '../contexts/GlobalContext';

export default function NavigationBar() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <Navbar bg="dark" variant="dark">

            <img alt='' src={logo} width="30" height="30" className="d-inline-block align-top"/>

            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/">Welcome</Nav.Link>
                <Nav.Link as={NavLink} to="/aladin">Asteroids</Nav.Link>
            </Nav>
        </Navbar>

    );
}