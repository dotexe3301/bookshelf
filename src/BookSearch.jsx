import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookSearch() {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (query.length > 1) {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
      );
      const data = await response.json();
      setBooks(data.docs);
    }
  };

  const addToBookShelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];

    const isBookAlreadyAdded = bookshelf.some(
      (savedBook) => savedBook.key === book.key
    );

    if (!isBookAlreadyAdded) {
      bookshelf.push(book);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    } else {
      alert("This book is already in your bookshelf!");
    }
  };

  const goToBookShelf = () => {
    navigate("/bookshelf");
  };

  return (
    <div className="booksearch">
      <h1>Search by book name:</h1>
      <div className="bar">
        <div className="search">
          <input
            type="search"
            className="search-box"
            value={query}
            onChange={handleSearch}
          />
        </div>
        <div className="shelf">
          <input
            type="button"
            value="Bookshelf"
            className="shelf-btn"
            onClick={goToBookShelf}
          />
        </div>
      </div>
      <div className="results">
        {books.map((book) => (
          <div key={book.key} className="card">
            <h3>{book.title}</h3>
            <span>
              <b>Edition Count:</b>
              {book.edition_count}
            </span>
            <button onClick={() => addToBookShelf(book)} className="addtoshelf">
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
