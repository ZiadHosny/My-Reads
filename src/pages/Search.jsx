import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import Book from '../components/Book';
import * as BooksAPI from '../BooksAPI';

const Search = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => setBooks(books));
  }, []);

  const changeShelf = (changedBook, shelf) => {
    BooksAPI.update(changedBook, shelf).then((response) => {
      changedBook.shelf = shelf;
      setBooks(
        books.filter((book) => book.id !== changedBook.id).concat(changedBook)
      );
    });
  };

  const getBooks = (event) => {
    const query = event.target.value;
    setQuery(query);
    
    if (query) {
      BooksAPI.search(query.trim(), 20).then((books) => {
        books.length > 0 ? setNewBooks(books) : setNewBooks([]);
      });
    } else setNewBooks([]);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={getBooks}
          />
        </div>
      </div>
      <div className="search-books-results">
        {newBooks.length > 0 && (
          <div>
            <h3>Search returned {newBooks.length} books </h3>
            <ol className="books-grid">
              {newBooks.map((book) => (
                <Book
                  book={book}
                  books={books}
                  key={book.id}
                  changeShelf={changeShelf}
                />
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
