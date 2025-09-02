import React, { useEffect, useRef } from 'react';
import A from 'aladin-lite';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    SET_SELECTED_EXOPLANET,
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
} from '../../contexts/GlobalStateReducer';

const Aladin = (props) => {
    const [my_state, my_dispatch] = useGlobalReducer();

    // persistent refs
    const aladinRef = useRef(null);
    const overlaySelectedRef = useRef(null);
    const overlayMultipleRef = useRef(null);
    const exoCatalogRef = useRef(null);

    useEffect(() => {
        A.init.then(() => {
            if (!aladinRef.current) {
                // initialize once
                aladinRef.current = A.aladin('#aladin-lite-div', {
                    survey: 'P/DSS2/color',
                    fov: parseFloat(my_state.aladin_fov) || 60,
                    projection: 'SIN',
                    cooFrame: 'equatorial',
                });

                // create overlays once
                overlaySelectedRef.current = A.graphicOverlay({
                    name: 'Selected planet',
                    color: 'yellow',
                    lineWidth: 3,
                    opacity: 0.8,
                });
                aladinRef.current.addOverlay(overlaySelectedRef.current);

                overlayMultipleRef.current = A.graphicOverlay({
                    name: 'Multiple planets',
                    color: 'lime',
                    lineWidth: 2,
                    opacity: 0.7,
                });
                aladinRef.current.addOverlay(overlayMultipleRef.current);

                // create catalog once
                exoCatalogRef.current = A.catalog({
                    name: 'Exoplanets',
                    shape: 'circle',
                    color: '#ff3333',
                    sourceSize: 18,
                    labelColumn: 'star',
                    displayLabel: true,
                });
                aladinRef.current.addCatalog(exoCatalogRef.current);

                // register hover listener
                aladinRef.current.on('objectHovered', (object) => {
                    const [ra, dec] = aladinRef.current.getRaDec();
                    my_dispatch({ type: ALADIN_RA, aladin_ra: ra });
                    my_dispatch({ type: ALADIN_DEC, aladin_dec: dec });

                    const [fovX] = aladinRef.current.getFov();
                    my_dispatch({ type: ALADIN_FOV, aladin_fov: fovX });

                    if (object?.data?.planet) {
                        my_dispatch({
                            type: SET_SELECTED_EXOPLANET,
                            selected_exoplanet: object.data.planet,
                        });
                    }
                });
            }

            // always move to RA/DEC
            aladinRef.current.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec);

            // update layers & catalog with new data
            updateLayersAndCatalog(props.data);
        });
    }, [
        props.data,
        my_state.selected_exoplanet,
        my_state.aladin_ra,
        my_state.aladin_dec,
        my_state.aladin_fov,
    ]);

    const updateLayersAndCatalog = (data) => {
        if (!aladinRef.current) return;

        // clear previous content but keep overlays/catalog
        overlaySelectedRef.current.removeAll();
        overlayMultipleRef.current.removeAll();
        exoCatalogRef.current.clear();   // ✅ modern API

        if (data && data.length) {
            data.forEach((object) => {
                // highlight selected planet
                if (object.pl_name === my_state.selected_exoplanet) {
                    overlaySelectedRef.current.add(
                        A.circle(object.ra, object.dec, 1, { color: 'yellow', lineWidth: 2 })
                    );
                }
                // highlight multiple-planet systems
                else if (object.sy_pnum > 1) {
                    overlayMultipleRef.current.add(
                        A.circle(object.ra, object.dec, 0.5, { color: 'lime', lineWidth: 2 })
                    );
                }

                // add to catalog with popup
                addToCatalog(exoCatalogRef.current, object);
            });
        }
    };


    // modernized addToCatalog
    const addToCatalog = (my_catalog, object) => {
        const name = object.pl_name.replaceAll(' ', '_');

        const kyotoUrl = `http://www.exoplanetkyoto.org/exohtml/${name}.html`;
        const nasaUrl = `https://exoplanetarchive.ipac.caltech.edu/overview/${name}`;
        const simbadUrl = `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${object.hostname}`;
        const cutoutUrl = `https://alasky.u-strasbg.fr/hips-image-services/hips2fits?hips=P%2FDSS2%2Fcolor&ra=${object.ra}&dec=${object.dec}&fov=0.05&width=200&height=200&projection=SIN`;

        const popupHtml = `
      <div style="max-width:250px;font-family:sans-serif;">
        <h3 style="margin:0;color:#ff3333;">${object.pl_name}</h3>
        <p style="margin:0;"><strong>Host Star:</strong> ${object.hostname}</p>
        <p style="margin:0;"><strong>Planets in system:</strong> ${object.sy_pnum}</p>
        <p style="margin:0.5em 0;">
          <a href="${kyotoUrl}" target="_blank">Kyoto DB</a> •
          <a href="${nasaUrl}" target="_blank">NASA Archive</a> •
          <a href="${simbadUrl}" target="_blank">SIMBAD</a>
        </p>
        <img src="${cutoutUrl}" alt="Sky cutout"
             style="width:100%;border-radius:8px;box-shadow:0 0 4px rgba(0,0,0,0.3);" />
      </div>
    `;

        const source = A.source(object.ra, object.dec, {
            planet: object.pl_name,
            star: object.hostname,
            nr_of_planets: `Planets: ${object.sy_pnum}`,
            popupHtml, // Aladin Lite v3 shows this automatically
        });

        my_catalog.addSources([source]);
    };

    return <div id="aladin-lite-div" style={{ width: '100%', height: '500px' }} />;
};

export default Aladin;
