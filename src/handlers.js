const book = require("./books");
const { nanoid } = require("nanoid");

const addBooksHandler = (request, h) => {
  const {
    name,
    author,
    year,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = readPage === pageCount;

  if (readPage > pageCount) {
    let response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);

    return response;
  } else if (name === undefined) {
    let response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });

    response.code(400);

    return response;
  } else {
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    book.push(newBook);

    const success = book.filter((b) => b.id === id).length > 0;

    if (success) {
      let response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      });

      response.code(201);
      return response;
    }
  }
  let response = h.response({
    status: "failed",
    message: "Gagal menambahkan buku",
  });

  response.code(500);

  return response;
};

const getBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const isIncluded = book.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase())
    );
    const response = h.response({
      status: "success",
      data: {
        books: isIncluded.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (reading) {
    const isReading = book.filter((b) => b.reading === reading);
    const response = h.response({
      status: "success",
      data: {
        books: isReading.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (finished) {
    const isFinished = book.filter((b) => b.finished == finished);
    const response = h.response({
      status: "success",
      data: {
        books: isFinished.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "success",
      data: {
        books: book.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const b = book.filter((b) => b.id === id)[0];

  if (b) {
    return {
      status: "success",
      data: {
        b,
      },
    };
  }

  const response = h.response({
    status: "success",
    message: "Buku tidak ditemukan",
  });

  response.code(404);

  return response;
};

const editBooks = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = book.findIndex((n) => n.id === id);

  if (index) {
    if (!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku",
      });

      // console.log(name.length);

      return response;
    } else if (!index) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku",
      });

      response.code(404);

      return response;
    } else if (readPage > pageCount) {
      let response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(400);

      return response;
    } else {
      book[index] = {
        ...book[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
      const response = h.response({
        status: "success",
        message: "Updated book",
      });

      response.code(201);
      return response;
    }
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan",
  });
  response.code(404);

  return response;
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;

  const index = book.findIndex((n) => id === n.id);

  console.log(index);

  if (index === -1) {
    const response = h.response({
      status: "Gagal",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });

    response.code(404);

    return response;
  }

  book.splice(index, 1);

  const response = h.response({
    status: "Berhasil",
    message: "Berhasil menghapus buku",
  });

  response.code(201);

  return response;
};

module.exports = {
  addBooksHandler,
  getBooksHandler,
  getBooksByIdHandler,
  editBooks,
  deleteBookHandler,
};
