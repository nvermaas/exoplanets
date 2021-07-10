import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import { SET_SELECTED_EXOPLANET, ALADIN_RA, ALADIN_DEC, ALADIN_FOV } from '../../contexts/GlobalStateReducer'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()

    React.useEffect(() => {

        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(parseFloat(my_state.aladin_fov))
        aladin.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec)

        // create the catalog layer
        createLayers(aladin, props.data)

        // add a listener to aladin
        // define function triggered when  a source is hovered
        aladin.on('objectHovered', function(object) {

            // when an object is hovered, store the ra,dec,fov in the global state
            // (because I found no better or more accurate way of doing this).

            let radec = aladin.getRaDec()
            my_dispatch({type: ALADIN_RA, aladin_ra: radec[0]})
            my_dispatch({type: ALADIN_DEC, aladin_dec: radec[1]})

            let fov = aladin.getFov()
            my_dispatch({type: ALADIN_FOV, aladin_fov: fov[0]})

            if (object) {
                try {
                    // select the object under the mouse cursor, and store it in global state
                    my_dispatch({type: SET_SELECTED_EXOPLANET, selected_exoplanet: object.data.planet})
                } catch (e) {
                }
            }
        });

    }, [my_state.filtered_exoplanets, my_state.selected_exoplanet, my_state.aladin_reload])


    const addCirclesToOverlay = (my_overlay, object, color, size) => {
        my_overlay.add(window.A.circle(object.ra, object.dec,size, {color: color, lineWidth: 2}));
    }

    // create the catalog layer
    const createLayers = (aladin, data) => {
        aladin.removeLayers()

        let overlay_selected = window.A.graphicOverlay({name: 'selected',color: 'yellow', lineWidth: 3});
        aladin.addOverlay(overlay_selected);

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

                if (object.pl_name===my_state.selected_exoplanet) {
                    addCirclesToOverlay(overlay_selected, object, "yellow",1)
                } else

                if (object.sy_pnum>1) {
                    addCirclesToOverlay(overlay_multiple_planets, object, "green",0.5)
                }

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);

            // add Simbad catalog
            //aladin.addCatalog(window.A.catalogFromSimbad('m45', 0.2, {shape: 'plus', color : '#5d5', onClick: 'showTable'}));

        }
    }

    const addToCatalog = (my_catalog, object) => {


        let url = "https://uilennest.net/my_astrobase/exoplanets/?soltype__icontains=confirmed&hostname__icontains="+object.hostname

        let name = object.pl_name.replaceAll(' ','_')
        //let url = "http://exoplanet.eu/catalog/"+name

        url = "http://www.exoplanetkyoto.org/exohtml/"+name+".html"

        let source = [window.A.source(
            object.ra,
            object.dec,

            {
                planet: object.pl_name,
                star: '<a href="'+url+'" target="_blank">'+object.hostname+'</a>',
                nr_of_planets: '<hr>Planets: '+ object.sy_pnum,
            },

        )]

        my_catalog.addSources(source);
    }

    return (
        <div>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin