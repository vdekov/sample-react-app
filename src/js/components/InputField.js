import React from "react";

export default function ( props ) {
   return (
      <label>
         { props.label }
         <input
            type={ props.type}
            name={ props.name }
            value={ props.value }
            onChange={ props.onChange }
         />
      </label>
   );
}