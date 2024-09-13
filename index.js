let postsArr = [];

const titleInput = document.getElementById("postTitle");
const bodyInput = document.getElementById("postBody");
const formEl = document.getElementById("blogPosts");

function renderPosts() {

    let html = "";
    for (let post of postsArr) {
        html += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            </div>
        `;
    }

    document.getElementById("blogList").innerHTML = html;
}

//renders posts from API and adds them to the page
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArr = data.slice(0, 5);
        renderPosts();
    })

//Adds entered post to API
formEl.addEventListener("submit", function(event) {
    event.preventDefault();

    const postTitle = titleInput.value;
    const postBody = bodyInput.value;

    if (postTitle && postBody) {
        const data = {
            title: postTitle,
            body: postBody
        };

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
            .then(response => response.json())
            .then(post => {
                postsArr.unshift(post);
                renderPosts();
            });

            formEl.reset();
    } else {
        alert('Add a title and body to make a post!')
    }
})