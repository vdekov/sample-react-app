import React from 'react';
import Form from './Form';
import Button from './Button';
import API from '../api'

class App extends React.Component {
   constructor( props ) {
      super( props );
      this.state = {
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
         permissions : [],
         form_props  : [
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

      this.addProduct = this.addProduct.bind( this );

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
      const is_editable   = this.isEditable();
      const is_deletable  = this.isDeletable();
      const products_list = this.state.products.map( ( product, index ) => {
         return (
            <tr key={index}>
               <td>{ index + 1 }</td>
               <td>{ product.name }</td>
               <td>{ product.price }</td>
               <td>{ product.currency }</td>
               { is_editable &&
                  <td><Button className="is-small" onClick={ this.editProduct.bind( this, index ) }><i className="fas fa-edit"></i></Button></td>
               }
               { is_deletable &&
                  <td><Button className="is-small is-danger is-outlined" onClick={ this.deleteProduct.bind( this, index ) }><i className="fas fa-trash-alt"></i></Button></td>
               }
            </tr>
         );
      });

      return (
         <div className="columns">
            { this.isWritable() &&
               <div className="column">
                  <Form
                     fields={ this.state.form_props }
                     onSubmit={ this.addProduct }
                  />
               </div>
            }

            { this.isReadable() &&
               <div className="column">
                  <table className="table is-fullwidth is-striped is-hoverable">
                     <thead>
                        <tr>
                           <td>#</td>
                           <td>Name</td>
                           <td>Price</td>
                           <td>Currency</td>
                           { is_editable && <td>Edit</td> }
                           { is_deletable && <td>Delete</td> }
                        </tr>
                     </thead>
                     <tbody>
                        { products_list }
                     </tbody>
                  </table>
               </div>
            }
         </div>
      );
   }

   addProduct( product ) {
      this.setState({
         products : [ ...this.state.products, product ]
      });
   }

   editProduct( index, event ) {
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

   deleteProduct( index, event ) {
      // Ask for a confirmation before to execute the API call
      const result = window.confirm( 'Are you sure you want to delete this product?' );

      if ( ! result ) {
         return;
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

         const next_products   = this.state.products.slice();
         const deleted_product = next_products.splice( index, 1 );

         this.setState({
            products : next_products
         });
      }).catch( errpr => {
         console.error( error.message );
      });
   }

   isWritable() {
      return !! ~this.state.permissions.indexOf( 'CREATE' );
   }

   isReadable() {
      return !! ~this.state.permissions.indexOf( 'READ' );
   }

   isEditable() {
      return !! ~this.state.permissions.indexOf( 'UPDATE' );
   }

   isDeletable() {
      return !! ~this.state.permissions.indexOf( 'DELETE' );
   }
}

export default App;