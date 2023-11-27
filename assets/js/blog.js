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

function createPostElement(data) {
    const post = document.createElement("div");
    post.className = "post";


    const dateElement = document.createElement("p");
    const dates = data["date"]; 
    const originalDates = new Date(dates);
    const formattedDate = `${originalDates.getDate().toString().padStart(2, '0')}-${(originalDates.getMonth() + 1).toString().padStart(2, '0')}-${originalDates.getFullYear()}`;
    dateElement.textContent = formattedDate;
    post.appendChild(dateElement);
    
    const header = document.createElement("h1");
    header.textContent = data["title"];
    post.appendChild(header);

    const category = document.createElement("h3");
    category.textContent = data["category"];
    post.appendChild(category);

    const content = document.createElement("p");
    content.textContent = data["content"];
    content.setAttribute("contenteditable", "true")

    post.appendChild(content);

    const removeBtn = document.createElement("button")
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "remove"


    removeBtn.addEventListener('click', async () => {
        const options = {
            headers: {
                Authorization: localStorage.getItem('token')
            },
            method: 'DELETE'
        };
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

    });

    post.appendChild(removeBtn)

    const editBtn = document.createElement("button")
    editBtn.className = "removeBtn";
    editBtn.textContent = "edit"

    editBtn.addEventListener('click', async () => {

        openEditForm();

        const acceptBtn = document.getElementById("accept");

        acceptBtn.addEventListener('click', async () => {
            const editContent = document.getElementById("editContent");

            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editContent.value
                })
            }

            const response = await fetch(
                `http://localhost:3000/posts/${data['id']}`,
                options
            );

        })

    });


    post.appendChild(editBtn)
    return post;
}

document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content"),
            category: form.get("category")
        })
    }

    const result = await fetch("http://localhost:3000/posts", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadPosts() {

    // client/assets/board.js
    // loadPosts function
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status == 200) {
        const posts = await response.json();

        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

loadPosts();
