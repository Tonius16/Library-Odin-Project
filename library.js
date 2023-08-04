const addBookBtn = document.getElementById("addBookBtn");
const bookCounter = document.getElementById("bookCounter");
const mainDiv = document.getElementById("mainDiv");
const popUpDiv = document.getElementById("popUpDiv");
const form = document.getElementById("form");
const field = document.getElementById("field");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("numPgs");
const readCheck = document.getElementById("readCheck");
const postBookBtn = document.getElementById("postBookBtn");

popUpDiv.style.display = "none";

let libraryArr = [];

bookCounter.textContent = `Total books in library: ${libraryArr.length}`;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  let newBook = Object.create(Book);
  newBook.title = titleInput.value;
  newBook.author = authorInput.value;
  newBook.pages = pagesInput.value;
  if (readCheck.checked) {
    newBook.read = true;
  } else {
    newBook.read = false;
  }
  let card = document.createElement("div");
  card.setAttribute("data-index-number", libraryArr.indexOf(newBook));
  card.setAttribute("id", "card");
  card.setAttribute("class", "cards");
  let paraDiv = document.createElement("div");
  paraDiv.setAttribute("id", "paraDiv");
  paraDiv.setAttribute("class", "paraDiv");
  let rmvBtn = document.createElement("button");
  rmvBtn.setAttribute("id", "rmvBtn");
  let rmvImg = document.createElement("img");
  rmvImg.setAttribute("id", "rmvImg");
  rmvImg.setAttribute("src", "./imgs/icons8-remove-48.png");
  rmvImg.style.cursor = "pointer";
  let titlePara = document.createElement("p");
  titlePara.setAttribute("class", "titlePara");
  titlePara.textContent = titleInput.value;
  let titleParaArr = Array.from(document.getElementsByClassName("titlePara"));
  let authorPara = document.createElement("p");
  authorPara.setAttribute("class", "authorPara");
  authorPara.textContent = authorInput.value;
  let authorParaArr = Array.from(document.getElementsByClassName("authorPara"));
  let pagesPara = document.createElement("p");
  pagesPara.textContent = `${pagesInput.value} Pages`;
  let readDiv = document.createElement("div");
  readDiv.setAttribute("class", "readDiv");
  let checkDiv = document.createElement("div");
  checkDiv.setAttribute("class", "checkDiv");
  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "imgDiv");
  let img = document.createElement("img");
  img.setAttribute("src", "/imgs/check-mark-icon.png");
  img.setAttribute("class", "checkIcon");
  img.style.cursor = "pointer";
  let paraReadDiv = document.createElement("div");
  paraReadDiv.setAttribute("class", "paraRead");
  let paraRead = document.createElement("p");
  paraRead.textContent = "Read";
  let sameTitle = false;
  let sameAuthor = false;
  if (titleParaArr === [] && authorParaArr === []) {
    return;
  } else {
    titleParaArr.forEach((element) => {
      if (element.textContent === titleInput.value) {
        sameTitle = true;
      }
    });
    authorParaArr.forEach((element) => {
      if (element.textContent === authorInput.value) {
        sameAuthor = true;
      }
    });
  }

  if (sameTitle === true && sameAuthor === true) {
    let sameInput = document.createElement("p");
    sameInput.setAttribute("id", "sameInputPara");
    sameInput.textContent = "You already have this book";
    field.insertBefore(sameInput, field.childNodes[6]);
    titleInput.addEventListener("input", () => {
      postBookBtn.disabled = false;
    });
    postBookBtn.addEventListener("click", () => {
      sameInput.remove();
    });
    postBookBtn.disabled = true;
  } else {
    popUpDiv.style.display = "none";
    appendOnCard();
  }

  function appendOnCard() {
    mainDiv.appendChild(card);
    card.appendChild(paraDiv);
    paraDiv.appendChild(rmvBtn);
    rmvBtn.appendChild(rmvImg);
    rmvBtn.appendChild(rmvImg);
    paraDiv.appendChild(titlePara);
    paraDiv.appendChild(authorPara);
    paraDiv.appendChild(pagesPara);
    card.appendChild(readDiv);
    readDiv.appendChild(checkDiv);
    checkDiv.appendChild(imgDiv);
    imgDiv.appendChild(img);
    readDiv.appendChild(paraReadDiv);
    paraReadDiv.appendChild(paraRead);
    libraryArr.push(newBook);
  }
  if (checkIfRead()) {
    img.style.opacity = "100%";
  } else {
    img.style.opacity = "0%";
  }
  img.addEventListener("click", () => {
    if (img.style.opacity === "1") {
      newBook.read = false;
      img.style.opacity = "0%";
      console.log(newBook);
    } else if (img.style.opacity === "0") {
      newBook.read = true;
      img.style.opacity = "100%";
    }
  });
  rmvBtn.addEventListener("click", () => {
    libraryArr.splice(card.getAttribute("data-index-number"), 1);
    bookCounter.textContent = `Total books in library: ${libraryArr.length}`;
    console.log(card);
    console.log(libraryArr);
    card.remove();
  });
  bookCounter.textContent = `Total books in library: ${libraryArr.length}`;
  console.log(card);
  return newBook.read;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
  resetForm();
  console.log(libraryArr);
});

function resetForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readCheck.checked = false;
}

function checkIfRead() {
  if (readCheck.checked) {
    return true;
  } else {
    return false;
  }
}

addBookBtn.addEventListener("click", () => {
  popUpDiv.style.display = "";
});
