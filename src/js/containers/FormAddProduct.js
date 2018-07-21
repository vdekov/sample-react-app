import { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../actions';
import Form from '../components/Form';

const mapDispatchToProps = ( dispatch, own_props ) => ({
   onSubmit : ( product ) => {
      dispatch( addProduct( product ) );
   }
});

export default connect( null, mapDispatchToProps )( Form );
