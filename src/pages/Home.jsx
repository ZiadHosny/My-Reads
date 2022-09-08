import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Header from '../components/Header';
import * as BooksAPI from '../BooksAPI';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <>
      <Header />
      <BookList books={books} changeShelf={changeShelf} />
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </>
  );
};

export default Home;
