// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import BookCategories from '../Components/BookCategories';
// import BookList from '../Components/BookList';
// import { useNavigate } from 'react-router-dom';
// // Dummy book data for initial display
// const dummyBooks = [
//   { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction' },
//   { id: 2, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History' },
//   { id: 3, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help' },
//   { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
//   { id: 5, title: 'Deep Work', author: 'Cal Newport', genre: 'Productivity' }
// ];

// const Home = () => {
//   const books = useSelector((state) => state.book.books || dummyBooks);
//   const [searchTerm, setSearchTerm] = useState('');

//   const { category } = useParams(); // Get category from URL

//   // Filter books based on category
//   const filteredBooks = books.filter((book) => {
//     if (category) {
//       return book.genre === category;
//     }
//     return true; // Show all books if no category is selected
//   });

//   // Filter books based on search term
//   const searchedBooks = filteredBooks.filter((book) =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h2><i>"Welcome User! Dive into our vast collection of books. Find your next favorite read!"</i></h2>

//       {/* Book Categories with "Go Back" button */}
//       <div>
//         <BookCategories onCategorySelect={(category) => window.location.href = `/books/${category}`} />
//         {category && (
//           <button className="clear-filter-button" onClick={() => window.location.href = '/books'}>
//             Go Back
//           </button>
//         )}
//       </div>

//       {/* Search Bar */}
//       <input
//         className="search-Bar"
//         type="text"
//         placeholder="Search by title or author..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <h2>Popular Books</h2>

//       {/* Display filtered books */}
//       <BookList books={searchedBooks} />
//     </div>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookCategories from '../Components/BookCategories';
import BookList from '../Components/BookList';

// Dummy book data
const dummyBooks = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction' },
  { id: 2, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help' },
  { id: 4, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy' },
  { id: 5, title: 'Deep Work', author: 'Cal Newport', genre: 'Productivity' }
];

const BrowseBooks = () => {
  const books = useSelector((state) => state.book.books || dummyBooks);
  const { category } = useParams();
  const navigate = useNavigate(); // React Router navigation

  const [searchTerm, setSearchTerm] = useState('');

  // Filter books based on category
  const filteredBooks = books.filter((book) => {
    if (category) {
      return book.genre.toLowerCase() === category.toLowerCase();
    }
    return true; // Show all books if no category is selected
  });

  // Filter books based on search term
  const searchedBooks = filteredBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2><i>"Explore Books by Category or Search Below!"</i></h2>

      {/* Book Categories with Navigation Fix */}
      <div>
        <BookCategories onCategorySelect={(selectedCategory) => navigate(`/browse-books/${selectedCategory}`)} />
        {category && (
          <button className="clear-filter-button" onClick={() => navigate('/browse-books')}>
            Go Back
          </button>
        )}
      </div>

      {/* Search Bar */}
      <input
        className="search-Bar"
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2>Available Books</h2>

      {/* Display filtered books */}
      {searchedBooks.length > 0 ? (
        <BookList books={searchedBooks} />
      ) : (
        <h3>No books found. Try a different search or category!</h3>
      )}
    </div>
  );
};

export default BrowseBooks;
