const {
  addBooksHandler,
  getBooksHandler,
  getBooksByIdHandler,
  editBooks,
  deleteBook,
  deleteBookHandler
} = require("./handlers");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBooksByIdHandler,
  },
    {
      method: "PUT",
      path: "/books/{id}",
      handler: editBooks,
    },
    {
      method: "DELETE",
      path: "/books/{id}",
      handler: deleteBookHandler,
    },
];

module.exports = routes;
