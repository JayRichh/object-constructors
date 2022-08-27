"use strict";

// Create library array
let myLibrary = [];

// Start Class update for book constructor //
class Book {
  constructor() {
    this.title = "";
    this.author = "";
    this.pages = 0;
    this.read = false;
  }
}
// End Class update for book constructor //

// Function to get book from input, add it to library and render
const form = document.getElementById("inputForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get book info from input
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  // Create new book object
  const newBook = new Book();
  newBook.title = title;
  newBook.author = author;
  newBook.pages = pages;
  newBook.read = read;

  // Add book to library
  myLibrary.push(newBook);

  // Render library
  render();
  // Close input form
  toggleInputForm();
  // Clear input form
  form.reset();
});

// Function to create book card
function createBookCard() {
  const bookGrid = document.getElementById("book-grid");
  bookGrid.innerHTML = "";

  myLibrary.forEach((book, index) => {
    // for each book in the library
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", index);
    const bookCardTitle = document.createElement("p");
    bookCardTitle.id = "title";
    bookCardTitle.innerHTML = book.title;
    const bookCardAuthor = document.createElement("p");
    bookCardAuthor.id = "author";
    bookCardAuthor.innerHTML = book.author;
    const bookCardPages = document.createElement("p");
    bookCardPages.id = "pages";
    bookCardPages.innerHTML = book.pages;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const readButton = document.createElement("button");
    readButton.classList.add("is-read-button");

    // Add class to button based on read status of book
    if (book.read) {
      readButton.classList.add("read-book");
      readButton.innerHTML = "Read";
    } else {
      readButton.classList.add("not-read");
      readButton.innerHTML = "Not Read";
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", deleteBook);

    buttonGroup.appendChild(readButton);
    buttonGroup.appendChild(deleteButton);

    bookCard.appendChild(bookCardTitle);
    bookCard.appendChild(bookCardAuthor);
    bookCard.appendChild(bookCardPages);
    bookCard.appendChild(buttonGroup);

    bookGrid.appendChild(bookCard);

    readButton.addEventListener("click", toggleReadStatus);
  });
}

function toggleInputForm() {
  const inputForm = document.getElementById("overlay");
  if (inputForm.style.display === "none") {
    inputForm.style.display = "block";
  } else {
    inputForm.style.display = "none";
  }
  // Close input form if user clicks outside of it
  window.addEventListener("click", (e) => {
    if (e.target === inputForm) {
      // if the target of the click event is the inputForm
      inputForm.style.display = "none"; // then close the inputForm
    }
  });
}

// Function to render library
function render() {
  createBookCard();
}

// Function to toggle read status of book and update button color
function toggleReadStatus(e) {
  // e is the event object
  const index = e.target.parentElement.parentElement.getAttribute("data-index");
  // get the index of the book from the button that was clicked on (the button is the parent of the book card) and store it in the index variable
  myLibrary[index].read = !myLibrary[index].read; //
  // toggle the read status of the book
  if (myLibrary[index].read) {
    e.target.classList.remove("not-read");
    e.target.classList.add("read-book");
    e.target.innerHTML = "Read";
  } else {
    e.target.classList.remove("read");
    e.target.classList.add("not-read");
    e.target.innerHTML = "Not Read";
  }
}

// Function to delete book from library
function deleteBook(e) {
  const index = e.target.parentElement.parentElement.getAttribute("data-index");
  myLibrary.splice(index, 1); // remove the book from the library array
  render();
}

render(); // render the library on page load