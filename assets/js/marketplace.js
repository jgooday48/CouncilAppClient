function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";
    post.setAttribute('id', `${data["post_id"]}`);

    const title = document.createElement("div");
    title.className = "title"
    title.textContent = data["post_name"];
    post.appendChild(title);

    const description = document.createElement("div");
    description.className = "description"
    description.textContent = data["description"];
    post.appendChild(description);

    const image = document.createElement("div");
    image.className = "image"
    post.appendChild(image);

    const price = document.createElement("div");
    price.className = "text"
    price.textContent = `£${data["price"]}`;
    image.appendChild(price);

    return post;
}


//fill header
function createPostHeader (data) {
    const head = document.createElement("div");
    head.className = "pop-header";

    const name_item = document.createElement("div");
    name_item.className = 'post_name'
    name_item.innerHTML = `${data.post_name} <br> <h6>id:${data.post_id}</h6>`;
    head.appendChild(name_item);

    const close_btn = document.createElement("button");
    close_btn.className = "close-button"
    close_btn.innerHTML = '&times;';
    head.appendChild(close_btn);

    return head;
}

//function to populate body with different parts
function populateBodyWith(nameClass, labelKey, valueKey) {
    const parentDiv = document.createElement("div");
    parentDiv.className = nameClass;

    const label = document.createElement("div");
    const value = document.createElement("p");

    label.innerHTML = labelKey;
    value.innerHTML = valueKey;

    parentDiv.appendChild(label);
    parentDiv.appendChild(value);

    return parentDiv; 
}

function createPostBody(data) {
    const body = document.createElement("div");
    body.className = "pop-body";

    const priceDiv = populateBodyWith("post_price", "Price: ", `£${data["price"]}`);
    body.appendChild(priceDiv);

    const conditionsDiv = populateBodyWith("post_conditions", "Conditions: ", data["conditions"]);
    body.appendChild(conditionsDiv);
    
    const locationDiv = populateBodyWith("post_location", "Location: ", data["location"]);
    body.appendChild(locationDiv);

    const userDetailsDiv = populateBodyWith("seller_details","seller details: ",`email: ${data.user_email} <br> name: ${data.user_name}`);
    body.appendChild(userDetailsDiv);

    const descriptionDiv = populateBodyWith("post_description","description: ", data["description"]);
    body.appendChild(descriptionDiv)


    return body; 
}

function messageBtn(message,idPop) {
    const msg = document.querySelector("#message-pop");
    const ogPop = document.querySelector(`#${idPop}`)
    ogPop.classList.remove("active")
    msg.innerHTML = "";
    
    const closingBtn = document.createElement("div");
    closingBtn.innerHTML = "&times;";
    closingBtn.classList.add("close-button");
    msg.appendChild(closingBtn);

    const label = document.createElement("div");
    label.innerHTML = "Message:";
    label.classList.add("message-label");
    msg.appendChild(label);

    const messageValue = document.createElement("div");
    messageValue.innerHTML = message;
    messageValue.setAttribute("id", "message");
    msg.appendChild(messageValue);

    msg.classList.add("active");

}


async function postBoard(){
    const response = await fetch("http://localhost:3000/post/");

    if (response.status == 200) {
        const posts = await response.json();
    
        const container = document.getElementById("post-board");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } 
}

postBoard()


document.getElementById('post-board').addEventListener('click',async (e)=> {
    if (e.target.closest('.post')) {
        const postId = e.target.closest('.post').id;
        const response = await fetch(`http://localhost:3000/post/${postId}`);
        const singlePost = await response.json();
        const popUp = document.querySelector("#pop-up");
        const overlay = document.querySelector('#overlay');
        popUp.textContent = '';
        const haeder = createPostHeader(singlePost);
        popUp.appendChild(haeder);
        const body = createPostBody(singlePost);
        popUp.appendChild(body);
        popUp.classList.add("active");
        overlay.classList.add("active");


        console.log(`Post with ID ${postId} was clicked.`);
    }
});


const closeBtn = document.querySelector(".close-button")
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-button')) {
        const popUps = document.querySelectorAll(".surprise");
        const overlay = document.querySelector('#overlay');
        popUps.forEach(popUp => {
            popUp.classList.remove("active");
        });
        overlay.classList.remove("active");
        window.location.reload();


    }
});

//editor buttons
const deleteBtn = document.querySelector("#destroy-btn");
deleteBtn.addEventListener('click', ()=>{
    const popUp = document.querySelector("#delete-pop");
    const overlay = document.querySelector('#overlay');
    popUp.classList.add("active");
    overlay.classList.add("active");
    
})

const patchBtn = document.querySelector("#update-btn");
patchBtn.addEventListener('click', ()=>{
    const popUp = document.querySelector("#patch-pop");
    const overlay = document.querySelector('#overlay');
    popUp.classList.add("active");
    overlay.classList.add("active");
    
})

const postBtn = document.querySelector("#create-btn");
postBtn.addEventListener('click', ()=>{
    const popUp = document.querySelector("#create-pop");
    const overlay = document.querySelector('#overlay');
    popUp.classList.add("active");
    overlay.classList.add("active");
    
})



//delete request

const deleteForm = document.getElementById('delete-form');
    deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const form = new FormData(e.target);
        const postId = form.get('idToDelete');
        const options = {
            method: "DELETE",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        }
        try {
            const response = await fetch(`http://localhost:3000/post/${postId}`, options);
            if (response.status === 204) {
                messageBtn(`Post with ID ${postId} deleted successfully.`, "delete-pop")
                

            } else {
                console.error(`Failed to delete post with ID ${postId}.`);
                messageBtn('unable to delete post, you can delete your posts  only and only after you sign in.', "delete-pop")
                
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })

//patch request
const patchForm = document.getElementById('patch-form');
patchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const patchData = {
        post_id: formData.get('idToPatch'),
        price: formData.get('newPrice')
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(patchData)
    };

    try {
        const response = await fetch(`http://localhost:3000/post/${patchData.post_id}`, options);
        if (response.status === 200) {
            messageBtn('price updated succesfully',"patch-pop")
            
        } else {
            console.error('Failed to patch:', response.status);
            messageBtn('unable to update price, you can update your posts only and only after you sign in.',"patch-pop")
        }
    } catch (error) {
        console.error('Error:', error);
    }
});



//post request

const createForm = document.getElementById('create-form');
createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = {
        post_name: formData.get('name'),
        conditions: formData.get('conditions'),
        description: formData.get('description'),
        location: formData.get('location'),
        price: formData.get('price')
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(postData)
    };

    try {
        const response = await fetch('http://localhost:3000/post/', options);
        if (response.status===201) {
            messageBtn('Post created successfully',"create-pop")
        } else {
            messageBtn('couldent create the post, make sure you have logged in.',"create-pop")
        }
    } catch (error) {
        console.error('Error:', error);
    }
});