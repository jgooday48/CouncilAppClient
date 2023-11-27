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

async function handleEdit(data) {
    openEditForm();

    const acceptBtn = document.getElementById("accept");

    acceptBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const editContent = document.getElementById("editContent");

        const options = {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                content: editContent.value
            })
        };

        const response = await fetch(
            `http://localhost:3000/posts/${data['id']}`,
            options
        );

        if (response.status === 200) {
            closeEditForm();
            window.location.reload();
        } else {
            const respData = await response.json();
            alert(respData.error);
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
    content.textContent = data["content"];
    content.setAttribute("contenteditable", "true");
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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content"),
        })
    };

    const result = await fetch("http://localhost:3000/posts", options);

    if (result.status == 201) {
        closeForm();
        window.location.reload();
    }
});

async function loadPosts() {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    };

    const response = await fetch("http://localhost:3000/posts", options);

    if (response.status == 200) {
        const posts = await response.json();

        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        });
    } else {
        window.location.assign("./index.html");
    }
}

loadPosts();
