const myLibrary = [
    {
        title: "A Game of Thrones",
        author: "George R. R. Martin",
        pages: 694,
        read: false
    },
    {
        title: "Tassen feirer jul",
        author: "Han fyren",
        pages: 12,
        read: true
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function render(){
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        let readContainer = book.read ? "read-container" : "unread-container";
        let readStatus = book.read ? "✓ I've read this." : "✗ I haven't read this yet.";
        let buttonText = book.read ? "Mark as unread" : "Mark as read";
        
        bookEl.classList.add("book-container");
        bookEl.innerHTML = `
        <div class="book-top">
            <p class="book-number">${i+1}</p>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-pages">${book.pages} pages long</p>
        </div>
        <div class=${readContainer}>
            <p>${readStatus}</p>
            <button class="change-read-status" data-index="${i}">${buttonText}</button>
        </div>
        </div>
        `;
        libraryEl.appendChild(bookEl);
    }
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    render();
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "none";
}

let newBookBtn = document.querySelector("#new-book-btn");
newBookBtn.addEventListener("click", function() {
    let newBookForm = document.querySelector("#new-book-form");
    newBookForm.style.display = "grid";
    }
)

document.querySelector("#new-book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    addBookToLibrary();
})

document.addEventListener("click", function(event) {
    if (event.target && event.target.className === "change-read-status") {
        const index = event.target.getAttribute('data-index');
        myLibrary[index].read = !myLibrary[index].read;
        render();
    }
});