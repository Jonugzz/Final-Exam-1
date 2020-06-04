import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form>
				<section>
					<label> Book name: </label>
					<input type="text"> </input>
					<button type="submit">
						Search
					</button>
				</section>
			</form>
        </div>
    );
}

export default BookForm;