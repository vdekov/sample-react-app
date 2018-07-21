import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

class ProductsList extends React.Component {
   render() {
      const products_list = this.props.products.map( ( product, index ) => {
         return (
            <tr key={ index }>
               <td>{ index + 1 }</td>
               <td>{ product.name }</td>
               <td>{ product.price }</td>
               <td>{ product.currency }</td>
               { this.props.is_editable &&
                  <td>
                     <Button
                        className="is-small"
                        onClick={ this.editProduct.bind( this, index ) }
                     >
                        <i className="fas fa-edit"></i>
                     </Button>
                  </td>
               }
               { this.props.is_deletable &&
                  <td>
                     <Button
                        className="is-small is-danger is-outlined"
                        onClick={ this.deleteProduct.bind( this, index ) }
                     >
                        <i className="fas fa-trash-alt"></i>
                     </Button>
                  </td>
               }
            </tr>
         );
      });

      return (
         <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
               <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Currency</td>
                  { this.props.is_editable && <td>Edit</td> }
                  { this.props.is_deletable && <td>Delete</td> }
               </tr>
            </thead>
            <tbody>
               { products_list }
            </tbody>
         </table>
      );
   }

   editProduct( index ) {
      this.props.onEdit( index );
   }

   deleteProduct( index ) {
      this.props.onDelete( index );
   }
}

ProductsList.defaultProps = {
   is_editable  : false,
   is_deletable : false,
   onEdit       : function () {},
   onDelete     : function () {}
};

ProductsList.propTypes = {
   products     : PropTypes.array.isRequired,
   is_editable  : PropTypes.bool,
   is_deletable : PropTypes.bool,
   onEdit       : PropTypes.func,
   onDelete     : PropTypes.func
};

export default ProductsList;