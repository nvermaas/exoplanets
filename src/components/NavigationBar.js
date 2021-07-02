import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';
import logo from '../assets/astron-hips-logo.jpg';
import { NavLink, Link } from "react-router-dom"

import { useGlobalReducer } from '../contexts/GlobalContext';


export default function NavigationBar() {
    const [ my_state , my_dispatch] = useGlobalReducer()

    return (
        <Navbar bg="dark" variant="dark">

            <img class="App-logo"  alt='' src={logo} width="150" height="50" className="d-inline-block align-top"/>

            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/">Welcome</Nav.Link>
                <Nav.Link as={NavLink} to="/hips">HiPS Surveys</Nav.Link>
            </Nav>
        </Navbar>

    );
}