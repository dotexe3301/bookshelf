import { useState, useEffect } from "react";

function BookShelf() {
  const [shelf, setShelf] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("bookshelf") || "[]");
    setShelf(savedBooks);
  }, []);

  const removeFromShelf = (bookKey) => {
    const updatedShelf = shelf.filter((book) => book.key !== bookKey);
    setShelf(updatedShelf);
    localStorage.setItem("bookshelf", JSON.stringify(updatedShelf));
  };

  return (
    <div>
      <div className="search">
        <h1>My Bookshelf</h1>
      </div>
      <div className="results">
        {shelf.length === 0 ? (
          <p>No books in your shelf.</p>
        ) : (
          shelf.map((book) => (
            <div key={book.key} className="card">
              <h3>{book.title}</h3>
              <span>
              <b>Edition Count:</b>
              {book.edition_count}
            </span>
              <button
                onClick={() => removeFromShelf(book.key)}
                className="addtoshelf"
              >
                Remove from Shelf
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BookShelf;