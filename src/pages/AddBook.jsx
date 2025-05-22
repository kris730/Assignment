import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/bookSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  "Fiction", "Science Fiction", "Romance", "Classic",
  "Adventure", "Dystopian Fiction", "Historical Fiction",
  "Fantasy", "Horror", "Young Adult", "Philosophical Fiction",
];

const AddBook = () => {
  const [book, setBook] = useState({
    title: "", author: "", description: "",
    price: "", category: "", image: null, rating: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...book,
      id: Date.now(),
      coverImage: book.image ? URL.createObjectURL(book.image) : null,
      genre: book.category,
    };

    dispatch(addBook(newBook));

    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    storedBooks.push(newBook);
    localStorage.setItem("books", JSON.stringify(storedBooks));

    setBook({
      title: "", author: "", description: "",
      price: "", category: "", image: null, rating: 0,
    });

    document.getElementById("book-form").reset();
    navigate("/browse-books");
  };

  return (
    <div>
      <form id="book-form" onSubmit={handleSubmit}>
        <h2>Add a New Book</h2>
        <input name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={book.description} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={book.price} onChange={handleChange} required />

        <label>Category:</label>
        <select className="cat_select" name="category" value={book.category} onChange={handleChange} required>
          <option value="" disabled>Select a category</option>
          {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
        </select>

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        <label>Rating:</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} className={`star ${star <= book.rating ? "active" : ""}`} onClick={() => setBook({ ...book, rating: star })}>
              ★
            </span>
          ))}
        </div>

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;