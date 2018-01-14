import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import productsApp from './reducers';
import App from './components/App';

let store = createStore( productsApp );

ReactDOM.render(
   <Provider store={ store }>
      <App/>
   </Provider>,
   document.getElementById( 'root' )
);