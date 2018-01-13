import React from "react";
import InputField from "./InputField";

class Form extends React.Component {
   constructor( props ) {
      super( props );
      this.empty_state = {};
      this.is_valid    = true;

      // Configure the state
      this.props.fields.forEach( ( field ) => {
         this.empty_state[ field.name ] = '';
      })

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
            <form onSubmit={ this.onSubmit }>
               {this.props.fields.map( ( field, index ) => {
                  return <InputField
                     key={index}
                     label={ field.label }
                     type={ field.type }
                     name={ field.name }
                     value={ this.state[ field.name ] }
                     onChange={ this.onChange }
                  />
               })}
               <button type="submit" name="submit">Add</button>
            </form>
            { ! this.is_valid && <span className="error-message">All fields are required!</span> }
         </div>
      );
   }

   onChange( event ) {
      const target = event.target;

      this.setState({
         [target.name] : target.value
      });
   }

   onSubmit( event ) {
      event.preventDefault();

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
      this.is_valid = true;
      this.setState( this.empty_state );
   }
}

export default Form;