const permissions = ( state = [], action ) => {
   switch ( action.type ) {
      case 'RECEIVE_PERMISSIONS':
         return action.permissions;
      default:
         return state;
   }
}

export default permissions;
