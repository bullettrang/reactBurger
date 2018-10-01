import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'           //we need applyMiddleware to use thunk below
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';        //This allows us to use asynchronous calls with REDUX
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
 import orderReducer from './store/reducers/order';
/*ADVANCED REDUX STORE SET UP */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;            //we need to compose our enhancers

const rootReducer = combineReducers({
    burgerBuilder:burgerBuilderReducer,
    orders:orderReducer
});
const store = createStore(rootReducer,composeEnhancers(                //we use composeEnhancers so we can use thunk
    applyMiddleware(thunk)
));       //do this for debugging Redux
/*END OF ADVANCED REDUX STORE SET UP */
const app =(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
