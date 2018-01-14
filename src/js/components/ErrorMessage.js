import React from "react";

export default ({ children }) => {
   return <div className="help is-danger">{ children || 'There was an error!' }</div>
}