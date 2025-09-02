import React from 'react';
import A from 'aladin-lite'; // if installed via npm
import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    SET_SELECTED_EXOPLANET,
    ALADIN_RA,
    ALADIN_DEC,
    ALADIN_FOV,
} from '../../contexts/GlobalStateReducer';

const Aladin = (props) => {
    const [my_state, my_dispatch] = useGlobalReducer();

    React.useEffect(() => {
        A.init.then(() => {
            const aladin = A.aladin('#aladin-lite-div', {
                survey: 'P/DSS2/color',
                fov: parseFloat(my_state.aladin_fov) || 60,
                projection: 'SIN',
                fullScreen: false,
                cooFrame: 'equatorial',
            });

            aladin.gotoRaDec(my_state.aladin_ra, my_state.aladin_dec);

            // 🔹 now create layers
            createLayers(aladin, props.data);

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
        });
    }, [my_state.filtered_exoplanets, my_state.selected_exoplanet, my_state.aladin_reload]);

    // ➡️ helper to add circles
    const addCirclesToOverlay = (my_overlay, object, color, size) => {
        my_overlay.add(A.circle(object.ra, object.dec, size, { color, lineWidth: 2 }));
    };

// modernized createLayers for Aladin-Lite v3
    const createLayers = async (aladin, data) => {
        // clear previous overlays & catalogs
        aladin.removeLayers();

        // ✅ overlays with modern API
        const overlay_selected = A.graphicOverlay({
            name: 'Selected planet',
            color: 'yellow',
            lineWidth: 3,
            opacity: 0.8,
        });
        aladin.addOverlay(overlay_selected);

        const overlay_multiple = A.graphicOverlay({
            name: 'Multiple planets',
            color: 'lime',
            lineWidth: 2,
            opacity: 0.7,
        });
        aladin.addOverlay(overlay_multiple);

        // ✅ modern catalog with async popup rendering
        const exoCatalog = A.catalog({
            name: 'Exoplanets',
            shape: 'circle',
            color: '#ff3333',
            sourceSize: 18,
            labelColumn: 'star',
            displayLabel: true,
            onClick: (source) => {
                // inline popup with richer HTML
                const { planet, star, info, nr_of_planets } = source.data;
                aladin.popup(`<h3>${planet}</h3><p>Star: ${star}<br>${nr_of_planets}<br>${info}</p>`, source.ra, source.dec);
            },
        });

        if (data && data.length) {
            data.forEach((object) => {
                // selected planet highlight
                if (object.pl_name === my_state.selected_exoplanet) {
                    overlay_selected.add(A.circle(object.ra, object.dec, 1, { color: 'yellow', lineWidth: 2 }));
                }
                // multiple-planet system highlight
                else if (object.sy_pnum > 1) {
                    overlay_multiple.add(A.circle(object.ra, object.dec, 0.5, { color: 'lime', lineWidth: 2 }));
                }

                // add to catalog
                addToCatalog(exoCatalog, object);
            });

            aladin.addCatalog(exoCatalog);
        }

        // ✅ optional: Simbad query in v3 with async API
        try {
            const simbadCat = await A.catalogFromSimbad('M45', 0.2, {
                shape: 'plus',
                color: '#55dd55',
                sourceSize: 10,
                onClick: 'showPopup',
            });
            aladin.addCatalog(simbadCat);
        } catch (err) {
            console.warn('Simbad query failed:', err);
        }
    };


// modernized addToCatalog
    const addToCatalog = (my_catalog, object) => {
        const name = object.pl_name.replaceAll(' ', '_');

        // main exoplanet resource
        const kyotoUrl = `http://www.exoplanetkyoto.org/exohtml/${name}.html`;

        // optional NASA Exoplanet Archive link
        const nasaUrl = `https://exoplanetarchive.ipac.caltech.edu/overview/${name}`;

        // optional SIMBAD link
        const simbadUrl = `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${object.hostname}`;

        // optional star image (from CDS Aladin HiPS cutout service)
        const cutoutUrl = `https://alasky.u-strasbg.fr/hips-image-services/hips2fits?hips=P%2FDSS2%2Fcolor&ra=${object.ra}&dec=${object.dec}&fov=0.05&width=200&height=200&projection=SIN`;

        // richer popup content
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
      <img src="${cutoutUrl}" alt="Sky cutout" style="width:100%;border-radius:8px;box-shadow:0 0 4px rgba(0,0,0,0.3);" />
    </div>
  `;

        // create source with metadata for the popup
        const source = A.source(object.ra, object.dec, {
            planet: object.pl_name,
            star: object.hostname,
            nr_of_planets: `Planets: ${object.sy_pnum}`,
            popupHtml, // custom popup content
        });

        // add source
        my_catalog.addSources([source]);
    };


    return <div id="aladin-lite-div" style={{ width: '100%', height: '500px' }} />;
};

export default Aladin;
