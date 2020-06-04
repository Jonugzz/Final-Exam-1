import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      title : this.title,
	  author : this.autor,
	  thumbnail : this.thumbnail,
	  textSnipet : this.textSnipet
    }
  }

	let url = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + `${BookForm.input}`
	fetch(url, "GET") {
		.then( responseJSON => {
			let book = {
				title : responseJSON.volumeInfo.title,
				author : responseJSON.volumeInfo.authors,
				thumbnail : responseJSON.imageLinks.thumbnail,
				textSnipet : responseJSON.retailPrice.amount
			}
		})
		.catch( err => { 
			throw new Error( err );
		});
	}
	
  render(){
    return(
      <div>
        {book}
      </div>
    )
  }

}

export default App;
