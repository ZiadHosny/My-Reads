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
      // set shelf for new or updated book
      changedBook.shelf = shelf;
      // update state with changed book
      this.setState((prevState) => ({
        books: prevState.books
          // remove updated book from array
          .filter((book) => book.id !== changedBook.id)
          // add updated book to array
          .concat(changedBook),
      }));
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
