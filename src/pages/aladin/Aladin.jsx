import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        // create the catalog layer
        createLayers(aladin, props.data)

    }, [])

    // create the catalog layer
    const createLayers = (aladin, data) => {
        aladin.removeLayers()

        let my_catalog = window.A.catalog({
            name: 'Asteroids',
            shape : 'circle',
            color : 'yellow',
            sourceSize: 20,
            //labelColumn: 'name',
            //displayLabel: true,
            onClick: 'showTable'});

        // loop through all the observations and add them to the appropriate layer based on quality
        if (data) {
            data.forEach(function (object) {

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);
        }

    }

    const addToCatalog = (my_catalog, object) => {

        let marker = [window.A.marker(
            object.ra,
            object.dec,

            {
                my_field_name: object.designation,
                my_name: object.designation,
                popupTitle: '<h4>'+object.designation+'</h4>',
                popupDesc: '<hr>visual magnitude: '+ Math.round(object.visual_magnitude*10)/10,
            },

        )]

        my_catalog.addSources(marker);
    }


    let title = "Asteroids in Aladin"

    return (
        <div>
            <h3>{title}</h3>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin