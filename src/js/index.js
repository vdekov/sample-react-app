import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import root_reducer from './reducers';
import App from './components/App';

const logger = createLogger();
const store  = createStore(
   root_reducer,
   applyMiddleware( thunk, logger )
);
console.log( store.getState() )
render(
   <Provider store={ store }>
      <App/>
   </Provider>,
   document.getElementById( 'root' )
);
