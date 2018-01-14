import React from "react";
import InputField from "./InputField";
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import PropTypes from 'prop-types';

class Form extends React.Component {
   constructor( props ) {
      super( props );
      this.empty_state = {};
      this.is_valid    = true;

      // Configure the state - prefill all input fields with an empty value
      this.props.fields.forEach( ( field ) => {
         this.empty_state[ field.name ] = '';
      })

      // Bind the component methods to prevent the creation of new functions
      // on each render method execution.
      this.onChange = this.onChange.bind( this );
      this.onSubmit = this.onSubmit.bind( this );
   }

   componentWillMount() {
      this.setState( this.empty_state );
   }

   render() {
      if ( ! this.props.fields.length ) {
         return null;
      }

      return (
         <div>
            <form onSubmit={ ( e ) => e.preventDefault() }>
               {this.props.fields.map( ( field, index ) => {
                  return <InputField
                     key={ index }
                     label={ field.label }
                     type={ field.type }
                     name={ field.name }
                     value={ this.state[ field.name ] }
                     onChange={ this.onChange }
                  />
               })}
               <div className="field">
                  <div className="control">
                     <Button className="is-link" onClick={ this.onSubmit }>Add Product</Button>
                  </div>
               </div>
               { ! this.is_valid && <ErrorMessage>All input fields are required!</ErrorMessage> }
            </form>
         </div>
      );
   }

   onChange( event ) {
      const target = event.target;

      // Update the input field value in the component state
      this.setState({
         [target.name] : target.value
      });
   }

   onSubmit( event ) {
      // Make a check if all input fields are filled
      if ( Object.values( this.state ).includes( '' ) ) {
         this.is_valid = false;
         this.setState({});
         return;
      }

      // Execute `onSubmit` callback with the fields value object
      this.props.onSubmit( Object.assign( {}, this.state ) );
      this.resetState();
   }

   resetState() {
      // Clear the input fields values
      this.is_valid = true;
      this.setState( this.empty_state );
   }
}

Form.propTypes = {
   fields   : PropTypes.array.isRequired,
   onSubmit : PropTypes.func.isRequired
};

export default Form;