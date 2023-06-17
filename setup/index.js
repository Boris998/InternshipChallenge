const switchMode = document.querySelector('.switch');
const layoutContainer = document.querySelector('.layout-container');
const fetchMore = document.querySelector('.fetch-more');
let currIndexOfProfile = 0;
let allProfilesData = [];
let isDarkMode = false;


const createPostElement = (post) => {
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profilePic = document.createElement('img');
    profilePic.classList.add('profile-pic');
    profilePic.src = post.profile_image;
    profilePic.alt = 'Profile picture';
    postHeader.appendChild(profilePic);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    const name = document.createElement('h4');
    name.classList.add('name');
    name.textContent = post.name;
    userInfo.appendChild(name);

    const username = document.createElement('p');
    username.classList.add('username');
    username.textContent = post.username;
    userInfo.appendChild(username);

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = post.date;
    userInfo.appendChild(date);

    postHeader.appendChild(userInfo);
    newPost.appendChild(postHeader);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');

    const postText = document.createElement('p');
    postText.classList.add('text');
    postText.textContent = post.caption;
    postContent.appendChild(postText);

    const postImg = document.createElement('img');
    postImg.classList.add('post-image');
    postImg.src = post.image;
    postImg.alt = 'Post image';
    postContent.appendChild(postImg);

    newPost.appendChild(postContent);

    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-button');
    likeBtn.textContent = 'Like🤙';
    postFooter.appendChild(likeBtn);

    const likesCount = document.createElement('p');
    likesCount.classList.add('like-count');
    likesCount.textContent = post.likes + 'likes';
    postFooter.appendChild(likesCount);

    newPost.appendChild(postFooter);

    return newPost;
}

const displayPosts = (posts) => {
    posts.forEach(post => {
        const newPost = createPostElement(post);
        layoutContainer.insertBefore(newPost, fetchMore);
    })
}

const fetchNext4Posts = () => {
    const fetch4 = allProfilesData.slice(currIndexOfProfile, currIndexOfProfile + 4);
    currIndexOfProfile += 4;

    displayPosts(fetch4);
}

const fetchData = async () => {
    try {
        const response = await fetch('data.json');

        const responseData = await response.json();

        responseData.forEach(profile => {
            allProfilesData.push({
                image: profile.image,
                caption: profile.caption,
                type: profile.type,
                source_type: profile.source_type,
                source_link: profile.source_link,
                date: profile.date,
                likes: profile.likes,
                name: profile.name,
                profile_image: profile.profile_image,
            });
        });

        fetchMore.addEventListener('click', fetchNext4Posts);
    } catch (e) {
        console.log('error');
    }

}

fetchData();


const switchModeF = () => {
    if (isDarkMode) {
        document.body.removeAttribute('style');

        isDarkMode = false;
    } else {
        document.body.style.backgroundColor = '#313636';
        document.body.style.color = '#ffffff';

        isDarkMode = true;
    }
};

switchMode.addEventListener('click', switchModeF);






