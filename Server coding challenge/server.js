const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const ( middelware } = require('./middelware/errorHandler');
const { Actors } = require('./models/actor-model');
const { Movies } = require('./models/movie-model');

const app = express();

app.patch('/api/add-movie-actor/:movie_ID', bodyParser, middelware, (req,res) => {
	let { id, firstName, lastName } = req.body;
	let movieID = req.params.movie_ID;
	
	if( !id){
		return res.status(406).message("id is missing in the body of the request");
	}
	
	if (id != movieID ){
		return res.status(409).message("id and movie_ID do not match");
	}
	
	if( !firstName || !lastName ){
		return res.status(403).message("you need to send both firstName and lastName of the actor to add to the movie list");
	}
	
	Movies
		.getMovieByID(id)
		.then( movie => {
			let cM = movie;
		})
		.catch( err => {
			return res.status(404).message("The movie do not exits");
		});
		
	Actors
		.getAutorByName(firstName)
		.then( actor => {
			let cA = actor;
		})
		.catch( err => {
			return res.status(404).message("The actor do not exits");
		});
		
	Movies
		.addActorToMovieList( cA )
		.then( movie => {
			return res.status(201).json(movie);
		})
		.catch( err => {
			return res.status(500).end;
		});
	
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});