import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import Iframe from '@trendmicro/react-iframe';

export default function HipsCard(props) {
        console.log("HipsCard "+props.data.hips_service_url)
    return (
        <Card>
            <Card.Body>
                <Table>
                    <div>
                    <Iframe src={props.data.hips_service_url} width="100%" height={800} />
                    </div>
                </Table>
            </Card.Body>

        </Card>

    );

}


