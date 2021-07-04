import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import FilterCard from './FilterCard'
import PlanetCard from './PlanetCard'
import StatusCard from './StatusCard'
import YearFilterButton from './YearFilterButton'
import Aladin from './Aladin'

export default function ExoplanetsPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}
    let fov = my_state.aladin_fov

    if (my_state.status_exoplanets !== "fetched") {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>

                        <PlanetCard/>
                        <Card>
                            <Card.Body>
                        <td><YearFilterButton year="All" /></td>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <Aladin data={my_state.filtered_exoplanets}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}