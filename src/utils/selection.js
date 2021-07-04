
export function getPlanet(planets, planet_name) {

    return planets.find((planet) => {
        if (planet.pl_name===planet_name) {
            return true;
        }
        return false;
    });
}


export function getPlanets(planets, planet_name, maxResults) {

    return planets.filter((planet) => {
        if (planet.pl_name===planet_name) {
            return true;
        }
        return false;
    }).slice(0, maxResults);;
}


export function filterYear(planets, year) {

    return planets.filter((planet) => {

        if (parseInt(planet.disc_year)===parseInt(year)) {
            return true;
        }
        return false;
    }).slice(0);;
}