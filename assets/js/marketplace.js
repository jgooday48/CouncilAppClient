function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";
    post.setAttribute('id', `${data["post_id"]}`);


    const image = document.createElement("div");
    image.className = "image"
    post.appendChild(image);

    const price = document.createElement("div");
    price.className = "text"
    price.textContent = `£${data["price"]}`;
    image.appendChild(price);
    

    const title = document.createElement("div");
    title.className = "title"
    title.textContent = data["post_name"];
    post.appendChild(title);

    const description = document.createElement("div");
    description.className = "description"
    description.textContent = data["description"];
    post.appendChild(description);

    return post;
}


//fill header
function createPostHeader (data) {
    const head = document.createElement("div");
    head.className = "pop-header";

    const name_item = document.createElement("div");
    name_item.className = 'post_name'
    name_item.textContent = data["post_name"];
    head.appendChild(name_item);

    const close_btn = document.createElement("button");
    close_btn.className = "close-button"
    close_btn.innerHTML = '&times;';
    head.appendChild(close_btn);

    return head;
}

//fill the body function

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

    return parentDiv; // Return the created structure
}

function createPostBody(data) {
    const body = document.createElement("div");
    body.className = "pop-body";

    // Price
    const priceDiv = populateBodyWith("post_price", "Price: ", `£${data["price"]}`);
    body.appendChild(priceDiv);

    // Conditions
    const conditionsDiv = populateBodyWith("post_conditions", "Conditions: ", data["conditions"]);
    body.appendChild(conditionsDiv);
    
    //location
    const locationDiv = populateBodyWith("post_location", "Location: ", data["location"]);
    body.appendChild(locationDiv);

    //get user details
    const userDetailsDiv = populateBodyWith("seller_details","seller details: ",`email: ${data.user_email} <br> name: ${data.user_name}`);
    body.appendChild(userDetailsDiv);

    //description
    const descriptionDiv = populateBodyWith("post_description","description: ", data["description"]);
    body.appendChild(descriptionDiv)

    // Similarly, create other elements as needed...

    return body; // Return the created 'pop-body' element
}



//populate the pop-up
// function popUp(data){
//     const popHead = createPostHeader(data)

// }

//add event listener to ope and close the pop-up


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
        // Click occurred on a .post element or its children
        const postId = e.target.closest('.post').id;
        //fetch data based on id
        const response = await fetch(`http://localhost:3000/post/id/${postId}`);
        //display data on the pop-up
        const singlePost = await response.json();
        const popUp = document.querySelector("#pop-up");
        popUp.textContent = '';
        const haeder = createPostHeader(singlePost);
        popUp.appendChild(haeder);
        const body = createPostBody(singlePost);
        popUp.appendChild(body);

        console.log(`Post with ID ${postId} was clicked.`);
        // Perform actions specific to the clicked post
    }
});


