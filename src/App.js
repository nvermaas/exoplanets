
import './App.css';
import { reducer, initialState } from './contexts/GlobalStateReducer';
import { GlobalContextProvider } from './contexts/GlobalContext';

import Main from './components/Main';

export default function App () {
    return (
        <GlobalContextProvider initialState={initialState} reducer={reducer}>
            <Main/>
        </GlobalContextProvider>
    );
}
