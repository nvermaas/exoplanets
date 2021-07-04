import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faStar, faStarAndCrescent, faWrench, faSatellite, faMeteor, faGlobe, faMap,
    faBolt, faQuestionCircle, faImage, faCloudMeatball, faSmog, faThumbsUp, faThumbsDown, faEdit,
    faMapMarkedAlt, faClock, faArrowsAlt}
    from '@fortawesome/free-solid-svg-icons'

import { faListAlt } from '@fortawesome/free-regular-svg-icons'

export const getImageTypeIcon = (image_type) => {
    let icon = undefined
    if (image_type === 'moon') { icon = faMoon }
    if (image_type === 'solar system') { icon = faMeteor }
    if (image_type === 'stars wide angle') { icon = faStarAndCrescent }
    if (image_type === 'stars zoomed-in') { icon = faStar }
    if (image_type === 'deep sky') { icon = faSmog }
    if (image_type === 'spacecraft') { icon = faSatellite }
    if (image_type === 'scenery') { icon = faImage }
    if (image_type === 'technical') { icon = faWrench }
    if (image_type === 'event') { icon = faBolt }
    if (image_type === 'other') { icon = faQuestionCircle }
    return <FontAwesomeIcon icon={icon} color="darkblue"/>
}

export const getStarsIcon = (stars) => {
    let icon = faStar
    let color = "darkgreen"
    let size = 'grey'

    if (stars) {
        icon = faStar
        size = "md"
        color = "green"
    } else {
        icon = ["far", "faStar"]
        size = "md"
        color="grey"
    }
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getClockIcon = () => {
    let icon = faClock
    let color = "lightblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}

export const getMoveIcon = () => {
    let icon = faArrowsAlt
    let color = "lightblue"
    let size = 'sm'
    return <FontAwesomeIcon size={size} icon={icon} color={color}  />
}