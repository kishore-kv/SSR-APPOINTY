const path = require( 'path' );
console.log('FORCE_COLOR:', process.env.FORCE_COLOR);


require( 'ignore-styles' );

require( '@babel/register')( {
    configFile: path.resolve( __dirname, '../babel.config.js' ),
} );

require( './express.js' );