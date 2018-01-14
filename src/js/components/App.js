import React from 'react'
import AddProduct from './AddProduct'
import ProductsList from './ProductsList'
import API from '../api'
import PropTypes from 'prop-types'

class App extends React.Component {
   constructor( props ) {
      super( props );
      this.state = {
         products    : [ ...this.props.products ],
         permissions : []
      };

      // Bind the component methods to prevent the creation of new functions
      // on each render method execution.
      this.addProduct    = this.addProduct.bind( this );
      this.editProduct   = this.editProduct.bind( this );
      this.deleteProduct = this.deleteProduct.bind( this );

      // Instantiate new API object
      this.api = new API();
   }

   componentWillMount() {
      // Execute an API request to get the available permissions
      this.api.execute({
            action : 'get',
            url    : 'permissions'
      }).then( data => {
         if ( ! data.success ) {
            console.error( 'There wan an error during the API call execution.' );
            return;
         }
         this.setState( data.data );
      }).catch( error => {
         console.error( error.message );
      });
   }

   render() {
      return (
         <div className="columns">
            { this.isWritable() &&
               <div className="column">
                  <AddProduct
                     fields={ this.props.product_fields }
                     onSubmit={ this.addProduct }
                  />
               </div>
            }

            { this.isReadable() &&
               <div className="column">
                  <ProductsList
                     products={ this.state.products }
                     is_editable={ this.isEditable() }
                     is_deletable={ this.isDeletable() }
                     onEdit={ this.editProduct }
                     onDelete={ this.deleteProduct }
                  />
               </div>
            }
         </div>
      );
   }

   /**
    * Add new product object to the state
    * @param  {Object} product
    */
   addProduct( product ) {
      this.setState({
         products : [ ...this.state.products, product ]
      });
   }

   /**
    * Modify existing product by a given index
    * @param  {Number} index
    */
   editProduct( index ) {
      // Add a signature for a fake edit product API call execution
      /*
      this.api.execute({
         action : 'put',
         params : JSON.stringify({ id : index })
      }).then( data => {
         if ( ! data.success ) {
            console.error( 'There wan an error during the API call execution.' );
            return;
         }
      }).catch( errpr => {
         console.error( error.message );
      });
      */
   }

   /**
    * Remove existing product from the state by a given index
    * @param  {Number} index
    * @return {Array}  deleted_product
    */
   deleteProduct( index ) {
      // Ask for a confirmation before to execute the API call
      const result = window.confirm( 'Are you sure you want to delete this product?' );

      if ( ! result ) {
         return [];
      }

      // Execute an API request to delete the product from the storage
      this.api.execute({
         action : 'delete',
         params : JSON.stringify({ id : index })
      }).then( data => {
         if ( ! data.success ) {
            console.error( 'There wan an error during the API call execution.' );
            return;
         }

         const next_products   = [ ...this.state.products ];
         const deleted_product = next_products.splice( index, 1 );

         this.setState({
            products : next_products
         });

         return deleted_product;
      }).catch( errpr => {
         console.error( error.message );
      });
   }

   /**
    * Make a check for a write permissions
    * @return {Boolean}
    */
   isWritable() {
      return !! ~this.state.permissions.indexOf( 'CREATE' );
   }

   /**
    * Make a check for a read permissions
    * @return {Boolean}
    */
   isReadable() {
      return !! ~this.state.permissions.indexOf( 'READ' );
   }

   /**
    * Make a check for a update permissions
    * @return {Boolean}
    */
   isEditable() {
      return !! ~this.state.permissions.indexOf( 'UPDATE' );
   }

   /**
    * Make a check for a delete permissions
    * @return {Boolean}
    */
   isDeletable() {
      return !! ~this.state.permissions.indexOf( 'DELETE' );
   }
}

App.propTypes = {
   products       : PropTypes.array.isRequired,
   product_fields : PropTypes.array.isRequired
};

export default App;