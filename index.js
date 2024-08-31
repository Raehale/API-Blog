//renders posts from API and adds them to the page
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        const postsArr = data.slice(0, 5);
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
    })

//Adds entered post to API and adds it to the top of the post list
document.getElementById("blogPosts").addEventListener("submit", function(event) {
    event.preventDefault();
    const postTitle = document.getElementById("postTitle").value;
    const postBody = document.getElementById("postBody").value;

    if (postTitle && postBody) {
    const data = {
        title: postTitle,
        body: postBody
    };

    appendNewPost(data);

    document.getElementById("postTitle").value = '';
    document.getElementById("postBody").value = '';
    } else {
        alert('Add a title and body to make a post!')
    }
})

function appendNewPost(postData) {
    const options = {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(post => {
            let html ='';
            html = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `;

            const newPost = document.createElement('div');
            newPost.classList.add('post');

            newPost.innerHTML = html;
            document.getElementById('blogList').appendChild(newPost);
            document.getElementById('blogList').insertBefore(newPost, document.getElementById('blogList').firstChild);
        })
}
