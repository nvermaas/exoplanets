import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import ControlCard from './PlanetCard'
import Aladin from './Aladin'

export default function ExoplanetsPage(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()

    // https://stackoverflow.com/questions/61347860/using-aladin-lite-app-not-built-for-react-in-react-app
    let defaultSurvey = {survey: "P/DSS2/color"}
    let fov = my_state.aladin_fov
    if (fov==='0') {
        fov = '10'
    }

    if (my_state.status_exoplanets !== "fetched") {
        return <LoadingSpinner/>
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col sm={3} md={3} lg={3}>
                        <ControlCard/>
                    </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <Aladin ra={my_state.aladin_ra}
                                    dec={my_state.aladin_dec}
                                    fov={fov}
                                    mode={my_state.aladin_mode}
                                    data={my_state.fetched_exoplanets}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}