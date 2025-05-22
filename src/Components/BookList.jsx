import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books && books.length > 0 ? (
        books.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <p className="no-books-message">No books found. Try adjusting your search or category.</p>
      )}
    </div>
  );
};

export default BookList;

