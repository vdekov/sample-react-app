import React from 'react';
import { connect } from 'react-redux';
import FormAddProduct from '../containers/FormAddProduct';
import Button from './Button';
import DeleteButton from '../containers/DeleteButton';
import { fetchPermissions } from '../actions';
import { add_product } from '../config/form_fields';

class App extends React.Component {
   componentWillMount() {
      this.props.fetchPermissions();
   }

   render() {
      const {
         products,
         is_writable,
         is_readable,
         is_editable,
         is_deletable,
      } = this.props;

      const products_list = products.map( ( product, index ) => {
         return (
            <tr key={index}>
               <td>{ index + 1 }</td>
               <td>{ product.name }</td>
               <td>{ product.price }</td>
               <td>{ product.currency }</td>
               { is_editable &&
                  <td><Button className="is-small" onClick={ (() => {}).bind( this, index ) } index={ index }><i className="fas fa-edit"></i></Button></td>
               }
               { is_deletable &&
                  <td><DeleteButton className="is-small is-danger is-outlined" index={ index }><i className="fas fa-trash-alt"></i></DeleteButton></td>
               }
            </tr>
         );
      });

      return (
         <div className="columns">
            { is_writable &&
               <div className="column">
                  <FormAddProduct fields={ add_product }/>
               </div>
            }

            { is_readable &&
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
}

const mapStateToPros = ( state, own_props ) => ({
   products     : state.products,
   is_writable  : state.permissions.includes( 'CREATE' ),
   is_readable  : state.permissions.includes( 'READ' ),
   is_editable  : state.permissions.includes( 'UPDATE' ),
   is_deletable : state.permissions.includes( 'DELETE' ),
});

const mapDispatchToProps = ( dispatch, own_props ) => ({
   fetchPermissions : () => {
      dispatch( fetchPermissions() );
   },
});

App = connect( mapStateToPros, mapDispatchToProps )( App );

export default App;
