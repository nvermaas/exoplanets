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
            name: 'Exoplanets',
            shape : 'circle',
            color : 'red',
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
        let url = "https://uilennest.net/my_astrobase/exoplanets/?soltype__icontains=confirmed&hostname__icontains="+object.hostname

        let marker = [window.A.marker(
            object.ra,
            object.dec,

            {
                my_field_name: object.pl_name,
                my_name: object.hostname,
                popupTitle: '<a href="'+url+'" target="_blank">'+object.pl_name+'</a>',
                popupDesc: '<hr>Planets: '+ object.sy_pnum,
            },

        )]

        my_catalog.addSources(marker);
    }


    let title = "Exoplanets (click them!)"

    return (
        <div>
            <h3>{title}</h3>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin