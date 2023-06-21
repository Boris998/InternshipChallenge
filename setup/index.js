const switchMode = document.querySelector('.switch');
const layoutContainer = document.querySelector('.layout-container');
const fetchMore = document.querySelector('.fetch-more');
const likeBtn = document.querySelector('.like-button');
const likesText = document.querySelector('.likes');

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

    postImg.addEventListener('click', () => {
        openModal(post.image);
    });

    postContent.appendChild(postImg);

    newPost.appendChild(postContent);

    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-button');
    likeBtn.textContent = 'Like🤙';
    postFooter.appendChild(likeBtn);

    const postLikesCount = document.createElement('p');
    postLikesCount.classList.add('likes');
    postLikesCount.textContent = post.likes + ' more like this post';
    postFooter.appendChild(postLikesCount);

    newPost.appendChild(postFooter);

    return newPost;
}


const openModal = (imageUrl) => {
    const modalContainer = document.getElementById('modalContainer');

    modalContainer.innerHTML = '';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalImage = document.createElement('img');
    modalImage.src = imageUrl;
    modalImage.alt = 'Modal image';
    modalContent.appendChild(modalImage);

    const closeModalBtn = document.createElement('button');
    closeModalBtn.classList.add('close-modal');
    closeModalBtn.innerHTML = '&times;';
    closeModalBtn.addEventListener('click', closeModal);

    modalContent.appendChild(closeModalBtn);

    modalContainer.appendChild(modalContent);

    modalContainer.style.display = 'block';
}

const closeModal = () => {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' ) {
        closeModal();
    }
});


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

    if ((allProfilesData.length - currIndexOfProfile) <= 0) {
        fetchMore.disabled;
        fetchMore.classList.add('disable-fetch');
    }
}


const calcTimeDiff = (now, postDate) => {
    const timeDiff = now - postDate;

    const msToMin = 60 * 1000;
    const msToHours = 60 * msToMin;
    const msToDays = 60 * msToHours;
    const msToWeeks = 7 * msToDays;

    return timeDiff < msToMin ?
        Math.floor(timeDiff / msToMin) + 'm'
        : timeDiff < msToHours ?
            Math.floor(timeDiff / msToHours) + 'h'
            : timeDiff < msToDays ?
                Math.floor(timeDiff / msToDays) + 'd'
                : Math.floor(timeDiff / msToWeeks) + 'w';
}


const fetchData = async () => {
    try {
        const response = await fetch('data.json');

        const responseData = await response.json();

        const now = new Date();

        responseData.forEach(profile => {
            const postDate = new Date(profile.date.slice(0, 10));
            const someTimeAgo = calcTimeDiff(now, postDate);

            allProfilesData.push({
                image: profile.image,
                caption: profile.caption,
                type: profile.type,
                source_type: profile.source_type,
                source_link: profile.source_link,
                date: someTimeAgo,
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


const switchModeF = (e) => {
    e.preventDefault();

    if (isDarkMode) {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';

        isDarkMode = false;
    } else {
        document.body.style.backgroundColor = '#263333';
        document.body.style.color = '#ffffff';

        isDarkMode = true;
    }
}

switchMode.addEventListener('click', switchModeF);

let liked = true;

const likeHandler = (e) => {
    e.preventDefault();

    liked ? likesText.innerHTML = 'you and ' + likesText.innerHTML
        : likesText.innerHTML = likesText.innerHTML.replace('you and ', '');

    liked = !liked;
}

likeBtn.addEventListener('click', likeHandler);

