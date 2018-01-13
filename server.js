const restify = require( 'restify' );
const fs      = require( 'fs' );

const server = restify.createServer({
   name : 'sample-react-app'
});

server.use( restify.plugins.bodyParser({ mapParams: false }) );

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

// server.put( '/api', (request, response, next ) => {
//    response.send({
//       success : true,
//       message : 'OK',
//       data    : null
//    });
// });

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

server.get( '/\/.*/', restify.plugins.serveStatic({
   directory : __dirname + '/dist',
   default   : 'index.html'
}));

server.listen( 3000, () => {
   console.log( `${server.name} server is listening on http://127.0.0.1:3000` );
});