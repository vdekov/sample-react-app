import React from "react";

function Button( props ) {
   return (
      <span className="button" onClick={ props.onClick }>
         { props.children }
      </span>
   );
}

export default Button;