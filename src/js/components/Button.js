import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
   className,
   onClick,
   children
}) => {
   return (
      <button
         className={ "button " + className }
         onClick={ onClick }
      >
         { children }
      </button>
   );
}

Button.defaultProps = {
   onClick : function () {}
};

Button.propTypes = {
   className : PropTypes.string,
   onClick   : PropTypes.func.isRequired,
   children  : PropTypes.node.isRequired
};

export default Button;