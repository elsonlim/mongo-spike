import React from 'react';
import Header from './Header';
import Map from './Map';
import './App.css';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise-middleware';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import Middleware from './middleware';

const store = createStore(
    reducer,
    applyMiddleware(Middleware.loading, Middleware.error, reduxPromise)
);

const App = () => (
    <Provider store={store}>
        <div className="App" >
            <Header />
            <Map />
        </div>
    </Provider>
);

export default App;
