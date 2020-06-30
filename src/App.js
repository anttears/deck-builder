import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Sets from './components/sets/Sets';
import Cards from './components/cards/Cards';
import Deck from './components/deck/Deck';
import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <div className="container is-fluid">
                <h1>
                    <span className="icon">
                        <i className="fas fa-dice-d20" aria-hidden="true"></i>
                    </span>
                    <span>Deck Builder</span>
                </h1>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <Sets />
                        <Deck />
                    </div>
                    <div className="column"><Cards/></div>
                </div>
            </div>
        </Provider>
    ) ;
};

export default App;
