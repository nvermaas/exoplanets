import React, {useState, useEffect }  from 'react';
import { useGlobalReducer } from '../contexts/GlobalContext';
import { SET_STATUS_DATA, SET_FETCHED_DATA
} from '../contexts/GlobalStateReducer';


const url_astrobase = "https://uilennest.net/my_astrobase/asteroids/"

export default function FetchData () {
    // use global state
    const [ my_state , my_dispatch] = useGlobalReducer()

    useEffect(() => {
            fetchAsteroids(url_astrobase)
        }, []
    );


    const fetchAsteroids = (url) => {
        if (my_state.status_data !== 'fetching')  {

            // apply all the filters in my_state to the url_observations

            my_dispatch({type: SET_STATUS_DATA, status: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_DATA, fetched_data: data.results})
                    my_dispatch({type: SET_STATUS_DATA, status_data: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_DATA, status_data: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
        }
    }
}