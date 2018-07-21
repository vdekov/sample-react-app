import { Component } from 'react';
import { connect } from 'react-redux';
import { requestRemoveProduct } from '../actions';
import Button from '../components/Button';

const mapDispatchToProps = ( dispatch, own_props ) => ({
   onClick : () => {
      dispatch( requestRemoveProduct( own_props.index ) )
   }
});

export default connect( null, mapDispatchToProps )( Button );
