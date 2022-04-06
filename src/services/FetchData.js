import React, {useState, useEffect }  from 'react';
import { useGlobalReducer } from '../contexts/GlobalContext';
import {
    SET_STATUS_ASTEROIDS,
    SET_FETCHED_ASTEROIDS,
    SET_STATUS_EXOPLANETS,
    SET_FETCHED_EXOPLANETS,
    SET_FILTERED_EXOPLANETS
} from '../contexts/GlobalStateReducer';


export default function FetchData () {
    // use global state
    const [ my_state , my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchAsteroids()
        }, []
    );

    useEffect(() => {
            fetchExoplanets()
        }, []
    );

    const fetchAsteroids = () => {
        const url = "https://web-of-wyrd.nl/my_astrobase/asteroids-all/"
        if (my_state.status_asteroids !== 'fetching')  {

            my_dispatch({type: SET_STATUS_ASTEROIDS, status: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_ASTEROIDS, fetched_asteroids: data.results})
                    my_dispatch({type: SET_STATUS_ASTEROIDS, status_asteroids: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_ASTEROIDS, status_asteroids: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }

    const fetchExoplanets = () => {
        // TODO: add progress bar to fetch
        // https://javascript.info/fetch-progress
        const url = "https://web-of-wyrd.nl/my_astrobase/exoplanets-all/?soltype__icontains=confirmed"
        //const url = "https://uilennest.net/my_astrobase/exoplanets-all"

        if (my_state.status_exoplanets !== 'fetching')  {

            my_dispatch({type: SET_STATUS_EXOPLANETS, status: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_EXOPLANETS, fetched_exoplanets: data.results})
                    my_dispatch({type: SET_FILTERED_EXOPLANETS, filtered_exoplanets: data.results})
                    my_dispatch({type: SET_STATUS_EXOPLANETS, status_exoplanets: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_EXOPLANETS, status_exoplanets: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }
}