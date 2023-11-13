// Div where profile info will appear.
const profileInfo = document.querySelector(".overview");
// Unordered list that displays the repo list.
const displayRepoList = document.querySelector(".repo-list");
// Github username
const username = "lindzo7";


const getInfo = async function () {
    const userRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await userRequest.json();
    displayUserInfo(data);
};

getInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure> <img alt="user avatar" src=${data.avatar_url} /></figure> <div><p><strong>Name:</strong> ${data.name}</p><p><strong>Bio:</strong> ${data.bio}</p><p><strong>Location:</strong> ${data.location}</p><p><strong>Number of public repos:</strong> ${data.public_repos}</p></div>`;
    profileInfo.append(div);

    getRepos();
};

const getRepos = async function () {
    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await request.json();
    console.log(repoData);

    repoInfo(repoData);
};

const repoInfo = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        displayRepoList.append(li);
    }
};
