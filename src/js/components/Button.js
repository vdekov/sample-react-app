import React from "react";

export default function ( props ) {
   return (
      <button
         className={ "button " + props.className || '' }
         onClick={ props.onClick || function () {} }
      >
         { props.children }
      </button>
   );
}