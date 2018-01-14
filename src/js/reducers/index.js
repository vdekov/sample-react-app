import { combineReducers } from 'redux';
import products from './products';

const productsApp = combineReducers({
   products
});

export default productsApp