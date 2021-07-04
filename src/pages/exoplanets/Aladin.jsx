import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import { SET_SELECTED } from '../../contexts/GlobalStateReducer'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        // create the catalog layer
        createLayers(aladin, props.data)

        // add a listener to aladin
        // define function triggered when  a source is hovered
        aladin.on('objectHovered', function(object) {

            var msg;
            if (object) {
                try {
                    msg = object.data.planet;

                    // highlight the observation under the mouse

                    let my_object = object.data.planet

                    // recreate all the layers, but now with a different highlighted observation
                    //createLayers(aladin, props.data, my_object)

                    // save the highlighted observation to the local state
                    // now only used to display it
                    //setHighlightedObservation(my_object)

                    // save the highlighed observation to the global state (not used for anything yet)

                    my_dispatch({type: SET_SELECTED, selected: my_object})
                } catch (e) {
                }
            }
        });

    }, [])


    const addCirclesToOverlay = (my_overlay, object, color) => {
        my_overlay.add(window.A.circle(object.ra, object.dec,0.5, {color: color, lineWidth: 2}));
    }

    // create the catalog layer
    const createLayers = (aladin, data) => {
        aladin.removeLayers()

        //let overlay_single_planet = window.A.graphicOverlay({name: 'single planet',color: 'yellow', lineWidth: 3});
        //aladin.addOverlay(overlay_single_planet);

        let overlay_multiple_planets = window.A.graphicOverlay({name: 'multiple planets',color: 'green', lineWidth: 5});
        aladin.addOverlay(overlay_multiple_planets);

        let my_catalog = window.A.catalog({
            name: 'Exoplanets',
            shape : 'circle',
            color : 'red',
            sourceSize: 20,
            labelColumn: 'planet',
            displayLabel: true,
            onClick: 'showPopup'});
            //onClick: 'showTable'});

        // loop through all the objects and add them to the appropriate layer based a property
        if (data) {
            data.forEach(function (object) {

                //if (object.sy_pnum===1) {
                //    addCirclesToOverlay(overlay_single_planet, object, "yellow")
                //} else

                if (object.sy_pnum>1) {
                    addCirclesToOverlay(overlay_multiple_planets, object, "green")
                }

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);
            //aladin.addCatalog(window.A.catalogFromSimbad('m45', 0.2, {shape: 'plus', color : '#5d5', onClick: 'showTable'}));

        }

    }

    const addToCatalog = (my_catalog, object) => {
        let url = "https://uilennest.net/my_astrobase/exoplanets/?soltype__icontains=confirmed&hostname__icontains="+object.hostname
        let name = object.pl_name.replace(' ','_')
        //let url = "http://exoplanet.eu/catalog/"+name

        let source = [window.A.source(
            object.ra,
            object.dec,

            {
                planet: object.pl_name,
                star: object.hostname,
                nr_planets : object.sy_pnum,
                popupTitle: '<a href="'+url+'" target="_blank">'+object.pl_name+'</a>',
                popupDesc: '<hr>Planets: '+ object.sy_pnum,
            },

        )]

        my_catalog.addSources(source);
        //my_catalog.addSources(marker);
    }


    let title

    return (
        <div>
            <h3>{title}</h3>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin