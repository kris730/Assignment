import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => (
  <div className="book__card">
    <img
      src={book.coverImage || 'https://via.placeholder.com/200x300'}
      alt={book.title || 'Book Cover'}
      className="book-image"
    />

    <div className="book-details">
      <h3>{book.title || 'Unknown Title'}</h3>
      <p><strong>Author:</strong> {book.author || 'Unknown Author'}</p>
      <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
      <p><strong>Price:</strong> {book.price ? `$${book.price}` : 'Price not listed'}</p>
      <p><strong>Category:</strong> {book.genre }</p>

      <div className="visit_book">
        <Link to={`/book/${book.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  </div>
);

export default BookCard;
