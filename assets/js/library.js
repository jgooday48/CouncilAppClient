
let book1 = {
    url: '../images/book1.jpg',
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
    url: '../images/book2.png',
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

function openForm() {
  document.getElementById("post-form").style.display = "block";
}

function closeForm() {
  document.getElementById("post-form").style.display = "none";
}

function openEditForm() {
  document.getElementById("edit-form").style.display = "block";
}

function closeEditForm() {
  document.getElementById("edit-form").style.display = "none";
}

async function handleDelete(data) { // allows deletion of items
  const options = {
      headers: {
          Authorization: localStorage.getItem('token')
      },
      method: 'DELETE'
  };

  if(data.user_id) {
  const userResponse = window.confirm("Are you sure that you want to delete this entry?");
  
  if (userResponse) {
      const response = await fetch(
          `http://localhost:3000/books/${data['id']}`,
          options
      );

      if (response.status === 204) {
          window.location.reload();
      } else {
          const respData = await response.json();
          alert(respData.error);
      }
  }
}
  else{
      window.confirm('You cant delete this post')
  }
}

async function handleEdit(data) {// edit content
  openEditForm();

  const acceptBtn = document.getElementById("accept");
  const editContent = document.getElementById("editContent");
  editContent.value = data.content // easily allows users to correct typos etc

  acceptBtn.addEventListener('click', async (e) => {
      e.preventDefault();


      const options = {
          method: "PATCH",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              content: editContent.value
          })
      };
      const userResponse = window.confirm("Are you sure that you want to edit this entry?");
      if (userResponse) {
      const response = await fetch(
          `http://localhost:3000/books/${data['id']}`,options);

      if (response.status === 200) {
          closeEditForm();
          window.location.reload();
      } else {
          const respData = await response.json();
          alert(respData.error);
      }
  }
  });
}

function createPostElement(data) {
  const post = document.createElement("div");
  post.className = "post";

  const header = document.createElement("h1");
  header.textContent = data["title"];
  post.appendChild(header);

  const author = document.createElement("h2")
  author.textContent = data["author"]
  post.appendChild(author);

  const content = document.createElement("div");
  content.innerHTML = data["content"].replace(/\n/g, '<br>'); // Replace newline characters with <br> tags
  content.setAttribute("contenteditable", "true");
  content.style.textAlign = "center"; // Center the text
  post.appendChild(content);

  const removeBtn = document.createElement("button");
  removeBtn.className = "removeBtn";
  removeBtn.textContent = "remove";

  removeBtn.addEventListener('click', () => handleDelete(data));
  post.appendChild(removeBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "removeBtn";
  editBtn.textContent = "edit";

  editBtn.addEventListener('click', () => handleEdit(data));
  post.appendChild(editBtn);

  return post;
}


document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          content: form.get("content")
      })
  };

  const result = await fetch("http://localhost:3000/books", options);
  closeForm();
  
  
  if (result.status == 201) {
      
      // Parse the response to get the created post data
      const newPostData = await result.json();
      
      // Create a new post element and append it to the container
      const container = document.getElementById("posts");
      const newPostElement = createPostElement(newPostData);
      container.appendChild(newPostElement);
  }
  else {
      const errorData = await result.json();
      console.error("Error creating post:", errorData);
  }
  window.location.reload();
});

async function loadBooks() {
  const options = {
      headers: {
          Authorization: localStorage.getItem("token")
      }
  };

  const response = await fetch("http://localhost:3000/books", options);

  if (response.status == 200) {
      const posts = await response.json();

      const container = document.getElementById("posts");

      posts.forEach(p => { // posts content
          const elem = createPostElement(p);
          container.appendChild(elem);
      });
  } else {
      window.location.assign("./index.html");
  }
}

loadBooks();
