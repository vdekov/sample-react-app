export const addProduct = ( name, price, currency ) => {
   return {
      type : 'ADD_PRODUCT',
      name,
      price,
      currency
   };
}

export const removeProduct = ( id ) => {
   return {
      type : 'REMOVE_PRODUCT',
      id
   };
}