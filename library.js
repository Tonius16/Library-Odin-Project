const addBookBtn = document.getElementById("addBookBtn");
const mainDiv = document.getElementById("mainDiv");
const popUpDiv = document.getElementById("popUpDiv");
const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("numPgs");
const readCheck = document.getElementById("readCheck");

popUpDiv.style.display = "none";

let libraryArr = [];

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
  libraryArr.push(newBook);
  let card = document.createElement("div");
  card.setAttribute("data-index-number", libraryArr.indexOf(newBook));
  card.setAttribute("id", "card");
  card.setAttribute("class", "cards");
  let paraDiv = document.createElement("div");
  paraDiv.setAttribute("id", "paraDiv");
  paraDiv.setAttribute("class", "paraDiv");
  card.appendChild(paraDiv);
  let rmvBtn = document.createElement("button");
  rmvBtn.setAttribute("id", "rmvBtn");
  paraDiv.appendChild(rmvBtn);
  let rmvImg = document.createElement("img");
  rmvImg.setAttribute("id", "rmvImg");
  rmvImg.setAttribute("src", "./imgs/icons8-remove-48.png");
  rmvBtn.appendChild(rmvImg);
  let titlePara = document.createElement("p");
  titlePara.setAttribute("class", "titlePara");
  titlePara.textContent = titleInput.value;
  paraDiv.appendChild(titlePara);
  let titleParaArr = Array.from(document.getElementsByClassName("titlePara"));
  let authorPara = document.createElement("p");
  authorPara.setAttribute("class", "authorPara");
  authorPara.textContent = authorInput.value;
  paraDiv.appendChild(authorPara);
  let authorParaArr = Array.from(document.getElementsByClassName("authorPara"));
  let sameTitle = false;
  let sameAuthor = false;
  if (titleParaArr === [] && authorParaArr === []) {
    return;
  } else {
    titleParaArr.forEach((element) => {
      if (element.textContent === titleInput.value) {
        console.log("isti naslov");
        sameTitle = true;
      }
    });
    authorParaArr.forEach((element) => {
      if (element.textContent === authorInput.value) {
        console.log("isti autor");
        sameAuthor = true;
      }
    });
  }
  if (sameTitle === true && sameAuthor === true) {
    console.log("RADI");
  } else {
    popUpDiv.style.display = "none";
  }
  let pagesPara = document.createElement("p");
  pagesPara.textContent = `${pagesInput.value} Pages`;
  paraDiv.appendChild(pagesPara);
  let readDiv = document.createElement("div");
  readDiv.setAttribute("class", "readDiv");
  card.appendChild(readDiv);
  let checkDiv = document.createElement("div");
  checkDiv.setAttribute("class", "checkDiv");
  readDiv.appendChild(checkDiv);
  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "imgDiv");
  checkDiv.appendChild(imgDiv);
  let img = document.createElement("img");
  img.setAttribute("src", "/imgs/check-mark-icon.png");
  img.setAttribute("class", "checkIcon");
  imgDiv.appendChild(img);
  let paraReadDiv = document.createElement("div");
  paraReadDiv.setAttribute("class", "paraRead");
  readDiv.appendChild(paraReadDiv);
  let paraRead = document.createElement("p");
  paraRead.textContent = "Read";
  paraReadDiv.appendChild(paraRead);
  mainDiv.appendChild(card);
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
    card.remove();
    libraryArr.splice(libraryArr.indexOf(newBook));
    console.log(card);
  });
  return newBook.read;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkIfSameTitle();
  addBook();
  resetForm();
});

function checkIfSameTitle() {}

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
