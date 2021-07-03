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

    // get the bounding box in world coordinates from an observation
    const getBox = (object) => {
        let size = 1
        let point1 = [object.ra - size, object.dec - size]
        let point2 = [object.ra - size, object.dec + size]
        let point3 = [object.ra + size, object.dec + size]
        let point4 = [object.ra + size, object.dec - size]
        let box = [point1,point2,point3,point4,point1]
        return box
    }

    const addBoxesToOverlay = (my_overlay, object, color) => {
        let box = getBox(object)
        //my_overlay.add(window.A.polyline(box, {color: color, lineWidth: 1}));
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
            shape : 'square',
            color : 'red',
            sourceSize: 20,
            //labelColumn: 'name',
            //displayLabel: true,
            onClick: 'showTable'});

        // loop through all the objects and add them to the appropriate layer based a property
        if (data) {
            data.forEach(function (object) {

                //if (object.sy_pnum===1) {
                //    addBoxesToOverlay(overlay_single_planet, object, "yellow")
                //} else

                if (object.sy_pnum>1) {
                    addBoxesToOverlay(overlay_multiple_planets, object, "green")
                }

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);

        }

    }

    const addToCatalog = (my_catalog, object) => {
        //let url = "https://uilennest.net/my_astrobase/exoplanets/?soltype__icontains=confirmed&hostname__icontains="+object.hostname
        let name = object.pl_name.replace(' ','_')
        let url = "http://exoplanet.eu/catalog/"+name

        let source = [window.A.marker(
            object.ra,
            object.dec,

            {
                my_field_name: object.pl_name,
                my_name: object.hostname,
                popupTitle: '<a href="'+url+'" target="_blank">'+object.pl_name+'</a>',
                popupDesc: '<hr>Planets: '+ object.sy_pnum,
            },

        )]

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
        my_catalog.addSources(source);
        //my_catalog.addSources(marker);
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