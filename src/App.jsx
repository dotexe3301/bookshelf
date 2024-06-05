import { Route, Routes } from "react-router-dom";
import BookSearch from "./BookSearch";
import BookShelf from "./Bookshelf";

function App() {
  return (
      <Routes>
        <Route path="/" exact element={<BookSearch />} />
        <Route path="/bookshelf" element={<BookShelf />} />
      </Routes>
  );
}

export default App;