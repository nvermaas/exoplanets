
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
        // year is a range

        if (year.includes('-')) {
            let years = year.split('-')

            if ( parseInt(planet.disc_year) >= parseInt(years[0])
                && parseInt(planet.disc_year) <= parseInt(years[1])) {
                return true
            }
        }

        // year is a number
        if (parseInt(planet.disc_year)===parseInt(year)) {
            return true;
        }
        return false;
    }).slice(0);
}

// return a list of planets where 'pl_name' has the value of 'searchText' in it
export function filterPlanets(planets, searchText, maxResults) {

    return planets.filter((planet) => {

        if (planet.pl_name.toUpperCase().includes(searchText)) {
            return true;
        }

        return false;
    }).slice(0, maxResults);
}