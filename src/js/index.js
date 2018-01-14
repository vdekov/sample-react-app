import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

const config = {
   products : [
      {
         name     : "TV",
         price    : 1000,
         currency : "USD"
      },
      {
         name     : "SSD",
         price    : 100,
         currency : "USD"
      }
   ],
   product_fields : [
      {
         label : 'Name',
         type  : 'text',
         name  : 'name'
      },
      {
         label : 'Price',
         type  : 'number',
         name  : 'price'
      },
      {
         label : 'Currency',
         type  : 'text',
         name  : 'currency'
      }
   ]
};

ReactDOM.render(
   <App {...config} />,
   document.getElementById( 'root' )
);