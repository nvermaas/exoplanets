import React from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import { useGlobalReducer } from '../../contexts/GlobalContext';


function getPlanet(planets, planet_name) {

    return planets.find((planet) => {
        if (planet.pl_name===planet_name) {
            return true;
        }
        return false;
    });
}

export default function PlanetCard(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    let planet_name = my_state.selected
    let selected_planet = getPlanet(my_state.fetched_exoplanets, planet_name)
    let url_to_exoplanet = "http://exoplanet.eu/catalog/"+planet_name

    let render_radius
    if (selected_planet.pl_rade) {
        render_radius=<tr>
            <td className="key">Radius (earths)</td>
            <td className="value">{parseInt(selected_planet.pl_rade*10)/10}</td>
        </tr>
    }

    let render_mass
    if (selected_planet.pl_bmasse) {
        render_mass=<tr>
            <td className="key">Mass (earths)</td>
            <td className="value">{parseInt(selected_planet.pl_bmasse*10)/10}</td>
        </tr>
    }

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <Table striped bordered hover size="sm">
                        <tbody>
                        <tr>
                            <td colspan="2" className="key"><h4>Planet</h4></td>
                        </tr>
                        <tr>
                            <td className="key">Name</td>
                            <td className="value"><a href={url_to_exoplanet} target="_blank" rel="noopener noreferrer">{planet_name}</a></td>
                        </tr>
                        {render_radius}
                        {render_mass}
                        <tr>
                            <td colspan="2" className="key"><h4>Star</h4></td>
                        </tr>
                        <tr>
                            <td className="key">Star</td>
                            <td className="value">{selected_planet.hostname}</td>
                        </tr>
                        <tr>
                            <td className="key">Spectral Type</td>
                            <td className="value">{selected_planet.st_spectype}</td>
                        </tr>
                        <tr>
                            <td className="key">Nr of Stars</td>
                            <td className="value">{selected_planet.sy_snum}</td>
                        </tr>
                        <tr>
                            <td className="key">Nr of Planets</td>
                            <td className="value">{selected_planet.sy_pnum}</td>
                        </tr>
                        <tr>
                            <td className="key">Magnitude (V)</td>
                            <td className="value">{parseInt(selected_planet.sy_vmag*10)/10}</td>
                        </tr>
                        <tr>
                            <td className="key">Distance (parsec)</td>
                            <td className="value">{parseInt(selected_planet.sy_dist*10)/10}</td>
                        </tr>
                        <tr>
                            <td colspan="2" className="key"><h4>Discovery</h4></td>
                        </tr>
                        <tr>
                            <td className="key">Year</td>
                            <td className="value">{selected_planet.disc_year}</td>
                        </tr>
                        <tr>
                            <td className="key">Facility</td>
                            <td className="value">{selected_planet.disc_facility}</td>
                        </tr>
                        <tr>
                            <td className="key">Soltype</td>
                            <td className="value">{selected_planet.soltype}</td>
                        </tr>
                        </tbody>

                    </Table>

                </Card.Body>
            </Card>
        </div>
    );

}

