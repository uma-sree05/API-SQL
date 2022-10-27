const express = require("express");
const app = express();

const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `SELECT * FROM book ORDER BY book_id`;
  const booksArr = await db.all(getBooksQuery);
  response.send(booksArr);
});
