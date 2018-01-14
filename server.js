const restify = require( 'restify' );
const fs      = require( 'fs' );

// Configure the restify server
const server = restify.createServer({
   name : 'sample-react-app'
});

// Handle GET request to the permissions URL
server.get( '/permissions', ( request, response, next ) => {
   fs.readFile( 'permissions.json', 'utf-8', ( err, data ) => {
      if ( err ) {
         throw err;
      }

      response.send({
         success : true,
         message : 'OK',
         data    : JSON.parse( data )
      });
   });
});

// Handle PUT requests to the API
// server.put( '/api', (request, response, next ) => {
//    response.send({
//       success : true,
//       message : 'OK',
//       data    : null
//    });
// });

// Handle DELETE requests to the API
server.del( '/api', ( request, response, next ) => {
   const params = JSON.parse( request.body );
   const id     = params.id;

   // Execute delete action based on the `id` parameter

   response.send({
      success : true,
      message : 'OK',
      data    : null
   });
});

// Handle static files requests
server.get( '/\/.*/', restify.plugins.serveStatic({
   directory : __dirname + '/dist',
   default   : 'index.html'
}));

// Run the server
server.listen( 3000, () => {
   console.log( `${server.name} server is listening on http://127.0.0.1:3000` );
});