const preloaded_state = [
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
];

const products = ( state = preloaded_state, action ) => {
   switch ( action.type ) {
      case 'ADD_PRODUCT':
         return [
            ...state,
            {
               name     : action.name,
               price    : action.price,
               currency : action.currency
            }
         ];
      case 'REMOVE_PRODUCT':
         const next_state = state.slice();
         next_state.splice( action.id, 1 );
         return next_state;
      default:
         return state;
   }
}

export default products;
