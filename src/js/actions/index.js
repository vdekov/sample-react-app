import API from '../api';
const api = new API();

export const addProduct = ({ name, price, currency }) => ({
   type : 'ADD_PRODUCT',
   name,
   price,
   currency,
});

const removeProduct = ( id ) => ({
   type : 'REMOVE_PRODUCT',
   id,
});

export const requestRemoveProduct = ( id ) => ( dispatch ) => {
   // Ask for a confirmation before to execute the API call
   const result = window.confirm( 'Are you sure you want to delete this product?' );

   if ( ! result ) {
      return;
   }

   // Execute an API request to delete the product from the storage
   api.execute({
      action : 'delete',
      params : JSON.stringify({ id })
   }).then( data => {
      if ( ! data.success ) {
         console.error( 'There wan an error during the API call execution.' );
         return;
      }

      dispatch( removeProduct( id ) );
   }).catch( errpr => {
      console.error( error.message );
   });
};

const updateProduct = ({ id, name, price, currency }) => ({
   type : 'UPDATE_PRODUCT',
   id,
   name,
   price,
   currency,
});

export const requestUpdateProduct = ({ id, name, price, currency }) => ( dispatch ) => {
   // Add a signature for a fake edit product API call execution
   api.execute({
      action : 'put',
      params : JSON.stringify({ id })
   }).then( data => {
      if ( ! data.success ) {
         console.error( 'There wan an error during the API call execution.' );
         return;
      }
   }).catch( errpr => {
      console.error( error.message );
   });
}

const receivePermissions = ( permissions ) => ({
   type : 'RECEIVE_PERMISSIONS',
   permissions
});

export const fetchPermissions = () => {
   return ( dispatch ) => {
      // Execute an API request to get the available permissions
      api.execute({
            action : 'get',
            url    : 'permissions'
      }).then( data => {
         if ( ! data.success ) {
            console.error( 'There wan an error during the API call execution.' );
            return;
         }

         dispatch( receivePermissions( data.data.permissions ) );
      }).catch( error => {
         console.error( error.message );
      });
   };
}
