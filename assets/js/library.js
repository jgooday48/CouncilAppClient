
let book1 = {
    url: '',
    bookTitle: 'Of Mice and Men',
    author: 'John Steinbeck',
    description: "During the Great Depression in California, two migrant field workers - \
    George Milton, an intelligent but uneducated man, and Lennie Small, a bulky, \
    strong but mentally disabled man - are on their way from Soledad to another \
    part of the state. They hope to one day attain the dream of settling down on \
    their own piece of land. Lennie's part of the dream is merely to care for and \
    pet rabbits on the farm, as he loves touching soft animals, although he always \
    accidentally kills them by petting them too hard. This dream is one of Lennie's \
    favorite stories, which George constantly retells."
}
let book2 = {
    url: '',
    bookTitle: 'Holes',
    author: 'Louis Sacher',
    description: "Stanley Yelnats IV is wrongfully convicted of theft and as a \
    consequence is sent to Camp Green Lake, a juvenile corrections facility."
}


function createBookPosting(data){
    const imgBox = document.createElement('div')
    imgBox.className = 'bookIMG'
    const descriptionBox = document.createElement('div')
    descriptionBox.className = 'bookDescription'

    const img = document.createElement('img')
    const bookTitle = document.createElement('h2')
    const author = document.createElement('h3')
    const description = document.createElement('p')

    img.src = data.url
    img.alt = 'image not found'
    bookTitle.textContent = data.bookTitle
    author.textContent = data.author
    description.textContent = data.description

    imgBox.appendChild(img)

    descriptionBox.appendChild(bookTitle)
    descriptionBox.appendChild(author)
    descriptionBox.appendChild(description)

    return imgBox, descriptionBox
}


async function loadBookPosting(data){
    const container = document.getElementById('bigContainer')

    const bookPosting = createBookPosting(data)
    container.appendChild(bookPosting)
}

loadBookPosting(book1)
loadBookPosting(book2)









const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file;

button.onclick = ()=>{
  input.click();
}

input.addEventListener("change", function(){
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event)=>{
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile(){
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)){
    let fileReader = new FileReader();
    fileReader.onload = ()=>{
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea.innerHTML = imgTag;
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
