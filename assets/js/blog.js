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

    if(data.user_id) { // only allow users to delete their own entries
    const userResponse = window.confirm("Are you sure that you want to delete this entry?");
    
    if (userResponse) {
        const response = await fetch(
            `http://localhost:3000/posts/${data['id']}`,
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
        if(data.user_id) { 
            const userResponse = window.confirm("Are you sure that you want to edit this entry?");
            if (userResponse) {
            const response = await fetch(
                `http://localhost:3000/posts/${data['id']}`,options);

                if (response.status === 200) {
                closeEditForm();
                window.location.reload();
                } 
                else {
                    const respData = await response.json();
                    alert(respData.error);
                    closeEditForm();
                }
            }   
        }
        else {
            window.confirm('You cant edit this post')
            closeEditForm();
        }
    });
}

function createPostElement(data) {
    const post = document.createElement("div");
    post.className = "post";

    const header = document.createElement("h1");
    header.textContent = data["title"];
    post.appendChild(header);

    const content = document.createElement("p");
    content.innerHTML = data["content"].replace(/\n/g, '<br>'); // Replace newline characters with <br> tags
    content.setAttribute("contenteditable", "true");
    // content.style.textAlign = "center"; // Center the text
    post.appendChild(content);
    
    const editBtn = document.createElement("button");
    editBtn.className = "editBtn";
    editBtn.textContent = "edit";

    editBtn.addEventListener('click', () => handleEdit(data));
    post.appendChild(editBtn);
    
    const removeBtn = document.createElement("button");
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "remove";

    removeBtn.addEventListener('click', () => handleDelete(data));
    post.appendChild(removeBtn);


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
            content: form.get("content")
        })
    };

    const result = await fetch("http://localhost:3000/posts", options);
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

async function loadPosts() {
    const options = {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    };

    const response = await fetch("http://localhost:3000/posts", options);

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

loadPosts();




