function createBookPostingIMG2(data) {
  const imgBox = document.createElement('div')
  imgBox.className = 'bookImage'
  
  const img = document.createElement('img')
  console.log()
  img.src = data.link
  img.alt = 'NO IMAGE PROVIDED'
  
  imgBox.appendChild(img)
  return imgBox
}

function createBookPostingDES2(data){
  const descriptionBox = document.createElement('div')
  descriptionBox.className = 'bookDescription'
  
  const bookTitle = document.createElement('h2')
  const author = document.createElement('h3')
  const description = document.createElement('p')
  const editButton = document.createElement('button')
  const deleteButton = document.createElement('button')
  
  bookTitle.textContent = `Book Title: ${data.title}`
  descriptionBox.appendChild(bookTitle)
  
  author.textContent = `Author(s): ${data.author}`
  descriptionBox.appendChild(author)
  
  description.textContent = data.content
  descriptionBox.appendChild(description)
  
  editButton.className = 'editPostBtn'
  deleteButton.className = 'deletePostBtn'

  editButton.textContent = 'edit'
  deleteButton.textContent = 'delete'
  
  editButton.addEventListener('click', (e) => {
    e.preventDefault()
    handleEdit(data)
  })
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault()
    handleDelete(data)
  })
  descriptionBox.appendChild(editButton)
  descriptionBox.appendChild(deleteButton)
  // console.log(`126 book title: ${data['title']}`)
  return descriptionBox
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
      content: form.get("content"),
      link: form.get('link')
    })
  };

  const result = await fetch("http://localhost:3000/books", options);
  closeForm();
  
  if (result.status == 201) {
    // Parse the response to get the created post data
    const newPostData = await result.json();
      
    // Create a new post element and append it to the container
    const bigContainer = document.getElementById("bigContainer");
    const smallContainer = document.createElement('div')
    smallContainer.className = 'smallContainer'

    const newPostIMG = createBookPostingIMG2(newPostData);
    const newPostDES = createBookPostingDES2(newPostData);
    
    smallContainer.appendChild(newPostIMG)
    smallContainer.appendChild(newPostDES)

    bigContainer.appendChild(smallContainer)
  }
  else {
    const errorData = await result.json();
    console.error("Error creating post: ", errorData);
  }
  window.location.reload();
});

async function loadBookPosting2() {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  };

  const response = await fetch("http://localhost:3000/books", options);

  if (response.status == 200) {
    const bookPosts = await response.json();
    const bigContainer = document.getElementById("bigContainer");
    
    bookPosts.forEach(p => { //content
      const smallContainer = document.createElement('div')
      smallContainer.className = 'smallContainer'
      
      const bookIMG = createBookPostingIMG2(p)
      const bookDES = createBookPostingDES2(p) 
        
      smallContainer.appendChild(bookIMG)
      smallContainer.appendChild(bookDES)

      bigContainer.appendChild(smallContainer)
    });
  }
  else {
    window.location.assign("./index.html");
  }
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

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

async function handleDelete(data) {
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
        Authorization: localStorage.getItem('token'),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
        content: editContent.value
      })
    };
    const userResponse = window.confirm("Are you sure that you want to edit this entry?");
    if (userResponse) {
      const response = await fetch(`http://localhost:3000/books/${data['id']}`, options);  
      
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

loadBookPosting2();