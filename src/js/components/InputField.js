import React from "react";
import PropTypes from 'prop-types';

function InputField ({
   label,
   type,
   name,
   value,
   onChange
}) {
   return (
      <div className="field">
         <label className="label">{ label || '' }</label>
         <div className="control">
            <input
               className="input"
               type={ type}
               name={ name }
               value={ value || '' }
               onChange={ onChange }
            />
         </div>
      </div>
   );
}

InputField.propTypes = {
   label    : PropTypes.string,
   type     : PropTypes.string.isRequired,
   name     : PropTypes.string.isRequired,
   value    : PropTypes.string,
   onChange : PropTypes.func.isRequired
};

export default InputField;