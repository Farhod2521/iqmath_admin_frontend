import { lazy } from "react";
import { Route } from "react-router-dom";

const BookCategories = lazy(() => import("./categories/pages/BookCategories"));
const BookTags = lazy(() => import("./tags/pages/BookTags"));
const Books = lazy(() => import("./books/pages/Books"));

const LibraryRoutes = (
  <Route path="/library">
    <Route path="book-categories" element={<BookCategories />} />
    <Route path="book-tags" element={<BookTags />} />
    <Route path="books" element={<Books />} />
  </Route>
);

export default LibraryRoutes;
