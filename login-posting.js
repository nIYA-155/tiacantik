// Handle posting new content
document.getElementById('post-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const content = document.getElementById('post-content').value;

    try {
        // Make a POST request to the backend to submit the post
        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        const result = await response.json();

        if (response.ok) {
            // Add the new post to the list of posts
            const postList = document.getElementById('posts-list');
            const newPost = document.createElement('li');
            newPost.textContent = result.content;
            postList.appendChild(newPost);

            // Clear the textarea
            document.getElementById('post-content').value = '';
        } else {
            alert('Failed to post.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Handle logging out
document.getElementById('logout-button').addEventListener('click', async function () {
    try {
        const response = await fetch('/logout', {
            method: 'POST'
        });

        if (response.ok) {
            // Redirect to login page
            window.location.href = '/login.html';
        } else {
            alert('Logout failed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
