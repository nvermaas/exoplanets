import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { useGlobalReducer } from '../contexts/GlobalContext';

import LoadingSpinner from '../components/LoadingSpinner';
import HipsCard from '../components/HipsCard'

export default function HipsPage(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()
    console.log('HipsPage')

    // show spinner as long as the data is not read
    let hipsList = my_state.hipslist
    if (!hipsList || hipsList.length===0) return <LoadingSpinner/>

    let tabs_array = []
    for (var i = 0; i < hipsList.length; i++) {
        let my_tab = <Tab className="Tab" eventKey={hipsList[i]['title']} title={hipsList[i]['title']}>
            <HipsCard data={hipsList[i]}/>
        </Tab>
        tabs_array.push(my_tab)
    }

    return (
        <div className="App">
            <Tabs className="Tab" defaultActiveKey={hipsList[0]['title']} id="hips_tab">
                {tabs_array}
            </Tabs>
        </div>
    );
}