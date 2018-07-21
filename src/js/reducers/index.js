import { combineReducers } from 'redux';
import products from './products';
import permissions from './permissions';

const root_reducer = combineReducers({
   products,
   permissions
});

export default root_reducer;
