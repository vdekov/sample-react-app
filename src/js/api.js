class API {
   constructor() {
      this.api_url = '/api';
   }

   execute( options ) {
      return new Promise ( ( success, failure ) => {
         const init = {
            method : options.action || 'get'
         };

         // Prevents HEAD or GET Request cannot have a body error
         if ( ! ~[ 'head', 'get' ].indexOf( init.method ) ) {
            init.body = options.params || {};
         }

         fetch(
            options.url || this.api_url,
            init
         )
         .then( data => data.json() )
         .then( success )
         .catch( failure )
      });
   }
}

export default API;