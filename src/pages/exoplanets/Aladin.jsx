import React, { useEffect, useRef } from 'react';
import A from 'aladin-lite';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    SET_SELECTED_EXOPLANET,
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
} from '../../contexts/GlobalStateReducer';

const Aladin = ({ data }) => {
    const [my_state, my_dispatch] = useGlobalReducer();

    // persistent refs for viewer, overlays, and catalog
    const aladinRef = useRef(null);
    const overlaySelectedRef = useRef(null);
    const overlayMultipleRef = useRef(null);
    const exoCatalogRef = useRef(null);

    useEffect(() => {
        A.init.then(() => {
            if (!aladinRef.current) {
                // initialize Aladin Lite once
                aladinRef.current = A.aladin('#aladin-lite-div', {
                    survey: 'P/DSS2/color',
                    fov: parseFloat(my_state.aladin_fov) || 60,
                    projection: 'SIN',
                    cooFrame: 'equatorial',
                });

                const aladin = aladinRef.current;

                // create persistent overlays
                overlaySelectedRef.current = A.graphicOverlay({
                    name: 'Selected planet',
                    color: 'yellow',
                    lineWidth: 3,
                    opacity: 0.8,
                });
                aladin.addOverlay(overlaySelectedRef.current);

                overlayMultipleRef.current = A.graphicOverlay({
                    name: 'Multiple planets',
                    color: 'lime',
                    lineWidth: 2,
                    opacity: 0.7,
                });
                aladin.addOverlay(overlayMultipleRef.current);

                // create persistent catalog
                exoCatalogRef.current = A.catalog({
                    name: 'Exoplanets',
                    shape: 'circle',
                    color: '#ff3333',
                    sourceSize: 18,
                    labelColumn: 'star',
                    displayLabel: true,
                });
                aladin.addCatalog(exoCatalogRef.current);

                // hover listener to update global state
                aladin.on('objectHovered', (object) => {
                    const [ra, dec] = aladin.getRaDec();
                    my_dispatch({ type: ALADIN_RA, aladin_ra: ra });
                    my_dispatch({ type: ALADIN_DEC, aladin_dec: dec });
                    const [fovX] = aladin.getFov();
                    my_dispatch({ type: ALADIN_FOV, aladin_fov: fovX });

                    if (object?.data?.planet) {
                        my_dispatch({
                            type: SET_SELECTED_EXOPLANET,
                            selected_exoplanet: object.data.planet,
                        });
                    }
                });

                // add optional Simbad catalog
                A.catalogFromSimbad(
                    'M45',
                    0.2,
                    { shape: 'plus', color: '#55dd55', sourceSize: 10, onClick: 'showPopup' },
                    (simbadCat) => aladin.addCatalog(simbadCat)
                );
            }

            // always update RA/DEC
            aladinRef.current.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec);

            // populate overlays & catalog
            updateLayersAndCatalog(data);
        });
    }, [
        data,
        my_state.selected_exoplanet,
        my_state.aladin_ra,
        my_state.aladin_dec,
        my_state.aladin_fov,
    ]);

    // helper: clear overlays & catalog and redraw
    const updateLayersAndCatalog = (data) => {
        if (!aladinRef.current) return;

        overlaySelectedRef.current.removeAll();
        overlayMultipleRef.current.removeAll();
        exoCatalogRef.current.clear();

        if (!data || !data.length) return;

        data.forEach((object) => {
            // selected planet highlight
            if (object.pl_name === my_state.selected_exoplanet) {
                overlaySelectedRef.current.add(
                    A.circle(object.ra, object.dec, 1, { color: 'yellow', lineWidth: 2 })
                );
            }
            // multiple-planet system highlight
            else if (object.sy_pnum > 1) {
                overlayMultipleRef.current.add(
                    A.circle(object.ra, object.dec, 0.5, { color: 'lime', lineWidth: 2 })
                );
            }

            // add marker with popup
            addToCatalog(exoCatalogRef.current, object);
        });
    };

    // modern addToCatalog with popupHtml
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
            popupHtml, // shown automatically by Aladin Lite v3
        });

        my_catalog.addSources([source]);
    };

    return <div id="aladin-lite-div" style={{ width: '100%', height: '500px' }} />;
};

export default Aladin;
