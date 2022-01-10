import "isomorphic-fetch";
import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import configureStore from "./store/configureStore";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Routes></Routes>
    </BrowserRouter>
</Provider>
    , document.getElementById('root'));
