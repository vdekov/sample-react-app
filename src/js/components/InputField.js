import React from "react";

export default function ( props ) {
   return (
      <div className="field">
         <label className="label">{ props.label }</label>
         <div className="control">
            <input
               className="input"
               type={ props.type}
               name={ props.name }
               value={ props.value }
               onChange={ props.onChange }
            />
         </div>
      </div>
   );
}