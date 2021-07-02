import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const [ highlightedObservation , setHighlightedObservation] = React.useState([]);

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        // create the catalog layer
        createLayers(aladin, props.data, props.observation)

        // add a listener to aladin
        // define function triggered when  a source is hovered
        aladin.on('objectHovered', function(object) {

            var msg;
            if (object) {
                msg = object.data.my_field_name;

                 // highlight the observation under the mouse
                let my_observation = object.data.my_observation

                // recreate all the layers, but now with a different highlighted observation
                createLayers(aladin, props.data, my_observation)

                // save the highlighted observation to the local state
                // now only used to display it
                setHighlightedObservation(my_observation)

            }
        });

    }, [])

    // create the catalog layer
    const createLayers = (aladin, data, highlighted_observation) => {
        aladin.removeLayers()

        let my_catalog = window.A.catalog({
            name: 'MyObservations',
            shape : 'circle',
            color : 'yellow',
            sourceSize: 20,
            //labelColumn: 'name',
            //displayLabel: true,
            onClick: 'showTable'});

        // loop through all the observations and add them to the appropriate layer based on quality
        if (data) {
            data.forEach(function (observation) {

                // draw a clickable icon for each observation
                addToCatalog(my_catalog, observation)
            })

            aladin.addCatalog(my_catalog);
        }

    }

    // get the bounding box in world coordinates from an observation
    const getBox = (observation) => {
        let coords = observation.box.split(',')
        let point1 = [coords[0],coords[1]]
        let point2 = [coords[2],coords[3]]
        let point3 = [coords[4],coords[5]]
        let point4 = [coords[6],coords[7]]
        let box = [point1,point2,point3,point4,point1]
        return box
    }


    const addToCatalog = (my_catalog, observation) => {
        let url = "https://uilennest.net/astroview/details/"+observation.taskID

        let source = window.A.source(
            observation.field_ra,
            observation.field_dec,
            {
                my_field_name: observation.field_name,
                my_name: observation.name,
                popupTitle: '<a href="'+url+'">'+observation.taskID+' - '+observation.name+'</a>',
                popupDesc: observation.field_name,
            }
        )

        let marker = [window.A.marker(
            observation.field_ra,
            observation.field_dec,

            {
                my_field_name: observation.field_name,
                my_name: observation.name,
                popupTitle: '<a href="'+url+'">'+observation.taskID+'</a>',
                popupDesc: '<hr>'+observation.name +'<br>'+ observation.field_name,
            },

            {
                my_field_name: observation.field_name,
                taskID : observation.taskID,
                my_observation : observation,
            },
        )]
        //my_catalog.addSources(source);
        my_catalog.addSources(marker);
    }


    let title = "Exoplanets in Aladin"

    return (
        <div>
            <h3>{title}</h3>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin